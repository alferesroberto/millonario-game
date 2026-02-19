import { motion } from 'framer-motion';

export const Timer = ({ seconds }) => {
  const isUrgent = seconds <= 5;

  return (
    <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
      {/* Círculo de fondo con resplandor si es urgente */}
      <motion.div
        animate={{
          scale: isUrgent ? [1, 1.1, 1] : 1,
          borderColor: isUrgent ? '#ef4444' : '#3b82f6',
        }}
        transition={{ repeat: isUrgent ? Infinity : 0, duration: 0.5 }}
        className={`
          absolute inset-0 border-4 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm
          ${isUrgent ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'}
        `}
      >
        <span className={`text-2xl md:text-3xl font-black ${isUrgent ? 'text-red-500' : 'text-white'}`}>
          {seconds}
        </span>
      </motion.div>
    </div>
  );
};