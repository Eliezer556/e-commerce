from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.users.models import Usuario
from apps.products.models import Productos

class Pedido(models.Model):
    ESTADOS_PEDIDO = (
        ('pendiente', 'Pendiente de Pago'),
        ('confirmado', 'Confirmado'),
        ('preparando', 'Preparando'),
        ('enviado', 'Enviado'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
        ('reembolsado', 'Reembolsado'),
    )
    
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='pedidos')
    numero_pedido = models.CharField(max_length=20, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADOS_PEDIDO, default='pendiente')
    
    # Información de envío
    direccion_envio = models.JSONField(default=dict)  
    
    # Totales
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    impuesto = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    envio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    descuento = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Metadata
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    fecha_entrega = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('Pedido')
        verbose_name_plural = _('Pedidos')
        ordering = ['-fecha_creacion']
        indexes = [
            models.Index(fields=['estado']),
            models.Index(fields=['usuario', 'estado']),
            models.Index(fields=['numero_pedido']),
        ]
    
    def __str__(self):
        return f"Pedido {self.numero_pedido} - {self.usuario.email}"
    
    def save(self, *args, **kwargs):
        if not self.numero_pedido:
            self.numero_pedido = self.generar_numero_pedido()
        
        # Calcular total
        self.total = self.subtotal + self.impuesto + self.envio - self.descuento
        super().save(*args, **kwargs)
    
    def generar_numero_pedido(self):
        from datetime import datetime
        timestamp = datetime.now().strftime('%Y%m%d')
        count = Pedido.objects.count() + 1
        return f"ORD-{timestamp}-{count:06d}"
    
    @property
    def cantidad_productos(self):
        return sum(item.cantidad for item in self.items.all())
    
    def puede_cancelar(self):
        return self.estado in ['pendiente', 'confirmado']
    
    def confirmar_pedido(self):
        """Método para confirmar el pedido cuando el pago se complete"""
        if self.estado == 'pendiente':
            self.estado = 'confirmado'
            self.save()

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Productos, on_delete=models.PROTECT)
    
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    nombre_producto = models.CharField(max_length=255) 
    
    class Meta:
        verbose_name = _('Item de Pedido')
        verbose_name_plural = _('Items de Pedido')
    
    def __str__(self):
        return f"{self.cantidad}x {self.nombre_producto}"
    
    @property
    def subtotal(self):
        return self.cantidad * self.precio_unitario
    
    def save(self, *args, **kwargs):
        # Guardar snapshot del nombre del producto
        if not self.nombre_producto:
            self.nombre_producto = self.producto.name
        super().save(*args, **kwargs)

class HistorialPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='historial')
    estado_anterior = models.CharField(max_length=20)
    estado_nuevo = models.CharField(max_length=20)
    comentario = models.TextField(blank=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fecha_cambio = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('Historial de Pedido')
        verbose_name_plural = _('Historial de Pedidos')
        ordering = ['-fecha_cambio']
    
    def __str__(self):
        return f"{self.pedido.numero_pedido} - {self.estado_anterior} → {self.estado_nuevo}"