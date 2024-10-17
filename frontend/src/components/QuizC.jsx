import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Quiz.css";

const QuizC = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(() => Number(localStorage.getItem('currentQuestion')) || 0);
  const [correctAnswers, setCorrectAnswers] = useState(() => Number(localStorage.getItem('correctAnswers')) || 0);
  const [wrongAnswers, setWrongAnswers] = useState(() => Number(localStorage.getItem('wrongAnswers')) || 0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(60);
  const [notAttempted, setNotAttempted] = useState(() => Number(localStorage.getItem('notAttempted')) || 0);
  const navigate = useNavigate();

  // Fetch questions from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/quiz/c');
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer interval setup
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          // If the timer hits zero
          if (selectedOption === null) {
            setNotAttempted((prev) => prev + 1);
          }
          nextQuestion(null); // Auto move to next question when time runs out
          return 60; // Reset timer to 60 seconds
        }
        return prevTime - 1; // Decrease time
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [selectedOption, currentQuestion]); // Ensure timer restarts when a new question is loaded

  const nextQuestion = useCallback((selected) => {
    if (selected === null) {
      setNotAttempted((prev) => prev + 1);
    } else {
      setSelectedOption(selected);
      if (questions[currentQuestion].correct_option === selected) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setWrongAnswers((prev) => prev + 1);
      }
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(60); // Reset timer to 60 seconds
    } else {
      handleSubmit(); // Call submit when the quiz ends
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('correctAnswers', correctAnswers);
    localStorage.setItem('wrongAnswers', wrongAnswers);
    localStorage.setItem('notAttempted', notAttempted);
    localStorage.setItem('selectedOption', selectedOption);
    localStorage.setItem('timer', timer);
  }, [currentQuestion, correctAnswers, wrongAnswers, notAttempted, selectedOption, timer]);

  const handleSubmit = () => {
    const totalQuestions = questions.length;
    const finalNotAttempted = totalQuestions - (correctAnswers + wrongAnswers); // Calculate not attempted questions

    const results = {
      correct: correctAnswers,
      wrong: wrongAnswers,
      notAttempted: finalNotAttempted,
      total: totalQuestions,
    };

    // Clear local storage
    localStorage.clear();
    
    // Navigate to results page
    navigate('/result', { state: results });
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="quiz">
      <h2>C Quiz</h2>
      <h5>{questions[currentQuestion].question}</h5>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="timer">Time Left: {timer} seconds</div>
      {currentQuestion < questions.length - 1 ? (
        <button className="next-button" onClick={() => nextQuestion(selectedOption)}>Next</button>
      ) : (
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default QuizC;
