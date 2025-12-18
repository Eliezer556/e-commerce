from django.contrib import admin
from .models import Categorias, Productos

@admin.register(Categorias)
class CategoriasAdmin(admin.ModelAdmin):
    list_display = ('name', 'descripcion', 'fecha_creacion')
    search_fields = ('name',)

@admin.register(Productos)
class ProductosAdmin(admin.ModelAdmin):
    list_display = ('name', 'categoria', 'precio', 'estado', 'fecha_creacion')
    list_filter = ('categoria', 'estado')
    search_fields = ('name', 'descripcion')