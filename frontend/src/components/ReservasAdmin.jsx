import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [orden, setOrden] = useState({ columna: "fecha", ascendente: true });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          navigate("/admin"); // Si no hay token, redirigir al login
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/reservas/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReservas(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expirado o no válido
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/admin"); // Redirigir al login
        } else {
          console.error("Error al obtener reservas:", error);
        }
      }
    };

    fetchReservas();
  }, [navigate]);

  const ordenarReservas = (columna) => {
    setOrden((prevOrden) => ({
      columna,
      ascendente: prevOrden.columna === columna ? !prevOrden.ascendente : true,
    }));
  };

  const reservasOrdenadas = [...reservas].sort((a, b) => {
    const valorA = a[orden.columna].toString().toLowerCase();
    const valorB = b[orden.columna].toString().toLowerCase();
    return orden.ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
  });

  return (
    <div>
      <h2 align="center">Reservas</h2>
      <table border="1" width="80%" align="center">
        <thead>
          <tr>
            <th onClick={() => ordenarReservas("nombre")}>
              Nombre {orden.columna === "nombre" ? (orden.ascendente ? "🔼" : "🔽") : ""}
            </th>
            <th onClick={() => ordenarReservas("servicio")}>
              Servicio {orden.columna === "servicio" ? (orden.ascendente ? "🔼" : "🔽") : ""}
            </th>
            <th onClick={() => ordenarReservas("fecha")}>
              Fecha {orden.columna === "fecha" ? (orden.ascendente ? "🔼" : "🔽") : ""}
            </th>
            <th onClick={() => ordenarReservas("hora")}>
              Hora {orden.columna === "hora" ? (orden.ascendente ? "🔼" : "🔽") : ""}
            </th>
            <th onClick={() => ordenarReservas("profesional")}>
              Profesional {orden.columna === "profesional" ? (orden.ascendente ? "🔼" : "🔽") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {reservasOrdenadas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.nombre}</td>
              <td>{reserva.servicio}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.hora}</td>
              <td>{reserva.profesional}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
