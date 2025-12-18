from rest_framework import viewsets, permissions
from .models import Pedido
from .serializers import PedidoCreateSerializer, PedidoLecturaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Pedido.objects.filter(usuario=self.request.user).order_by('-fecha_creacion')
    
    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return PedidoLecturaSerializer
        
        return PedidoCreateSerializer
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    
