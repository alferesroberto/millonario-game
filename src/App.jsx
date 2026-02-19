// src/App.jsx
import { useState } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { AnswerOption } from './features/trivia/AnswerOption';
import { PrizePyramid } from './components/PrizePyramid';
import { Lifelines } from './components/Lifelines';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Para el menú móvil
import {LifelineModal} from './components/LifelineModal'
import {Timer} from './components/Timer'
export default function App() {
  const { 
    currentQuestion, 
    currentLevel, 
    selectedAnswer, 
    gameState, 
    handleAnswer,
    lifelines,
    handleLifeline,
    hiddenAnswers ,
    activeModal,
    publicData,
    closeLifelineModal,
    timeLeft
  } = useGameLogic();

  const [isPyramidOpen, setIsPyramidOpen] = useState(false);

  if (!currentQuestion) {
    return (
      <div className="bg-slate-950 h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#02021a] text-white flex flex-col lg:flex-row font-sans overflow-hidden">
      
      {/* --- SECCIÓN IZQUIERDA: ÁREA DE JUEGO --- */}
      <section className="flex-1 flex flex-col justify-between p-4 md:p-12 relative">
        
        {/* Efectos de Iluminación de Fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-600/5 blur-[120px] pointer-events-none" />

        {/* Header: Logo, Comodines y Botón Menú (Mobile) */}
        <header className="z-20 flex justify-between items-center gap-4">
          <div className="flex flex-col">
           
            <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-blue-400">
              QUIÉN QUIERE SER <br/> 
              <span className="text-white">MILLONARIO</span>
            </h1>
            
          </div>

          <div className="flex items-center gap-4">
           <Timer seconds={timeLeft} />
            <Lifelines lifelines={lifelines} onUseLifeline={handleLifeline} />
              
            {/* Botón para ver premios en móvil */}
            <button 
              onClick={() => setIsPyramidOpen(true)}
              className="lg:hidden p-2 bg-blue-900/40 border border-blue-500/50 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Área Central: Pregunta con Animación */}
        <div className="z-10 flex-1 flex flex-col justify-center my-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto w-full text-center"
            >
              <div className="relative border-2 border-blue-500/40 bg-blue-950/20 p-6 md:p-10 rounded-3xl backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <h2 className="text-xl md:text-3xl font-semibold leading-tight">
                  {currentQuestion.question}
                </h2>
                {/* Decoración rombo lateral (estético) */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rotate-45 border-4 border-[#02021a] hidden md:block" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rotate-45 border-4 border-[#02021a] hidden md:block" />
              </div>
             
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer: Respuestas */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-5xl mx-auto w-full pb-4">
          {currentQuestion.answers.map((ans, index) => {
            const isHidden = hiddenAnswers.includes(index);
            return (
              <div key={index} className={isHidden ? "invisible pointer-events-none" : ""}>
                <AnswerOption
                  letter={['A', 'B', 'C', 'D'][index]}
                  text={ans.text}
                  status={
                    selectedAnswer === ans 
                    ? (gameState === 'checking' ? 'selected' : (ans.correct ? 'correct' : 'wrong'))
                    : (gameState === 'lost' && ans.correct ? 'correct' : 'idle')
                  }
                  onClick={() => handleAnswer(ans)}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SECCIÓN DERECHA: PIRÁMIDE (Desktop) --- */}
      <aside className="hidden lg:flex w-80 bg-slate-900/80 border-l border-white/5 p-8 flex-col justify-center items-center shadow-2xl">
        <PrizePyramid currentLevel={currentLevel} />
      </aside>

      {/* --- MODAL PIRÁMIDE (Mobile Only) --- */}
      <AnimatePresence>
        {isPyramidOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-6 lg:hidden"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsPyramidOpen(false)} className="p-2 text-orange-500">
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto">
              <PrizePyramid currentLevel={currentLevel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PANTALLA GAME OVER / WIN --- */}
      { (gameState === 'lost' || gameState === 'won') && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border-2 border-blue-500/50 p-10 rounded-3xl text-center max-w-md w-full shadow-[0_0_50px_rgba(59,130,246,0.3)]"
          >
            <h2 className="text-4xl font-black mb-4 text-orange-500">
              {gameState === 'won' ? '¡MILLONARIO!' : 'FIN DEL JUEGO'}
            </h2>
            <p className="text-xl mb-8 text-blue-200">
              {gameState === 'won' ? 'Has conquistado el juego.' : `Te llevas a casa el premio de tu último nivel seguro.`}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition-colors"
            >
              JUGAR DE NUEVO
            </button>
          </motion.div>
        </div>
      )}
 {/* CORRECTO: Usa la función que viene del hook */}
{activeModal && (
  <LifelineModal 
    type={activeModal} 
    data={publicData} 
    question={currentQuestion}
    onClose={closeLifelineModal} // <--- ESTA ES LA FUNCIÓN CORRECTA
  />
)}
    </main>
  );
}