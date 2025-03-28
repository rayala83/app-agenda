from django.shortcuts import render, redirect
from .forms import ReservaForm
from .models import Reserva
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def reservar(request):
    if request.method == 'POST':
        form = ReservaForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'reservas/confirmacion.html')
        else:
            return render(request, 'reservas/reservar.html', {'form': form})            
    else:
        form = ReservaForm()
        return render(request, 'reservas/reservar.html', {'form': form})
    
def logout_view(request):
    logout(request)  # Cierra la sesión
    return redirect('reservar')  # Redirige a la vista 'reservar'
        
@login_required
def lista_reservas(request):
    reservas = Reserva.objects.all().order_by('-fecha', '-hora')
    return render(request, 'reservas/lista_reservas.html', {'reservas': reservas})


