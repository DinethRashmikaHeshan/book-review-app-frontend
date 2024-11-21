import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ token }) => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/reviews', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setReviews(response.data);
    }).catch((err) => {
      console.error(err);
    });
  }, [token]);

  const handleSearch = () => {
    axios.get(`http://localhost:8080/reviews?title=${search}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setReviews(response.data);
    }).catch((err) => {
      console.error(err);
    });
  };

  // Function to convert rating number to star representation
  const renderStars = (rating) => {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return fullStars + emptyStars;
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        margin: 0,
        padding: 0,
        width: '100%',
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: '100%',
          maxWidth: '800px',
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
          <h3>Reviews</h3>
        </div>

        <div className="card-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
            <button
              className="btn btn-primary mt-2 w-100"
              style={{
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                border: 'none',
                borderRadius: '10px',
              }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="row">
            {reviews.map((review) => (
              <div className="col-md-4" key={review.id}>
                <div className="card mb-4 shadow-sm" style={{ borderRadius: '10px' }}>
                  <div className="card-body">
                    <h5 className="card-title">{review.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{review.author}</h6>
                    <p className="card-text">{review.reviewText}</p>
                    <p className="card-text">
                      <strong>Rating:</strong> <span style={{ color: '#FFD700' }}>{renderStars(review.rating)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
