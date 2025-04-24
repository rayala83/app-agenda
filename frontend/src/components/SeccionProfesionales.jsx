import { useEffect, useState } from "react";
import './style.css';

export default function SeccionProfesionales({profesionales, onDelete, onAdd}) {

  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    foto: '',
    descripcion: '',
    perfil: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      nombre: '',
      email: '',
      foto: '',
      descripcion: '',
      perfil: '',
    });
    setMostrarModal(false);
  }

    return (
        <>
          <button onClick={() => setMostrarModal(true)}>Agregar Profesional</button>

          {mostrarModal && (
            <div>
              <div>
                <h2>Nuevo Profesional</h2>
                <form onSubmit={handleSubmit}>
                  <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required/>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email"/>
                  <input name="foto" value={formData.foto} onChange={handleChange} placeholder="URL de foto"/>
                  <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="descripcion"/>
                  <input name="perfil" value={formData.perfil} onChange={handleChange} placeholder="perfil"/>
                  <div>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setMostrarModal(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <h2 align="center">Profesionales</h2>
            <table border="1" width="80%" align="center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Perfil</th>
                  <th>Foto</th>
                  <th>Correo</th>
                  <th>Descripcion</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {profesionales.map((profesional) => (
                  <tr key={profesional.id}>
                    <td>{profesional.nombre}</td>
                    <td>{profesional.perfil}</td>
                    <td>{profesional.imagen}</td>
                    <td>{profesional.email}</td>
                    <td>{profesional.descripcion}</td>
                    <td><button onClick={() => onDelete(profesional.id)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
        </>
      );
}