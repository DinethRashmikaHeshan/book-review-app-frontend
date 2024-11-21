import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: 'linear-gradient(to right, #2575fc, #6a11cb)',
        padding: '10px 20px',
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white fw-bold"
          to="/"
          style={{ fontSize: '24px' }}
        >
          Book Reviews
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/login"
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/signup"
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/my-reviews"
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    My Reviews
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/add-review"
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    Add Review
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                    style={{ fontSize: '16px', fontWeight: '500', borderRadius: '8px' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
