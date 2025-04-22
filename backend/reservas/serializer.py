from rest_framework import serializers
from .models import Reserva, Profesional

class ReservaSerializer(serializers.ModelSerializer):
    # profesional = serializers.CharField(source='profesional.nombre', read_only=True)

    profesional = serializers.SlugRelatedField(queryset=Profesional.objects.all(),
    slug_field='nombre')

    class Meta:
        model = Reserva
        fields = '__all__'

    def validate(self, data):
        if Reserva.objects.filter(fecha=data['fecha'], hora=data['hora']).exists():
            raise serializers.ValidationError("ya existe una reserva para esta fecha y hora")
        return data

class ProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesional
        fields = '__all__'