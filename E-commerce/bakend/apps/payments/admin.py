from django.contrib import admin
from django.utils.html import format_html
from .models import Pago, TransaccionPago

class TransaccionPagoInline(admin.TabularInline):
    """Transacciones en línea dentro del admin de Pago"""
    model = TransaccionPago
    extra = 0
    readonly_fields = ['fecha_creacion', 'respuesta_gateway_preview']
    can_delete = False
    
    def respuesta_gateway_preview(self, obj):
        return format_html(
            '<details><summary>Ver respuesta</summary><pre>{}</pre></details>',
            str(obj.respuesta_gateway)
        )
    respuesta_gateway_preview.short_description = 'Respuesta Gateway'

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = [
        'referencia_display', 
        'pedido', 
        'metodo_pago', 
        'estado_badge', 
        'monto',
        'fecha_creacion'
    ]
    list_filter = ['estado', 'metodo_pago', 'fecha_creacion']
    search_fields = ['referencia', 'pedido__numero_pedido', 'pedido__usuario__email']
    readonly_fields = [
        'fecha_creacion', 
        'fecha_actualizacion', 
        'fecha_completado',
        'datos_metodo_pago_display'
    ]
    inlines = [TransaccionPagoInline]
    fieldsets = (
        ('Información Básica', {
            'fields': ('pedido', 'metodo_pago', 'estado', 'monto', 'referencia')
        }),
        ('Datos del Método de Pago', {
            'fields': ('datos_metodo_pago_display',),
            'classes': ('collapse',)
        }),
        ('Fechas', {
            'fields': ('fecha_creacion', 'fecha_actualizacion', 'fecha_completado'),
            'classes': ('collapse',)
        }),
    )
    
    def referencia_display(self, obj):
        return obj.referencia or f"PAGO-{obj.id}"
    referencia_display.short_description = 'Referencia'
    
    def estado_badge(self, obj):
        """Mostrar estado con colores"""
        colors = {
            'pendiente': 'orange',
            'procesando': 'blue',
            'completado': 'green',
            'fallido': 'red',
            'reembolsado': 'gray'
        }
        color = colors.get(obj.estado, 'black')
        return format_html(
            '<span style="color: white; background-color: {}; padding: 5px 10px; border-radius: 10px; font-weight: bold;">{}</span>',
            color, obj.get_estado_display()
        )
    estado_badge.short_description = 'Estado'
    
    def datos_metodo_pago_display(self, obj):
        return format_html('<pre>{}</pre>', str(obj.datos_metodo_pago))
    datos_metodo_pago_display.short_description = 'Datos del Método de Pago'

@admin.register(TransaccionPago)
class TransaccionPagoAdmin(admin.ModelAdmin):
    list_display = ['pago', 'referencia_transaccion', 'estado', 'monto', 'fecha_creacion']
    list_filter = ['estado', 'fecha_creacion']
    search_fields = ['referencia_transaccion', 'pago__referencia']
    readonly_fields = ['fecha_creacion', 'respuesta_gateway_display']
    
    def respuesta_gateway_display(self, obj):
        return format_html('<pre>{}</pre>', str(obj.respuesta_gateway))
    respuesta_gateway_display.short_description = 'Respuesta Gateway'
    
    def has_add_permission(self, request):
        return False  # No permitir agregar manualmente