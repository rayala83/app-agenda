import { Link, useNavigate } from 'react-router-dom';

export default function NavBar ({ loggedIn, setLoggedIn }){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setLoggedIn(false);
        navigate('/admin');
    }

    return(
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>Mi Agenda</Link>
            </div>
            <div style={styles.menu}>
                <Link to="/reservar" style={styles.link}>Reservar</Link>
                {loggedIn ? (
                    <>
                        <Link to="/admin/reservas" style={styles.link}>Panel Admin</Link>
                        <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
                    </>                    
                    
                ) : (
                    <Link to="/admin" style={styles.link}>Login</Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
      backgroundColor: '#333',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      color: '#fff',
      fontSize: '20px',
    },
    menu: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
    },
    logoutButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '1em',
    },
  };