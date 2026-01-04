import React from 'react';
import type { TarotSpread } from '../types';
import { CardPlaceholder } from './CardPlaceholder';

interface SpreadDisplayProps {
  spread: TarotSpread;
}

export const SpreadDisplay: React.FC<SpreadDisplayProps> = ({ spread }) => {
  const positions = [...spread.positions].sort((a, b) => a.position - b.position);

  return (
    <div className="w-full">
      <div className="border-t border-white pt-12 mb-20">
        <h2 className="text-4xl md:text-7xl font-bold-condensed mb-6 leading-none">
          {spread.spreadName}
        </h2>
        <p className="font-oswald-body text-xl text-white/60 max-w-2xl leading-relaxed">
          {spread.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/10 border border-white/10">
        {positions.map((cardPos) => (
          <CardPlaceholder 
            key={cardPos.position} 
            position={cardPos.position} 
            meaning={cardPos.meaning} 
          />
        ))}
      </div>
    </div>
  );
};