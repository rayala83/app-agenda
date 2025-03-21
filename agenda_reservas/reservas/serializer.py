from rest_framework import serializers
from .models import Reserva

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'

    def validate(self, data):
        if Reserva.objects.filter(fecha=data['fecha'], hora=data['hora']).exists():
            raise serializers.ValidationError("ya existe una reserva para esta fecha y hora")
        return data