import { motion } from 'framer-motion';
import { prizeMoney } from '../data/prizes';

export const PrizePyramid = ({ currentLevel }) => {
  // Invertimos para mostrar el millón arriba
  const displayPrizes = [...prizeMoney].reverse();

  return (
    <div className="flex flex-col gap-1 w-full max-w-[280px] font-mono">
      {displayPrizes.map((p) => {
        const isActive = currentLevel === p.id;
        const isPassed = currentLevel > p.id;

        return (
          <motion.div
            key={p.id}
            initial={false}
            animate={{
              scale: isActive ? 1.05 : 1,
              backgroundColor: isActive ? "rgba(249, 115, 22, 1)" : "transparent",
            }}
            className={`
              relative px-4 py-1 rounded-sm flex justify-between items-center
              ${isActive ? "shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10" : ""}
              ${p.safe ? "text-white font-bold" : "text-orange-400/70"}
              ${isPassed ? "text-orange-200/50" : ""}
            `}
          >
            {/* Número de nivel */}
            <span className={`text-xs ${isActive ? "text-white" : "text-orange-500"}`}>
              {p.id.toString().padStart(2, '0')}
            </span>

            {/* Rombo decorativo (Estilo Millonario) */}
            <div className={`h-[2px] flex-1 mx-3 bg-current opacity-20 hidden md:block`} />

            {/* Monto de dinero */}
            <span className={`${isActive ? "text-white" : p.safe ? "text-white" : "text-orange-400"}`}>
              {p.amount}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};