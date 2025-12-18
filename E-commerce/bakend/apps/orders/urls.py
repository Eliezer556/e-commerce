from rest_framework.routers import DefaultRouter
from .views import PedidoViewSet

router = DefaultRouter()
# Esto crea rutas para /pedidos/, /pedidos/{id}/, etc.
router.register(r'pedidos', PedidoViewSet, basename='pedido') 

urlpatterns = router.urls