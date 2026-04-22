import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const ComponentCard = ({ component, index }) => {
  const colorMap = {
    blue: 'bg-blue-600 text-black glow-blue',
    red: 'bg-red-600 text-black glow-red',
    yellow: 'bg-yellow-400 text-black glow-yellow',
    green: 'bg-green-600 text-black glow-green',
    orange: 'bg-orange-500 text-black glow-orange',
    purple: 'bg-purple-600 text-black glow-purple',
    white: 'bg-white text-black glow-white border-4 border-zinc-200',
  };

  const accentColor = colorMap[component.color] || colorMap.white;
  // We want all text to be black now
  const isDarkBrick = false; 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.05 
      }}
      className="glow-on-hover"
    >
      <Link to={`/component/${component.id}`}>
        <div className={`
          group relative h-96 w-full rounded-4xl 
          shadow-brick hover:shadow-brick-hover polished-plastic
          ${accentColor}
          transition-all duration-300 hover:-translate-y-3
        `}>
          {/* LEGO Studs - Corner placement with brick-color inheritance */}
          <div className="absolute top-6 left-6 w-6 h-6 rounded-full brick-stud" style={{ color: 'inherit' }} />
          <div className="absolute top-6 right-6 w-6 h-6 rounded-full brick-stud" style={{ color: 'inherit' }} />
          <div className="absolute bottom-6 left-6 w-6 h-6 rounded-full brick-stud" style={{ color: 'inherit' }} />
          <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full brick-stud" style={{ color: 'inherit' }} />

          {/* Main Content - Forced High Contrast BLACK text */}
          <div className="h-full w-full p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className={`
              w-32 h-32 rounded-3xl
              bg-white/40 backdrop-blur-md
              shadow-inner border-2 border-black/10
              flex items-center justify-center p-2
            `}>
              <img 
                src={component.image} 
                alt={component.name} 
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tightest leading-tight text-black">
                {component.name}
              </h3>
              <p className="text-sm font-black leading-relaxed line-clamp-2 text-black">
                {component.description}
              </p>
            </div>

            <div className={`
              inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest
              bg-black/10 text-black
            `}>
              <span>View Specs</span>
              <Icons.ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ComponentCard;
