import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import QuizC from './components/QuizC';
import QuizPython from './components/QuizPython';
import QuizJava from './components/QuizJava';
import Result from './components/Result';
// import Review from './components/Review';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/c" element={<QuizC />} />
        <Route path="/quiz/python" element={<QuizPython />} />
        <Route path="/quiz/java" element={<QuizJava />} />
        {/* <Route path="/review" element={<Review />} /> */}
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
