import React from 'react';

interface CardPlaceholderProps {
  position: number;
  meaning: string;
}

export const CardPlaceholder: React.FC<CardPlaceholderProps> = ({ position, meaning }) => {
  return (
    <div className="group bg-black p-12 aspect-[3/4] flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-500 border border-white/5">
      <div className="flex justify-between items-start">
        <span className="font-nav text-[10px] opacity-50 group-hover:opacity-100">POSITION {position}</span>
        <div className="w-2 h-2 bg-white group-hover:bg-black"></div>
      </div>
      
      <div className="flex-grow flex flex-col justify-center">
        <h4 className="text-2xl md:text-4xl font-bold-condensed leading-tight">
          {meaning}
        </h4>
      </div>

      <div className="h-4"></div>
    </div>
  );
};