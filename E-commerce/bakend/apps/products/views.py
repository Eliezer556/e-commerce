from django.shortcuts import render
from rest_framework import viewsets
from .models import Productos, Categorias
from .serializers import ProductosSerializers, CategoriasSerializers

# Vista del producto
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializers
    
    def get_serializer_context(self):
        """
        Pasar el request al serializer para que pueda construir URLs absolutas
        """
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# Vista de la categoria
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializers
