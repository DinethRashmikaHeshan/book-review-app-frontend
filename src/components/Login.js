import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', user)
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch(() => {
        setError('Invalid username or password');
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        margin: 0,
        padding: 0,
        width:'100%'
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '15px',
          padding: '20px',
        }}
      >
        <div
          className="text-center text-white p-4 mb-3"
          style={{
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            borderRadius: '10px',
          }}
        >
          <h3>Login</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                border: 'none',
                borderRadius: '10px',
              }}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#6a11cb', fontWeight: 'bold', textDecoration: 'none' }}>
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
