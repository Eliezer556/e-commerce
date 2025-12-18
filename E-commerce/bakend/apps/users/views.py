from rest_framework import status, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserRegistrationSerializer, UserSerializer, CustomTokenObtainPairSerializer, ProfileImageSerializer
from .models import Usuario

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    
    reg_serializer = UserRegistrationSerializer(data=request.data) 
    
    if reg_serializer.is_valid():
        usuario = reg_serializer.save()

        # 🚨 CAMBIO REQUERIDO: Usar UserSerializer y pasar el contexto
        # Esto asegura que la foto_perfil se serialice con la URL absoluta.
        user_data_serializer = UserSerializer(usuario, context={'request': request})
        
        return Response({
            'mensaje': 'Usuario registrado exitosamente',
            'usuario': user_data_serializer.data # ⬅️ Usamos los datos serializados
        }, status=status.HTTP_201_CREATED)
        
    return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def logout_user(request):
    
    return Response({
        'message': 'Logout exitoso',
    }, status=status.HTTP_200_OK)

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Vista personalizada que usa CustomTokenObtainPairSerializer
    para devolver los tokens JWT y los datos del usuario.
    """
    serializer_class = CustomTokenObtainPairSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request 
        return context

class ProfileImageUpdateView(generics.UpdateAPIView):
    queryset = Usuario.objects.all()
    
    # 🚨 CAMBIO AQUÍ: Usar el Serializer de ESCRITURA
    serializer_class = ProfileImageSerializer 
    
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self):
        return self.request.user
        
    def update(self, request, *args, **kwargs):
        
        super().update(request, *args, **kwargs)
        updated_user = self.get_object() 
        response_serializer = UserSerializer(updated_user, context={'request': request})
        
        return Response({
            'message': 'Foto de perfil actualizada exitosamente',
            'user': response_serializer.data # ⬅️ Usamos el UserSerializer de LECTURA
        }, status=status.HTTP_200_OK)