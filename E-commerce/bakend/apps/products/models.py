from django.db import models
from django.conf import settings

# Modelo de categorias
class Categorias(models.Model):
    name = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=False)

    class Meta:
        app_label = 'products'
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        
    def __str__(self):
        return self.name

# Estados del modelo de productos
ESTADOS = (
    ('disponile', 'Disponible'),
    ('oferta', 'Oferta'),
    ('agotado', 'Agotado')
)

# Modelo de productos
class Productos(models.Model):
    name = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=50, choices=ESTADOS, default='disponible')
    img = models.ImageField(upload_to='productos/', null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=False)
    
    class Meta:
        app_label = 'products'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        
    def __str__(self):
        return self.name