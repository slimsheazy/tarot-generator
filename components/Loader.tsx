import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8">
      <div className="w-12 h-12 border-2 border-white animate-spin"></div>
      <p className="font-nav animate-pulse">GENERATING SPREAD</p>
    </div>
  );
};