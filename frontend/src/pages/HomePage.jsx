// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Mi Agenda</h1>
      <p style={styles.text}>
        Agenda tus citas de forma fácil y rápida. Haz clic en el botón de abajo para comenzar.
      </p>
      <Link to="/reservar" style={styles.button}>
        Reservar una cita
      </Link>
      <br/>
      <br/>
      <Link to="/calendario" style={styles.button}>Ver Calendario</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: '50px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};
