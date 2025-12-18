from rest_framework import serializers
from .models import Productos, Categorias

class ProductosSerializers(serializers.ModelSerializer):
    
    imagen_url = serializers.SerializerMethodField()
    
    categoria_nombre = serializers.CharField(source='categoria.name', read_only=True)
    
    class Meta:
        model = Productos
        fields = '__all__'
        
    def get_imagen_url(self, obj):
        if obj.img:
            # Obtener el request del contexto para construir URL absoluta
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.img.url)
            # Fallback: construir URL manualmente para desarrollo
            return f"http://127.0.0.1:8000{obj.img.url}"
        return None
        
        
class CategoriasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = ['id', 'name']