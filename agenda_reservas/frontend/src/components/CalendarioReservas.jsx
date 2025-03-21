import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

export default function CalendarioReservas() {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const navigate = useNavigate();
  
    const handleSelectDate = (fecha) => {
      setFechaSeleccionada(fecha);
  
      // Redirigir al formulario con la fecha seleccionada como query param
      const fechaFormateada = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
      navigate(`/reservar?fecha=${fechaFormateada}`);
    };
  
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Selecciona una fecha para reservar</h2>
        <Calendar
          onChange={handleSelectDate}
          value={fechaSeleccionada}
          minDate={new Date()}
        />
      </div>
    );
  }