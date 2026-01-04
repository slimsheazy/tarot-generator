import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-baseline gap-4">
      <h1 className="text-4xl md:text-6xl font-bold-condensed">TAROT SPREAD GENERATOR</h1>
    </header>
  );
};