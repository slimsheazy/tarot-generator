import React, { useState } from 'react';

interface SpreadGeneratorFormProps {
  onGenerate: (query: string, cardCount: string) => void;
  isLoading: boolean;
}

export const SpreadGeneratorForm: React.FC<SpreadGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [query, setQuery] = useState('');
  const [cardCount, setCardCount] = useState('auto');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onGenerate(query.trim(), cardCount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="border-b-2 border-white focus-within:border-white transition-colors">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="DESCRIBE YOUR SITUATION..."
          disabled={isLoading}
          className="w-full bg-transparent px-0 py-8 text-3xl md:text-5xl font-bold-condensed placeholder-white/20 focus:outline-none"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-12 items-start sm:items-center justify-between">
        <div className="flex space-x-8">
          {['auto', '3', '5'].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setCardCount(count)}
              className={`font-nav transition-all border-b ${cardCount === count ? 'text-white border-white' : 'text-white/30 border-transparent hover:text-white'}`}
            >
              {count === 'auto' ? 'AUTO' : `${count} CARDS`}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-white text-black font-bold-condensed text-xl px-12 py-5 border-2 border-white hover:bg-black hover:text-white transition-all disabled:opacity-10"
        >
          {isLoading ? 'GENERATING...' : 'GENERATE SPREAD'}
        </button>
      </div>
    </form>
  );
};