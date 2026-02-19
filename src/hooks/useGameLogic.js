import { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';

export const useGameLogic = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameState, setGameState] = useState('playing'); 
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [hiddenAnswers, setHiddenAnswers] = useState([]);
  const [activeModal, setActiveModal] = useState(null); 
  const [publicData, setPublicData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const [lifelines, setLifelines] = useState({
    fiftyFifty: { used: false },
    phoneAFriend: { used: false },
    publicVote: { used: false },
  });

  // --- UNIFICADO: Lógica de carga de pregunta y mezcla ---
  useEffect(() => {
    const baseQuestion = questionsData.find(q => q.level === currentLevel);
    
    if (baseQuestion) {
      // 1. Inyectamos ID original para que el 50:50 no falle
      const answersWithId = baseQuestion.answers.map((ans, idx) => ({
        ...ans,
        originalIndex: idx 
      }));

      // 2. MEZCLA REAL: Usamos una lógica de ordenamiento aleatorio más fuerte
      const shuffled = [...answersWithId].sort(() => Math.random() - 0.5);

      setCurrentQuestion({
        ...baseQuestion,
        answers: shuffled
      });
    }

    // 3. Reseteamos todo para el nuevo nivel
    setSelectedAnswer(null);
    setHiddenAnswers([]);
    setGameState('playing');
    setTimeLeft(30); // El tiempo vuelve a 30 aquí

  }, [currentLevel]); // Este es ahora el ÚNICO efecto que escucha al nivel


  // Lógica del Temporizador (Este se queda igual, solo maneja el tic-tac)
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft === 0) {
      setGameState('lost');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);


  // --- FUNCIONES ---
  const closeLifelineModal = () => setActiveModal(null);

  const handleLifeline = (type) => {
    if (lifelines[type].used || gameState !== 'playing') return;

    if (type === 'fiftyFifty') {
      const incorrectAnswers = currentQuestion.answers.filter(a => !a.correct);
      const toHide = incorrectAnswers
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(a => a.originalIndex);

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
      votes[votes.length - 1] += remaining; 

      setPublicData(votes);
      setActiveModal('public');
    }

    if (type === 'phoneAFriend') {
      setActiveModal('phone');
    }

    setLifelines(prev => ({ ...prev, [type]: { used: true } }));
  };

  const handleAnswer = (answer) => {
    if (gameState !== 'playing') return;
    
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

  return { 
    currentQuestion, currentLevel, selectedAnswer, gameState, 
    handleAnswer, lifelines, handleLifeline, hiddenAnswers,
    activeModal, publicData, closeLifelineModal, timeLeft
  };
};