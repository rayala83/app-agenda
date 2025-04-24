import { useState } from "react";
import './style.css';

export default function SeccionReservas({reservas, onDelete}) {
    // const [reservas, setReservas] = useState([]);
    const [orden, setOrden] = useState({ columna: "fecha", ascendente: true });



    // const ordenarReservas = (columna) => {
    //     setOrden((prevOrden) => ({
    //       columna,
    //       ascendente: prevOrden.columna === columna ? !prevOrden.ascendente : true,
    //     }));
    //   };
      console.log("Reservas recibidas:", reservas);
    //   const reservasOrdenadas = [...reservas].sort((a, b) => {
    //     const valorA = a[orden.columna].toString().toLowerCase();
    //     const valorB = b[orden.columna].toString().toLowerCase();
    //     return orden.ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    //   });

      return(
        <>
            <h2 align="center">Reservas</h2>
            <table border="1" width="80%" align="center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Profesional</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.nombre}</td>
                    <td>{reserva.servicio}</td>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.hora}</td>
                    <td>{reserva.profesional}</td>
                    <td><button onClick={() => onDelete(reserva.id)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
        </>

      );
}