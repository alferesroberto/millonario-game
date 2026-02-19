// src/features/trivia/AnswerOption.jsx
export const AnswerOption = ({ text, letter, status, onClick }) => {
  // status: 'idle', 'selected', 'correct', 'wrong'
  const statusStyles = {
    idle: "border-blue-500 hover:bg-blue-900/40 text-white",
    selected: "bg-orange-500 border-white text-white animate-pulse",
    correct: "bg-green-600 border-white text-white",
    wrong: "bg-red-600 border-white text-white",
  };

  return (
    <button 
      onClick={onClick}
      className={`
        w-full p-4 mb-3 border-2 rounded-full transition-all duration-300
        md:mb-0 md:text-lg font-semibold flex items-center
        ${statusStyles[status]}
      `}
    >
      <span className="text-orange-400 mr-3 font-bold">{letter}:</span>
      {text}
    </button>
  );
};