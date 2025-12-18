from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from .models import Pedido, ItemPedido, HistorialPedido

class ItemPedidoInline(admin.TabularInline):
    """Items de pedido en línea dentro del admin de Pedido"""
    model = ItemPedido
    extra = 0  # No mostrar filas vacías adicionales
    readonly_fields = ['nombre_producto', 'precio_unitario', 'subtotal_display']
    fields = ['producto', 'nombre_producto', 'cantidad', 'precio_unitario', 'subtotal_display']
    can_delete = False
    
    def subtotal_display(self, obj):
        return f"${obj.subtotal:.2f}"
    subtotal_display.short_description = 'Subtotal'
    
    def has_add_permission(self, request, obj=None):
        # No permitir agregar nuevos items manualmente
        return False

class HistorialPedidoInline(admin.StackedInline):
    """Historial de cambios en el pedido"""
    model = HistorialPedido
    extra = 0
    readonly_fields = ['fecha_cambio', 'usuario', 'estado_anterior', 'estado_nuevo', 'comentario']
    fields = ['fecha_cambio', 'usuario', 'estado_anterior', 'estado_nuevo', 'comentario']
    can_delete = False
    
    def has_add_permission(self, request, obj=None):
        return False  # No permitir agregar manualmente

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = [
        'numero_pedido_link',
        'usuario_info', 
        'estado_badge', 
        'total_display', 
        'cantidad_productos_display',
        'fecha_creacion_formatted',
        'acciones'
    ]
    
    list_filter = [
        'estado', 
        'fecha_creacion',
        'fecha_actualizacion'
    ]
    
    search_fields = [
        'numero_pedido', 
        'usuario__email', 
        'usuario__first_name', 
        'usuario__last_name',
        'direccion_envio'
    ]
    
    readonly_fields = [
        'numero_pedido', 
        'fecha_creacion', 
        'fecha_actualizacion', 
        'total_display',
        'cantidad_productos_display',
        'direccion_envio_display'
    ]
    
    inlines = [ItemPedidoInline, HistorialPedidoInline]
    
    fieldsets = (
        ('Información Básica', {
            'fields': (
                'numero_pedido', 
                'usuario', 
                'estado'
            )
        }),
        ('Dirección de Envío', {
            'fields': ('direccion_envio_display',),
            'classes': ('collapse', 'wide')
        }),
        ('Totales', {
            'fields': (
                'subtotal',
                'impuesto', 
                'envio', 
                'descuento', 
                'total_display'
            )
        }),
        ('Fechas', {
            'fields': (
                'fecha_creacion', 
                'fecha_actualizacion', 
                'fecha_entrega'
            ),
            'classes': ('collapse',)
        }),
    )
    
    list_per_page = 25
    date_hierarchy = 'fecha_creacion'
    ordering = ['-fecha_creacion']
    
    # ===== MÉTODOS PARA LIST_DISPLAY =====
    
    def numero_pedido_link(self, obj):
        url = reverse('admin:orders_pedido_change', args=[obj.id])
        return format_html('<a href="{}"><strong>{}</strong></a>', url, obj.numero_pedido)
    numero_pedido_link.short_description = 'Número de Pedido'
    numero_pedido_link.admin_order_field = 'numero_pedido'
    
    def usuario_info(self, obj):
        return format_html(
            '{}<br><small style="color: #666;">{}</small>',
            obj.usuario.get_full_name() or obj.usuario.email,
            obj.usuario.email
        )
    usuario_info.short_description = 'Usuario'
    
    def estado_badge(self, obj):
        """Mostrar estado con colores"""
        colors = {
            'pendiente': '#ffc107',  # Amarillo
            'confirmado': '#17a2b8', # Azul
            'preparando': '#6f42c1', # Púrpura
            'enviado': '#20c997',    # Verde azulado
            'entregado': '#28a745',  # Verde
            'cancelado': '#dc3545',  # Rojo
            'reembolsado': '#6c757d' # Gris
        }
        color = colors.get(obj.estado, '#000000')
        return format_html(
            '<span style="color: white; background-color: {}; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold;">{}</span>',
            color, obj.get_estado_display()
        )
    estado_badge.short_description = 'Estado'
    estado_badge.admin_order_field = 'estado'
    
    def total_display(self, obj):
        return format_html('<strong>${:.2f}</strong>', obj.total)
    total_display.short_description = 'Total'
    total_display.admin_order_field = 'total'
    
    def cantidad_productos_display(self, obj):
        return format_html(
            '<center><span style="font-size: 14px; font-weight: bold;">{}</span></center>',
            obj.cantidad_productos
        )
    cantidad_productos_display.short_description = 'Productos'
    
    def fecha_creacion_formatted(self, obj):
        return obj.fecha_creacion.strftime('%d/%m/%Y %H:%M')
    fecha_creacion_formatted.short_description = 'Fecha Creación'
    fecha_creacion_formatted.admin_order_field = 'fecha_creacion'
    
    def acciones(self, obj):
        if obj.estado == 'pendiente':
            return format_html(
                '<button style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;" onclick="alert(\'Procesar pedido #{}\')">Procesar</button>',
                obj.numero_pedido
            )
        return "-"
    acciones.short_description = 'Acciones'
    
    # ===== MÉTODOS PARA FIELDSETS =====
    
    def total_display(self, obj):
        return f"${obj.total:.2f}"
    total_display.short_description = 'Total Calculado'
    
    def cantidad_productos_display(self, obj):
        return obj.cantidad_productos
    cantidad_productos_display.short_description = 'Total de Productos'
    
    def direccion_envio_display(self, obj):
        if obj.direccion_envio:
            html = "<div style='padding: 10px; background: #f8f9fa; border-radius: 5px;'>"
            for key, value in obj.direccion_envio.items():
                if value:  # Solo mostrar si tiene valor
                    html += f"<p><strong>{key.title()}:</strong> {value}</p>"
            html += "</div>"
            return format_html(html)
        return "Sin dirección de envío"
    direccion_envio_display.short_description = 'Dirección de Envío'
    
    # ===== ACCIONES ADMIN =====
    
    actions = ['marcar_como_confirmado', 'marcar_como_enviado', 'marcar_como_entregado']
    
    def marcar_como_confirmado(self, request, queryset):
        updated = queryset.filter(estado='pendiente').update(estado='confirmado')
        self.message_user(request, f"{updated} pedidos marcados como confirmados")
    marcar_como_confirmado.short_description = "Marcar pedidos seleccionados como CONFIRMADOS"
    
    def marcar_como_enviado(self, request, queryset):
        updated = queryset.filter(estado='confirmado').update(estado='enviado')
        self.message_user(request, f"{updated} pedidos marcados como enviados")
    marcar_como_enviado.short_description = "Marcar pedidos seleccionados como ENVIADOS"
    
    def marcar_como_entregado(self, request, queryset):
        updated = queryset.filter(estado='enviado').update(estado='entregado')
        self.message_user(request, f"{updated} pedidos marcados como entregados")
    marcar_como_entregado.short_description = "Marcar pedidos seleccionados como ENTREGADOS"

