from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    # Campos que se mostrarán en la lista
    list_display = ('email', 'first_name', 'last_name','is_staff', 'is_active', 'date_joined','foto_perfil')
    
    # Campos para buscar
    search_fields = ('email', 'first_name', 'last_name')
    
    # Filtros laterales
    list_filter = ('is_staff', 'is_active', 'email_verificado', 'date_joined')
    
    # Ordenamiento
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Información personal'), {
            'fields': ('first_name', 'last_name', 'telefono', 'fecha_nacimiento', 'foto_perfil')
        }),
        (_('Permisos'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Fechas importantes'), {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'foto_perfil'),
        }),
    )