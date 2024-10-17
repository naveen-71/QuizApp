import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = (module) => {
    if (module === 'C') navigate('/quiz/c');
    if (module === 'Python') navigate('/quiz/python');
    if (module === 'Java') navigate('/quiz/java');
  };

  return (
    <>
    <div className='Header'>
    <h1 className='welcome'> Welcome Everyone</h1>
    <h1>Select a Quiz Module</h1>
    </div>
    <div className="home">
      
      <div className="modules">
        <button className='button1' onClick={() => startQuiz('C')}>C Programming</button><br />
        <button className='button2' onClick={() => startQuiz('Python')}>Python</button><br />
        <button className='button3' onClick={() => startQuiz('Java')}>Java</button>
      </div>

      <div className='footer'>
        <span>All the copy rights © are reserved by Naveenkumar</span>
      </div>
    </div>
    </>
  );
};

export default Home;

