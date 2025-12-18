# GUIA DE SERIALIZERS EN DJANGO REST FRAMEWORK
from rest_framework import serializers
from apps.users.models import Usuario
from apps.products.serializers import ProductosSerializers
from apps.orders.models import ItemPedido
from apps.products.models import Productos, Categorias


# Funcion principal de SERIALIZER, transformar los datos a JSON o VICEVERSA

# # 1 - Transformar: FORMA SENCILLA DE TRANSFORMAR DATOS

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = 'User'
#         fields = ['name', 'last_name', 'email', 'password']
        
# # 2 - Validar: VALIDACION DE DATOS

# class SerializerModel(serializers.Serializer):
#     first_name = serializers.CharField(max_length=50, allow_blank=True)
#     email = serializers.CharField(max_length=120, allow_blank=True)
    
# # El modelo serializer recibe la data de la vista por medio de un JSON y usando el metodo .is_valid()

#     # metodos de validacion de un serializer: validate_(data a validar)
#     def validate_name(self, value):
#         # AQUI DENTRO VA TODA LA LOGICA NECESARIA PARA VALIDAR, UN EJEMPLO PUEDE SER:
#         if 'hitler' in value:
#             raise serializers.ValidationError('Error, no puede existir un usuario con ese nombre')
#         return value
    
#     def validate_email(self, value):
#         # AQUI DENTRO VA TODA LA LOGICA NECESARIA PARA VALIDAR, UN EJEMPLO PUEDE SER:
#         if not '@gmail.com' in value:
#             raise serializers.ValidationError('Error, el correo que ingreso no es valido')
#         return value
    
#     # Metodo validate() Que retorna la data completa validada
#     def validate(self, data):
#         return data
    
# # 3 - Create(): Metodo create que recibe la data ya validada y la guarda en la base de datos

#     def create(self, validated_data):
#         print(validated_data)
#         return Usuario.objects.create(**validated_data)

# # 4 - SERIALIZADOR DE UN MODELO REAL

#     # Model: ItemPedido
    
#     class ItemPedidoSerializers(serializers.ModelSerializer):
#         # Para manipular y definir cualidades a un atributo:
#         subtotal = serializers.ReadOnlyField()  # <-- Indicamos que el valor solo sera de lectura, no pude modificarse

#         # Para serializar las relaciones se hace de la siguiente manera: 
#         producto_info = ProductosSerializers(source='producto', read_only=True) # <-- Llamamos al serializer del producto 
        
#         nombre_custom = serializers.ReadOnlyField()
        
#         class Meta: 
#             model = ItemPedido
#             fields = [
#                 'id', 
#                 'producto',                       
#                 'producto_info',              
#                 'cantidad', 
#                 'precio_unitario', 
#                 'nombre_producto',
#                 'subtotal',                       
#                 'nombre_custom'  
#             ]
            
#             # Con esto indicamos los campos que no queremos dejar modificar
#             read_only_fields = [
#                 'nombre_producto',
#                 'subtotal'
#             ]
            
#         def get_nombre_custom(self, obj):
            
#             return f"Producto: {obj.nombre_producto} - Cantidad: {obj.cantidad}"


# Serializers de prueba:
class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = ['id', 'name']
        read_only_fields = ['fecha_creacion']

class ProductValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'
        
    # Validacion a nivele de campo (Campo price del modelo)
    def validate_price(self, value):
        if value <= 10.00:
            
            raise serializers.ValidationError('El precio debe ser mayor a 10.00')
        return value 
    
    # Validacion a nivel de Objeto (data: el objeto que contiene todos los campos)
    def validate(self, data):
        
        if self.instance is None:
            
            name = data.get('name')
            if Productos.objects.filter(name=name):
                
                raise serializers.ValidationError({'name': "ya existe un producto con ese nombre"})
            
        return data

# 5 RELACIONES EN LOS SERIALIZADORES: 
class AnidacionSerializer(serializers.ModelSerializer):
    
    category = CategorySerializers() # Instanciamos la variable category el serializador de Category
    
    class Meta: # Creamos la clase meta del modelo producto para proveer los campos a utilizar
        model = Productos
        fields = ['id', 'name', 'price', 'category']
        
    def create(self, validated_data): # Usar el metodo create de forma manual para procesar los datos
        
        category_data = validated_data.pop('category') # Extraemos el campo category del objeto validated_data (que es la relacion) 
        
        try: # Obtenemos el nombre de la categoria si existe en la base de datos
            category_instance = Categorias.objects.get(name=category_data['name']) 
        except Categorias.DoesNotExist: # Si no existe la categoria la creamos, creando la instancia completa con category_data
            category_instance = Categorias.objects.create(**category_data)
            
        # Creamos el producto con la categoria ya creada en la category_instancia y agregamos los demas campos del objeto validated_data
        product = Productos.objects.create(category=category_instance, **validated_data)
        
        return product
    
# 6 PERSONALIZAR LA SALIDA DE DATOS LOS SERIALIZERS: calcular datos, logica de negocio, informacion formateada

class CustomProductSerializer(serializers.ModelSerializer):
    # Mostrar le precio final con un descuento del 10%
    descuento_precio = serializers.SerializerMethodField()
    detail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Productos
        fields = ['id', 'name', 'price', 'descuento_precio', 'detail_url']
        
    def get_descuento_precio(self, obj):
        
        precio_actual = obj.price
        discount = 0.10
        
        final_price = precio_actual * (1 - discount)
        
        return round(final_price, 2)
