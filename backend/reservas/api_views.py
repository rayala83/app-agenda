from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .models import Reserva, Profesional
from .serializer import ReservaSerializer, ProfesionalSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

    def get_permissions(self):
        if self.action == 'POST':
            return [AllowAny()]  # permite crear sin autenticación
        return super().get_permissions()


    @action(detail=False, methods=['get'])
    def horas_ocupadas(self, request):
        fecha = request.query_params.get('fecha')
        if fecha:
            reservas = Reserva.objects.filter(fecha=fecha)
        else:
            return Response({"error": "fecha no proporcionada"}, status=400)
        
        
        horas_ocupadas = [hora.strftime('%H:%M') for hora in reservas.values_list('hora', flat=True)]

        return Response(horas_ocupadas)


class ProfesionalViewSet(viewsets.ModelViewSet):
    queryset  = Profesional.objects.all()
    serializer_class = ProfesionalSerializer
    # serializer = ProfesionalSerializer(profesionales, many=True)
    # return Response(serializer.data)
