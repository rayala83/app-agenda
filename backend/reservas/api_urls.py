from rest_framework.routers import DefaultRouter
from .api_views import ReservaViewSet, ProfesionalViewSet

router = DefaultRouter()
router.register(r'reservas', ReservaViewSet)
router.register(r'profesionales', ProfesionalViewSet)

urlpatterns = router.urls