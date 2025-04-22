from django.db import models

class Perfil(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre}"


class Profesional(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='images/', null=True)
    descripcion = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.nombre}"


class Reserva(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    servicio = models.CharField(max_length=100)
    profesional = models.ForeignKey(Profesional, null=True, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora = models.TimeField()
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.fecha} {self.hora}"
    





