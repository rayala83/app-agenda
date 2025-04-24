import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SeccionReservas from "./Seccionreservas";
import SeccionProfesionales from "./SeccionProfesionales";

import './style.css';

export default function Reservas() {
  const [seccionActiva, setSeccionActiva] = useState("reserva");
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {      
      const token = localStorage.getItem("access");
      if (!token) {
        navigate("/admin"); // Si no hay token, redirigir al login
        return;
      }

      let endpoint = "";
      if (seccionActiva === "reservas") endpoint = "reservas";
      if (seccionActiva === "profesionales") endpoint = "profesionales";

      if (!endpoint) return;
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${endpoint}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDatos(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expirado o no válido
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/admin"); // Redirigir al login
        } else {
          console.error("Error al obtener los datos:", error);
        }
      }
    };
   
    fetchData();
  }, [seccionActiva,navigate]);


  const handleDelete = async (id) => {
    if(seccionActiva === "profesionales"){
      await fetch(`http://127.0.0.1:8000/api/profesionales/${id}/`, {method: 'DELETE'});
    }else if( seccionActiva === "reservas"){
      await fetch(`http://127.0.0.1:8000/api/reservas/${id}/`, {method: 'DELETE'});
    } 
      setDatos(prev => prev.filter(p => p.id  !== id));
  };

  const handleAdd = async (nuevoProfesional) => {
    const res = await fetch(`http://127.0.0.1:8000/api/profesionales/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProfesional)
    });
    const data = await res.json();
    setDatos(prev => [...prev, data]);
  }


  return (
    <div className="container_admin">
      <div className="barra_lateral">
        <ul>
          <li><button onClick={() => setSeccionActiva("reservas")}>Reserva</button></li>
          <li><button onClick={() => setSeccionActiva("profesionales")}>Profesional</button></li>
        </ul>
      </div>
      <div className="reservas fade-in">
        {seccionActiva === "reservas" && <SeccionReservas reservas={datos} onDelete={handleDelete} />}
        {seccionActiva === "profesionales" && <SeccionProfesionales profesionales={datos} onDelete={handleDelete} onAdd={handleAdd}/>}
      </div>
    </div>
  );
}
