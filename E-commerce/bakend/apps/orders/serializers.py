from django.db import transaction
from rest_framework import serializers
from .models import Pedido, ItemPedido, HistorialPedido
from apps.products.models import Productos
from apps.users.serializers import UserSerializer
from apps.products.serializers import ProductosSerializers
from decimal import Decimal


# Serializer del ItemPedido:
class ItemPedidoSerializer(serializers.ModelSerializer):
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        model = ItemPedido
        fields = ['id', 'producto', 'cantidad', 'nombre_producto', 'precio_unitario', 'subtotal']
        read_only_fields = ['nombre_producto', 'precio_unitario', 'subtotal']
        
class ItemPedidoWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPedido
        # 🚨 SOLO los campos que el cliente debe enviar
        fields = ['producto', 'cantidad']
        
class ItemPedidoReadSerializer(serializers.ModelSerializer):
    # Usaremos esta clase en el PedidoLecturaSerializer
    class Meta:
        model = ItemPedido
        # Incluimos todos los campos que el cliente DEBE ver
        fields = ['id', 'producto', 'cantidad', 'nombre_producto', 'precio_unitario', 'subtotal'] 
        read_only_fields = fields
        
# Serializer del Pedido:
class PedidoLecturaSerializer(serializers.ModelSerializer):
    items = ItemPedidoReadSerializer(many=True, read_only=True) 
    
    # Campo personalizado para el estado legible
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    # Campo personalizado para el email del usuario (solo lectura)
    usuario_email = serializers.CharField(source='usuario.email', read_only=True)
    
    # Campo calculado (desde el @property en el modelo)
    cantidad_productos = serializers.IntegerField(read_only=True) 

    class Meta:
        model = Pedido
        fields = '__all__' 
        read_only_fields = ['__all__']
        
class PedidoCreateSerializer(serializers.ModelSerializer):
    items = ItemPedidoWriteSerializer(many=True)    
    usuario = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Pedido
        # Los campos que el cliente puede o debe enviar
        fields = ['id', 'items', 'direccion_envio', 'descuento', 'usuario']
        # Los campos de total/fecha/estado son manejados por el backend
        read_only_fields = ['numero_pedido', 'estado', 'subtotal', 'impuesto', 'envio', 'total']
        
    def validate_items(self, items_data):
        if not items_data:
            raise serializers.ValidationError('El pedido debe tener al menos un producto.')
        return items_data
    
    def create(self, validated_data):
        
        with transaction.atomic():
            items_data = validated_data.pop('items')
            
            pedido = Pedido.objects.create(**validated_data)
            
            subtotal_pedido = 0
            items_a_crear = []
            
            for item_data in items_data:
                producto_id = item_data.get('producto').id
                cantidad = item_data.get('cantidad')
                
                try:
                    producto = Productos.objects.get(id=producto_id)
                except Productos.DoesNotExist:
                    raise serializers.ValidationError(
                        {"Items": f"El producto con {producto_id} no existe."}
                    )
                
                precio_unitario_snap = producto.precio
                nombre_producto_snap = producto.name
                
                item = ItemPedido(
                    pedido=pedido,
                    producto=producto,
                    cantidad=cantidad,
                    precio_unitario=precio_unitario_snap,
                    nombre_producto=nombre_producto_snap
                )
                items_a_crear.append(item)
                
                subtotal_pedido += (cantidad * precio_unitario_snap)
                
            ItemPedido.objects.bulk_create(items_a_crear)
            
            pedido.subtotal = subtotal_pedido
            pedido.impuesto = subtotal_pedido * Decimal('0.16')
            
            pedido.save()
            
            return pedido