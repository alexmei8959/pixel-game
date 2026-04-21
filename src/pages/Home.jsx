import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ setPlayerId }) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setPlayerId(inputValue.trim());
    navigate('/game');
  };

  return (
    <div className="pixel-box">
      <h1>PIXEL QUIZ</h1>
      <p style={{ textAlign: 'center' }}>INSERT COIN TO PLAY</p>
      
      <form onSubmit={handleStart} style={{ marginTop: '30px' }}>
        <input
          type="text"
          className="pixel-input"
          placeholder="ENTER YOUR ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit" className="pixel-btn">
          START GAME
        </button>
      </form>
    </div>
  );
}

export default Home;
