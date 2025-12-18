from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, CategoriaViewSet

router = DefaultRouter()
router.register('producto', ProductoViewSet, basename='producto')
router.register('categoria', CategoriaViewSet, basename='categoria')
urlpatterns = router.urls