@admin.register(ItemPedido)
class ItemPedidoAdmin(admin.ModelAdmin):
    list_display = [
        'pedido_link',
        'producto_info', 
        'cantidad', 
        'precio_unitario_display', 
        'subtotal_display'
    ]
    
    list_filter = [
        'pedido__estado',
        'pedido__fecha_creacion'
    ]
    
    search_fields = [
        'pedido__numero_pedido',
        'producto__name',
        'nombre_producto'
    ]
    
    readonly_fields = [
        'pedido',
        'producto',
        'nombre_producto',
        'precio_unitario',
        'subtotal_display'
    ]
    
    fieldsets = (
        ('Información del Pedido', {
            'fields': ('pedido',)
        }),
        ('Información del Producto', {
            'fields': ('producto', 'nombre_producto')
        }),
        ('Detalles del Item', {
            'fields': ('cantidad', 'precio_unitario', 'subtotal_display')
        }),
    )
    
    def pedido_link(self, obj):
        url = reverse('admin:orders_pedido_change', args=[obj.pedido.id])
        return format_html('<a href="{}">{}</a>', url, obj.pedido.numero_pedido)
    pedido_link.short_description = 'Pedido'
    pedido_link.admin_order_field = 'pedido__numero_pedido'
    
    def producto_info(self, obj):
        return format_html(
            '<strong>{}</strong><br><small style="color: #666;">SKU: {}</small>',
            obj.nombre_producto,
            getattr(obj.producto, 'sku', 'N/A')
        )
    producto_info.short_description = 'Producto'
    
    def precio_unitario_display(self, obj):
        return f"${obj.precio_unitario:.2f}"
    precio_unitario_display.short_description = 'Precio Unitario'
    
    def subtotal_display(self, obj):
        return format_html('<strong>${:.2f}</strong>', obj.subtotal)
    subtotal_display.short_description = 'Subtotal'
    
    def has_add_permission(self, request):
        return False  # No permitir agregar items manualmente
    
    def has_delete_permission(self, request, obj=None):
        return False  # No permitir eliminar items

@admin.register(HistorialPedido)
class HistorialPedidoAdmin(admin.ModelAdmin):
    list_display = [
        'pedido_link',
        'estado_cambio',
        'usuario_info',
        'fecha_cambio_formatted',
        'comentario_preview'
    ]
    
    list_filter = [
        'estado_nuevo',
        'fecha_cambio'
    ]
    
    search_fields = [
        'pedido__numero_pedido',
        'usuario__email',
        'comentario'
    ]
    
    readonly_fields = [
        'pedido',
        'estado_anterior',
        'estado_nuevo',
        'usuario',
        'comentario',
        'fecha_cambio'
    ]
    
    def pedido_link(self, obj):
        url = reverse('admin:orders_pedido_change', args=[obj.pedido.id])
        return format_html('<a href="{}">{}</a>', url, obj.pedido.numero_pedido)
    pedido_link.short_description = 'Pedido'
    
    def estado_cambio(self, obj):
        return format_html(
            '{} → <strong>{}</strong>',
            obj.get_estado_anterior_display(),
            obj.get_estado_nuevo_display()
        )
    estado_cambio.short_description = 'Cambio de Estado'
    
    def usuario_info(self, obj):
        if obj.usuario:
            return obj.usuario.get_full_name() or obj.usuario.email
        return "Sistema"
    usuario_info.short_description = 'Usuario'
    
    def fecha_cambio_formatted(self, obj):
        return obj.fecha_cambio.strftime('%d/%m/%Y %H:%M')
    fecha_cambio_formatted.short_description = 'Fecha Cambio'
    
    def comentario_preview(self, obj):
        if obj.comentario:
            preview = obj.comentario[:50] + "..." if len(obj.comentario) > 50 else obj.comentario
            return format_html('<span title="{}">{}</span>', obj.comentario, preview)
        return "-"
    comentario_preview.short_description = 'Comentario'
    
    def has_add_permission(self, request):
        return False  # No permitir agregar manualmente
    
    def has_change_permission(self, request, obj=None):
        return False  # No permitir editar
    
    def has_delete_permission(self, request, obj=None):
        return False  # No permitir eliminar