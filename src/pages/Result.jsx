import { useNavigate } from 'react-router-dom';

function Result({ gameResult }) {
  const navigate = useNavigate();

  if (!gameResult) {
    return (
      <div className="pixel-box">
        <p>NO RESULT FOUND.</p>
        <button className="pixel-btn" onClick={() => navigate('/')}>
          GO HOME
        </button>
      </div>
    );
  }

  const { score, isPassed } = gameResult;

  return (
    <div className="pixel-box" style={{ textAlign: 'center' }}>
      <h1>{isPassed ? 'STAGE CLEAR!' : 'GAME OVER'}</h1>
      
      <div style={{ margin: '30px 0', fontSize: '24px' }}>
        <p>YOUR SCORE:</p>
        <p style={{ color: isPassed ? 'var(--secondary-color)' : 'var(--primary-color)' }}>
          {score}
        </p>
      </div>

      <button className="pixel-btn" onClick={() => navigate('/')}>
        PLAY AGAIN
      </button>
    </div>
  );
}

export default Result;
