import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddReview = ({ token }) => {
  const [review, setReview] = useState({ title: '', author: '', rating: 1, reviewText: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const reviewId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (reviewId) {
      axios.get(`http://localhost:8080/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setReview(response.data);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [reviewId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = reviewId ? 'put' : 'post';
    const url = reviewId ? `http://localhost:8080/reviews/${reviewId}` : 'http://localhost:8080/reviews';
    axios[method](url, review, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      navigate('/my-reviews');
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleRatingChange = (rating) => {
    setReview({ ...review, rating });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded p-4">
            <h3 className="text-center mb-4">{reviewId ? 'Update Review' : 'Add Review'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={review.title}
                  onChange={(e) => setReview({ ...review, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control"
                  value={review.author}
                  onChange={(e) => setReview({ ...review, author: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div className="star-rating mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`fa fa-star ${review.rating >= star ? 'text-warning' : 'text-muted'}`}
                      onClick={() => handleRatingChange(star)}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Review Text</label>
                <textarea
                  className="form-control"
                  value={review.reviewText}
                  onChange={(e) => setReview({ ...review, reviewText: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">{reviewId ? 'Update' : 'Submit'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
