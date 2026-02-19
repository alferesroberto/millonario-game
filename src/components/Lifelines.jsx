import { Zap, Phone, Users } from 'lucide-react';

export const Lifelines = ({ lifelines, onUseLifeline }) => {
  const icons = [
    { id: 'fiftyFifty', icon: <Zap size={24} />, label: '50:50' },
    { id: 'phoneAFriend', icon: <Phone size={24} />, label: 'Llamar' },
    { id: 'publicVote', icon: <Users size={24} />, label: 'Público' },
  ];

  return (
    <div className="flex gap-4 mb-8">
      {icons.map((item) => (
        <button
          key={item.id}
          disabled={lifelines[item.id].used}
          onClick={() => onUseLifeline(item.id)}
          className={`
            group relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 
            flex items-center justify-center transition-all duration-300
            ${lifelines[item.id].used 
              ? "border-red-900 bg-red-950/20 text-red-900 cursor-not-allowed" 
              : "border-blue-500 bg-blue-900/20 text-blue-400 hover:scale-110 hover:bg-blue-500 hover:text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"}
          `}
        >
          {item.icon}
          {lifelines[item.id].used && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[2px] bg-red-600 rotate-45" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};