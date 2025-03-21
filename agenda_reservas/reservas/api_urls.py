from rest_framework.routers import DefaultRouter
from .api_views import ReservaViewSet

router = DefaultRouter()
router.register(r'reservas', ReservaViewSet)

urlpatterns = router.urls