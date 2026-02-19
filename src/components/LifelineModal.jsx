import { motion } from 'framer-motion';

export const LifelineModal = ({ type, data, question, onClose }) => {
  const correctAns = question.answers.find(a => a.correct).text;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border-2 border-blue-500 p-8 rounded-3xl max-w-sm w-full text-center"
      >
        {type === 'phone' ? (
          <>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Llamada a un amigo</h3>
            <p className="text-lg italic text-blue-100">
              "Hola... ¡vaya presión! Mira, no estoy seguro al 100%, pero creo que la respuesta correcta es <span className="text-white font-bold underline">{correctAns}</span>."
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-blue-400 mb-6">Voto del Público</h3>
            <div className="flex justify-around items-end h-40 gap-2 mb-4">
              {data.map((vote, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-600 rounded-t-md transition-all duration-1000" 
                    style={{ height: `${vote}%` }}
                  />
                  <span className="text-xs mt-2 font-bold">{['A', 'B', 'C', 'D'][i]}</span>
                  <span className="text-[10px] text-blue-300">{vote}%</span>
                </div>
              ))}
            </div>
          </>
        )}
        
        <button 
          onClick={onClose}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold uppercase tracking-wider"
        >
          Entendido
        </button>
      </motion.div>
    </div>
  );
};