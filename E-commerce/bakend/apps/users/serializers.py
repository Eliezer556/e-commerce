from rest_framework import serializers
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Usuario

class UserSerializer(serializers.ModelSerializer):
    foto_perfil = serializers.SerializerMethodField()
 
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'first_name', 'last_name', 'telefono', 'fecha_nacimiento', 'foto_perfil']
        
    def get_foto_perfil(self, obj):
        request = self.context.get('request')
        
        # 1. 🛑 Identificar si el usuario tiene una foto cargada (obj.foto_perfil es un objeto FileField)
        if obj.foto_perfil and hasattr(obj.foto_perfil, 'url'):
            # Si hay una foto cargada (NO es None)
            if request is not None:
                return request.build_absolute_uri(obj.foto_perfil.url)
            else:
                return obj.foto_perfil.url
        
        # 2. ✅ Si obj.foto_perfil es None (después de eliminar): Devolver la URL por defecto
        # El valor por defecto se define en models.py como 'profile_pics/default.jpg'
        default_path = Usuario._meta.get_field('foto_perfil').default
        
        if request is not None:
            # Construir la URL absoluta usando la ruta por defecto (ej: /media/profile_pics/default.jpg)
            # Nota: build_absolute_uri añade el dominio y el puerto correctamente
            return request.build_absolute_uri(settings.MEDIA_URL + default_path)
        else:
            # Si no hay request (ej: shell), devuelve la ruta relativa incluyendo /media/
            return settings.MEDIA_URL + default_path
        

class UserRegistrationSerializer(serializers.ModelSerializer):
    
    password_confirm = serializers.CharField(write_only = True)

    class Meta: 
        model = Usuario
        fields = [
            'email',
            'first_name',
            'last_name',
            "telefono",
            'fecha_nacimiento',
            'password',
            'password_confirm',
            'foto_perfil'
        ]
        
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Validacion del Email:
    def validate_email(self, value):
        
        if Usuario.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("Ya existe un usuario con este email.")
        return value.lower()
    
    # Validacion de contraseña:
    def validate(self, data):
        
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                'password_confirm': 'Las contraseñas no coinciden'
            })
        return data
    
    def create(self, validated_data):
        
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        usuario = Usuario.objects.create_user(
            password=password,
            **validated_data
        )
        
        return usuario
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    # Este método se ejecuta DESPUÉS de la validación exitosa (credenciales correctas)
    def validate(self, attrs):
        # 1. Llama a la validación base (genera 'access' y 'refresh' tokens)
        data = super().validate(attrs)

        # 2. Agregar datos del usuario al cuerpo de la respuesta (response body)
        #    'self.user' es el objeto del usuario autenticado por TokenObtainPairSerializer
        user_serializer = UserSerializer(self.user, context=self.context)
        
        # 🚨 Agregamos la clave 'user' y el mensaje al diccionario de la respuesta (data)
        data['user'] = user_serializer.data 
        data['message'] = 'Login exitoso' 

        return data
    
class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # Solo necesitamos el campo que se va a actualizar
        fields = ['foto_perfil'] 
        # Añade esto para asegurarte de que ningún otro campo se valide
        extra_kwargs = {'foto_perfil': {'required': False,  'allow_null': True}}
        
    def update(self, instance, validated_data):
        # Si el frontend envía 'foto_perfil': None, esto borra la imagen
        if 'foto_perfil' in validated_data and validated_data['foto_perfil'] is None:
        # Lógica para borrar el archivo físico (opcional, pero buena práctica)
            if instance.foto_perfil:
                instance.foto_perfil.delete(save=False)
            validated_data['foto_perfil'] = None # Establece el campo a null en la BD

        return super().update(instance, validated_data)    