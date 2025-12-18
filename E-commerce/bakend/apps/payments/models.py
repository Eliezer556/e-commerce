from django.db import models
# from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from apps.orders.models import Pedido

# User = get_user_model()

class Pago(models.Model):
    ESTADOS_PAGO = (
        ('pendiente', 'Pendiente'),
        ('procesando', 'Procesando'),
        ('completado', 'Completado'),
        ('fallido', 'Fallido'),
        ('reembolsado', 'Reembolsado'),
    )
    
    METODOS_PAGO = (
        ('tarjeta', 'Tarjeta de Crédito/Débito'),
        ('paypal', 'PayPal'),
        ('transferencia', 'Transferencia Bancaria'),
        ('efectivo', 'Efectivo'),
    )
    
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='pago')
    metodo_pago = models.CharField(max_length=20, choices=METODOS_PAGO)
    estado = models.CharField(max_length=20, choices=ESTADOS_PAGO, default='pendiente')
    
    # Información del pago
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    referencia = models.CharField(max_length=100, blank=True)
    datos_metodo_pago = models.JSONField(default=dict, blank=True)
    
    # Fechas
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    fecha_completado = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('Pago')
        verbose_name_plural = _('Pagos')
        indexes = [
            models.Index(fields=['estado']),
            models.Index(fields=['referencia']),
        ]
    
    def __str__(self):
        return f"Pago {self.referencia or self.id} - {self.pedido.numero_pedido}"
    
    def marcar_como_completado(self, referencia=None):
        self.estado = 'completado'
        self.fecha_completado = timezone.now()
        if referencia:
            self.referencia = referencia
        self.save()
        
        # Actualizar estado del pedido
        self.pedido.confirmar_pedido()
    
    def marcar_como_fallido(self, error_message=""):
        self.estado = 'fallido'
        if error_message:
            self.datos_metodo_pago['error'] = error_message
        self.save()

class TransaccionPago(models.Model):
    """Historial de transacciones para un pago (múltiples intentos)"""
    pago = models.ForeignKey(Pago, on_delete=models.CASCADE, related_name='transacciones')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    referencia_transaccion = models.CharField(max_length=100, blank=True)
    estado = models.CharField(max_length=20)
    respuesta_gateway = models.JSONField(default=dict)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('Transacción de Pago')
        verbose_name_plural = _('Transacciones de Pago')
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return f"Transacción {self.referencia_transaccion} - {self.estado}"