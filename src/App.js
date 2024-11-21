import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyReviews from './components/MyReviews';
import Login from './components/Login';
import Signup from './components/Signup';
import AddReview from './components/AddReview';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={token ? <Home token={token} /> : <Login setToken={setToken} />} />
          <Route path="/my-reviews" element={<MyReviews token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-review" element={<AddReview token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
