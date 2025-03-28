from django import forms
from .models import Reserva
from django.core.exceptions import ValidationError


class ReservaForm(forms.ModelForm):
    class Meta:
        model = Reserva
        fields = ['nombre', 'email', 'servicio', 'fecha', 'hora']


    

    def clean(self):
        cleaned_data = super().clean()
        fecha = cleaned_data.get('fecha')
        hora = cleaned_data.get('hora')

        if fecha and hora:
            existe = Reserva.objects.filter(fecha=fecha,hora=hora).exists()
            if existe:
                raise ValidationError("ya hay una reserva en ese horario.")