import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

function App() {
  const [playerId, setPlayerId] = useState('');
  const [gameResult, setGameResult] = useState(null);

  return (
    <Router basename="/pixel-game/">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setPlayerId={setPlayerId} />} />
          <Route path="/game" element={<Game playerId={playerId} setGameResult={setGameResult} />} />
          <Route path="/result" element={<Result gameResult={gameResult} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

