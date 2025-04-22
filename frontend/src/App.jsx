import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ReservaForm from './components/ReservaForm';
import ReservasAdmin from './components/ReservasAdmin';
import Profesional from './components/Profesional';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import CalendarioReservas from './components/CalendarioReservas';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('access'));

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        {/* Ruta pública para agendar reserva */}
        <Route path="/reservar" element={<ReservaForm />} />
        <Route path="/calendario" element={<CalendarioReservas />} />
        <Route path="/profesional" element={<Profesional />} />

        {/* Ruta de login */}
        <Route path="/admin" element={<LoginForm onLogin={() => setLoggedIn(true)} />} />

        {/* Ruta protegida para admin */}
        <Route
          path="/admin/reservas"
          element={
            loggedIn ? <ReservasAdmin /> : <Navigate to="/admin" replace />
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/reservar" />} />
      </Routes>
    </Router>
  );
}

export default App;
