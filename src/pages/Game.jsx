import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions, submitAnswers } from '../api';

const QUESTION_COUNT = import.meta.env.VITE_QUESTION_COUNT || 5;
const PASS_THRESHOLD = import.meta.env.VITE_PASS_THRESHOLD || 3;

function Game({ playerId, setGameResult }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 如果沒有 playerId，導回首頁
    if (!playerId) {
      navigate('/');
      return;
    }

    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestions(QUESTION_COUNT);
        // 確保 data 是數組，避免後續 .length 報錯
        setQuestions(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError(err.message || '無法取得題目');
        setLoading(false);
      }
    };

    loadQuestions();
  }, [playerId, navigate]);

  const handleAnswer = async (optionKey) => {
    if (!questions || questions.length === 0) return;

    const currentQ = questions[currentIndex];
    const newAnswers = { ...answers, [currentQ.id]: optionKey };
    setAnswers(newAnswers);

    // 判斷是否還有下一題
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 答完最後一題，送出成績
      setSubmitting(true);
      
      // 在前端計算分數
      let score = 0;
      questions.forEach((q) => {
        if (newAnswers[q.id] === q.answer) {
          score++;
        }
      });

      try {
        const result = await submitAnswers(playerId, score, PASS_THRESHOLD);
        setGameResult(result);
        navigate('/result');
      } catch (err) {
        setError(err.message || '提交答案失敗');
        setSubmitting(false);
      }
    }
  };

  // 狀態處理渲染
  if (loading) return <div className="pixel-box loading">載入中...</div>;
  if (error) return <div className="pixel-box error-msg">{error}</div>;
  if (!questions || questions.length === 0) return <div className="pixel-box">找不到題目</div>;

  const currentQ = questions[currentIndex];

  // 防止 currentQ 為空時的報錯
  if (!currentQ) return <div className="pixel-box">資料錯誤</div>;

  // 使用 DiceBear API 預先載入，這裡直接用當前題目的 ID 當作種子
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=boss_${currentQ.id}`;

  return (
    <div className="pixel-box">
      {/* 這裡使用了 questions?.length 防止 undefined 報錯 */}
      <h2>STAGE {currentIndex + 1} / {questions?.length || 0}</h2>

      <img src={avatarUrl} alt="Boss Avatar" className="pixel-avatar" />

      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        {currentQ.question}
      </p>

      {submitting ? (
        <div className="loading">送出成績中...</div>
      ) : (
        <div className="options-container">
          {currentQ.options && Object.entries(currentQ.options).map(([key, value]) => (
            <button
              key={key}
              className="pixel-btn secondary"
              onClick={() => handleAnswer(key)}
            >
              {key}. {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Game;