import { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';

export const useGameLogic = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameState, setGameState] = useState('playing'); // playing, checking, won, lost
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [hiddenAnswers, setHiddenAnswers] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'phone' o 'public'
  const [publicData, setPublicData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const [lifelines, setLifelines] = useState({
    fiftyFifty: { used: false },
    phoneAFriend: { used: false },
    publicVote: { used: false },
  });

  useEffect(() => {
    const q = questionsData.find(q => q.level === currentLevel);
    setCurrentQuestion(q);
    setSelectedAnswer(null);
    setHiddenAnswers([]);
    setGameState('playing');
  }, [currentLevel]);

  // Lógica del Temporizador
useEffect(() => {
  // Si el juego no está en modo 'playing', detenemos el reloj
  if (gameState !== 'playing') return;

  // Si el tiempo llega a 0, el jugador pierde
  if (timeLeft === 0) {
    setGameState('lost');
    return;
  }

  // Intervalo de 1 segundo
  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer); // Limpieza para evitar fugas de memoria
}, [timeLeft, gameState]);

// Resetear el timer cada vez que cambiamos de pregunta
useEffect(() => {
  const q = questionsData.find(q => q.level === currentLevel);
  setCurrentQuestion(q);
  setSelectedAnswer(null);
  setHiddenAnswers([]);
  setTimeLeft(30); // <--- RESET AL TIEMPO
  setGameState('playing');
}, [currentLevel]);

  // DECLARACIÓN DE FUNCIONES
  const closeLifelineModal = () => setActiveModal(null);

  const handleLifeline = (type) => {
    if (lifelines[type].used || gameState !== 'playing') return;

    if (type === 'fiftyFifty') {
      const correctAnswerIndex = currentQuestion.answers.findIndex(a => a.correct);
      const incorrectIndices = currentQuestion.answers
        .map((_, index) => index)
        .filter(index => index !== correctAnswerIndex);

      const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
      setHiddenAnswers(toHide);
    }

    if (type === 'publicVote') {
      const isLevelEasy = currentLevel <= 5;
      const correctChance = isLevelEasy ? 80 : 40;
      
      let remaining = 100 - correctChance;
      const votes = currentQuestion.answers.map(ans => {
        if (ans.correct) return correctChance;
        const randomVote = Math.floor(Math.random() * remaining);
        remaining -= randomVote;
        return randomVote;
      });
      votes[3] += remaining; 

      setPublicData(votes);
      setActiveModal('public');
    }

    if (type === 'phoneAFriend') {
      setActiveModal('phone');
    }

    setLifelines(prev => ({ ...prev, [type]: { used: true } }));
  };

  const handleAnswer = (answer) => {
    if (gameState !== 'playing' || hiddenAnswers.includes(currentQuestion.answers.indexOf(answer))) return;
    
    setSelectedAnswer(answer);
    setGameState('checking');

    setTimeout(() => {
      if (answer.correct) {
        if (currentLevel === 15) {
          setGameState('won');
        } else {
          setCurrentLevel(prev => prev + 1);
        }
      } else {
        setGameState('lost');
      }
    }, 2000);
  };

  // RETORNO DE VALORES (Asegúrate de que coincidan con los nombres arriba)
  return { 
    currentQuestion, 
    currentLevel, 
    selectedAnswer, 
    gameState, 
    handleAnswer,
    lifelines,
    handleLifeline,
    hiddenAnswers,
    activeModal, 
    publicData,
    closeLifelineModal,
    timeLeft
  };
};