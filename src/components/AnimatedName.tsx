import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiUbuntu, SiSpringboot, SiLangchaincorporate, 
  SiOpencv, SiScikitlearn, SiTypescript, SiAngular
} from 'react-icons/si';
import { FaCloud, FaAws, FaCss3 } from 'react-icons/fa';

const nameWords = [
  [
    { char: 'L', icon: SiLangchaincorporate, color: '#38BDF8' }, // Verde LangChain/Pintinho
    { char: 'U', icon: SiUbuntu, color: '#E95420' }, // Laranja Ubuntu
    { char: 'C', icon: FaCss3, color: '#1572B6' }, // Azul CSS
    { char: 'A', icon: FaAws, color: '#FF9900' }, // Laranja AWS
    { char: 'S', icon: SiSpringboot, color: '#6DB33F' }, // Verde Spring
  ],
  [
    { char: 'C', icon: FaCloud, color: '#38BDF8' }, // Azul Cloud
    { char: 'O', icon: SiOpencv, color: '#F3F4F6' }, // Branco/Gelo OpenCV
    { char: 'S', icon: SiScikitlearn, color: '#F7931E' }, // Laranja Scikit
    { char: 'T', icon: SiTypescript, color: '#3178C6' }, // Azul TS
    { char: 'A', icon: SiAngular, color: '#DD0031' }, // Vermelho Angular
  ]
];

const Letter: React.FC<{ data: typeof nameWords[0][0], delay: number }> = ({ data, delay }) => {
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(false);
    }, delay * 1000 + 1500); 
    
    return () => clearTimeout(timer);
  }, [delay]);

  const IconComponent = data.icon;
  const displayIcon = showIcon;

  return (
    <span 
      className="inline-block relative w-[32px] sm:w-[45px] md:w-[60px] lg:w-[75px] 2xl:w-[95px] h-[40px] sm:h-[55px] md:h-[70px] lg:h-[85px] 2xl:h-[110px]"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <AnimatePresence mode="popLayout">
        {displayIcon && IconComponent ? (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16" color={data.color} />
          </motion.div>
        ) : (
          <motion.span
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-[110px] text-white"
          >
            {data.char}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export const AnimatedName: React.FC = () => {
  let globalIndex = 0;
  return (
    <div className="flex flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-2">
      {nameWords.map((word, wordIdx) => (
        <div key={wordIdx} className="flex items-center">
          {word.map((item) => {
            const currentDelay = globalIndex * 0.1;
            globalIndex++;
            return <Letter key={item.char + globalIndex} data={item} delay={currentDelay} />;
          })}
        </div>
      ))}
    </div>
  );
};
