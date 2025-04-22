import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import './style.css';


export default function Profesional(){
    const [profesionales, setProfesionales] = useState([]);

    // const divs = Array.from({ length: 5 }, (_, index) =>());
    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/api/profesionales/')
        .then((res) => {
            setProfesionales(res.data);
        })
        .catch((error) => {
            console.error(err);
        });
    }, []);




    return(
        <div className="container">
            <div className="div-wrapper">
                {profesionales.map((profesional) => (
                <div key={profesional.id} className="div-item">
                    <h2>{profesional.nombre}</h2>
                    <img src="http://127.0.0.1:8000/media/papercraft_box_pikachu_by_chaaa94_d89jqgo_hosted_at_ImgBB.jpeg" alt="MDN" />
                    <p>{profesional.descripcion}</p>
                    <Link className="btn-reserva" to="/calendario">Reservar una cita</Link>
                </div>
                ))}              

            </div>            
        </div>        
    );

};
