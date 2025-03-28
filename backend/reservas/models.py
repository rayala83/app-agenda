from django.db import models

class Reserva(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    servicio = models.CharField(max_length=100)
    fecha = models.DateField()
    hora = models.TimeField()
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.fecha} {self.hora}"
