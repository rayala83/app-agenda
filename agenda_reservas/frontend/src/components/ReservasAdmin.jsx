// src/components/Reservas.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get('http://127.0.0.1:8000/api/reservas/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservas();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('access');
  //   localStorage.removeItem('refresh');
  //   navigate('/admin'); // Redirigir al login
  // };

  return (
    <div>
      <h2>Reservas</h2>
      {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.nombre} - {reserva.servicio} - {reserva.fecha} {reserva.hora}
          </li>
        ))}
      </ul>
    </div>
  );
}
