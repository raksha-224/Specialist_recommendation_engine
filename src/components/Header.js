import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header" style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderBottom: '1px solid #eee' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '1.5em' }}>
          <span className="heart-icon" style={{ color: '#dc3545', marginRight: '5px', fontSize: '1.2em' }}>❤️</span> HealthGuide
        </Link>

        <nav style={{ flexGrow: 1, marginLeft: '20px' }}> {/* Allow nav to grow and add left margin */}
          <ul className="nav-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
            <li style={{ flex: '1', textAlign: 'center' }}><Link to="/" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.3s ease' }}>Home</Link></li>
            <li style={{ flex: '1', textAlign: 'center' }}><Link to="/about" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.3s ease' }}>About</Link></li>

            <li style={{ flex: '1', textAlign: 'center' }}><Link to="/specialist" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.3s ease' }}>Specialists</Link></li>
            <li style={{ flex: '1', textAlign: 'center' }}><Link to="/contact" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.3s ease' }}>Contact</Link></li>
            <li style={{ flex: '1', textAlign: 'center' }}><Link to="/dashboard" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.3s ease' }}>Dashboard</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}> {/* Add margin to the left of buttons */}
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="btn btn-primary" style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1em' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', marginRight: '15px', fontSize: '1.1em' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.1em' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;