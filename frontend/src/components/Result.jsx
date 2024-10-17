import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css'; // Make sure to import your CSS file for custom styles

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correct, wrong, total, notAttempted } = location.state; // Destructure notAttempted from location.state
  const percentage = (correct / total) * 100;

  // Assuming userAnswers are passed from the quiz component or stored in local storage
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

  // State to manage rating
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState(''); // Capture feedback message

  const handleSubmit = () => {
    console.log("Feedback Submitted: ", feedback);
    console.log("Rating Submitted: ", rating);
    alert("Thank you for your feedback!");
    navigate('/');
  };

  const handleReview = () => {
    navigate('/review', { state: { userAnswers, total } });
  };

  return (
    <div className="result">
      <h2>Quiz Result</h2>
      <p>Total Questions: {total}</p>
      <p>Correct Answers: {correct}</p>
      <p>Wrong Answers: {wrong}</p>
      <p>Unattempted Questions: {notAttempted}</p> 
      <p>Score: {percentage.toFixed(2)}%</p>

      <button className='buttonreview' onClick={handleReview}>
        Review Answers
      </button>
      <div className='feedback'>
        <h3>We value your feedback!</h3>

        <div className='review'>
          <h4>Rate your experience</h4>
          <div className='stars'>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type='radio'
                    name='rating'
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <svg
                    className='star'
                    viewBox='0 0 24 24'
                    fill={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </label>
              );
            })}
          </div>
        </div>

        <div className='feedback-form'>
          <textarea
            className='form-control'
            placeholder='Share your feedback...'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows='4'
          />
          <button type='button' className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
