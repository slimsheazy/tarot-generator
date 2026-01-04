import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Header } from './components/Header';
import { SpreadGeneratorForm } from './components/SpreadGeneratorForm';
import { SpreadDisplay } from './components/SpreadDisplay';
import { Loader } from './components/Loader';
import { generateTarotSpread } from './services/geminiService';
import type { TarotSpread } from './types';

const App: React.FC = () => {
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmbedInfo, setShowEmbedInfo] = useState<boolean>(false);
  const spreadRef = useRef<HTMLDivElement>(null);

  // Check if the app is being embedded via a URL parameter
  const isEmbedded = useMemo(() => {
    return new URLSearchParams(window.location.search).get('embed') === 'true';
  }, []);

  const handleGenerateSpread = useCallback(async (query: string, cardCount: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSpread = await generateTarotSpread(query, cardCount);
      setSpread(newSpread);
      setTimeout(() => {
        spreadRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const embedCode = useMemo(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `<iframe src="${baseUrl}?embed=true" style="width: 100%; height: 800px; border: none;" title="Tarot Spread Generator"></iframe>`;
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-white selection:text-black ${isEmbedded ? 'p-0' : ''}`}>
      <div className={`mx-auto ${isEmbedded ? 'max-w-full p-4' : 'max-w-6xl px-8 py-12 md:py-24'}`}>
        {!isEmbedded && <Header />}
        
        <main className={isEmbedded ? 'mt-4' : 'mt-12 md:mt-24'}>
          <div className={isEmbedded ? 'max-w-full' : 'max-w-3xl'}>
            <SpreadGeneratorForm onGenerate={handleGenerateSpread} isLoading={isLoading} />
          </div>
          
          <div ref={spreadRef} className={isEmbedded ? 'mt-12' : 'mt-24'}>
            {isLoading ? (
              <Loader />
            ) : spread ? (
              <SpreadDisplay spread={spread} />
            ) : error ? (
              <div className="border border-white p-8">
                <p className="font-nav text-white">{error}</p>
              </div>
            ) : (
              <div className="border-t border-white/20 pt-12 opacity-30">
                <p className="font-nav">Enter your question above to generate a spread.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {!isEmbedded && (
        <footer className="px-8 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center mt-24 gap-8">
          <div className="flex gap-12 items-center">
            <p className="font-nav opacity-30">© TAROT GENERATOR</p>
            <p className="font-nav opacity-30">v1.0.0</p>
          </div>
          
          <div className="w-full md:w-auto">
            {!showEmbedInfo ? (
              <button 
                onClick={() => setShowEmbedInfo(true)}
                className="font-nav text-white/50 hover:text-white transition-colors border-b border-transparent hover:border-white"
              >
                GET EMBED CODE
              </button>
            ) : (
              <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-nav text-[10px]">IFRAME EMBED SNIPPET</span>
                  <button onClick={() => setShowEmbedInfo(false)} className="font-nav text-[10px] hover:text-white">CLOSE</button>
                </div>
                <textarea 
                  readOnly 
                  value={embedCode}
                  className="w-full bg-white/5 border border-white/10 p-4 font-mono text-[10px] text-white/70 focus:outline-none focus:border-white/30 h-20 resize-none"
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;