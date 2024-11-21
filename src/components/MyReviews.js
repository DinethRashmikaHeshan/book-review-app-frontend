import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyReviews = ({ token }) => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/reviews/my-reviews', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setReviews(response.data);
    }).catch((err) => {
      console.error(err);
    });
  }, [token]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setReviews(reviews.filter((review) => review.id !== id));
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleUpdate = (id) => {
    navigate(`/add-review?id=${id}`);
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
          <h3>My Reviews</h3>
        </div>

        <div className="card-body">
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
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-warning"
                        style={{
                          background: 'linear-gradient(to right, #FF8C00, #FFD700)',
                          border: 'none',
                          borderRadius: '10px',
                        }}
                        onClick={() => handleUpdate(review.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{
                          background: '#dc3545',
                          border: 'none',
                          borderRadius: '10px',
                        }}
                        onClick={() => handleDelete(review.id)}
                      >
                        Delete
                      </button>
                    </div>
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

export default MyReviews;
