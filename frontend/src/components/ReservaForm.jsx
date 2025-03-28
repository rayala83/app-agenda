import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ReservaForm({ onNuevaReserva }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fechaURL = params.get('fecha') || '';

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: '',
    fecha: fechaURL,
    hora: '',
  });

  const [error, setError] = useState(null);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  // Todas las posibles horas del día (ajusta según tus necesidades)
  const todasLasHoras = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
  ];

  useEffect(() => {
    const fetchHorasOcupadas = async () => {
      if (!fechaURL) return;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reservas/horas_ocupadas/?fecha=${fechaURL}`);
        const horasOcupadas = response.data?.horas_ocupadas ?? [];

        // Filtrar horas disponibles
        const disponibles = todasLasHoras.filter(hora => !horasOcupadas.includes(hora));
        setHorasDisponibles(disponibles);
      } catch (err) {
        console.error('Error al obtener horas ocupadas:', err);
        setHorasDisponibles(todasLasHoras); // fallback: mostrar todas
      }
    };

    fetchHorasOcupadas();
  }, [fechaURL]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reservas/', formData);

      setFormData({
        nombre: '',
        email: '',
        servicio: '',
        fecha: fechaURL,
        hora: '',
      });

// Limpiar errores
    setError(null);

    // Notificar
    alert('Reserva creada con éxito ✅');

    if (onNuevaReserva) onNuevaReserva(response.data);
  } catch (err) {
    console.error('Error al hacer la reserva:', err);

    // Si el backend devuelve errores específicos
    if (err.response?.data?.non_field_errors) {
      setError(err.response.data.non_field_errors[0]);
    } else if (err.response?.data?.hora) {
      setError('La hora seleccionada ya está ocupada.');
    } else {
      setError('Ocurrió un error al hacer la reserva.');
    }
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear nueva reserva</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
      <input type="text" name="servicio" placeholder="Servicio" value={formData.servicio} onChange={handleChange} required />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required readOnly />

      <select name="hora" value={formData.hora} onChange={handleChange} required>
        <option value="">Selecciona una hora</option>
        {horasDisponibles.map((hora) => (
          <option key={hora} value={hora}>{hora}</option>
        ))}
      </select>

      <button type="submit">Reservar</button>
    </form>
  );
}
