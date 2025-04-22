from django.contrib import admin
from  .models import Reserva
from .models import Profesional
from .models import Perfil

admin.site.register(Reserva)
admin.site.register(Profesional)
admin.site.register(Perfil)
# Register your models here.
