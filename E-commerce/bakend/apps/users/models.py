from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# Usuario manager personalizado
class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un email')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        return self.create_user(email, password, **extra_fields)

# Modelo de usuario
class Usuario(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="El teléfono debe tener formato: +999999999. Hasta 15 dígitos."
    )
    username = None
    email = models.EmailField(_('Email'), unique=True, error_messages={
        'unique': _('Ya existe un usuario con este email.')
    })
    telefono = models.CharField(_('Telefono'), validators=[phone_regex], max_length=17, blank=True, null=True)
    fecha_nacimiento = models.DateField(
        _('Fecha de Nacimiento'),
        null=True,
        blank=True
    )
    email_verificado = models.BooleanField(_('Email Verificado'), default=False)
    
    foto_perfil = models.ImageField(upload_to='profile_pics/', blank=True, null=True, default='profile_pics/default.jpg')
    
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="usuario_groups",  # ← related_name único
        related_query_name="usuario",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="usuario_permissions",  # ← related_name único
        related_query_name="usuario",
    )
    
    # my_producto = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    
    # ⚠️ CONFIGURACIÓN IMPORTANTE para usar email como login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = UsuarioManager()
    
    class Meta:
        verbose_name = _('Usuario')
        verbose_name_plural = _('Usuarios')
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.get_full_name()} - {self.email}"

    @property
    def nombre_completo(self):
        return f"{self.first_name} {self.last_name}".strip()
    