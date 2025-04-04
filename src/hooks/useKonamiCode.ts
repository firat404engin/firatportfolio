import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const useKonamiCode = () => {
  const [isKonamiCode, setIsKonamiCode] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setSequence(prev => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
        if (newSequence.join(',') === KONAMI_CODE.join(',')) {
          setIsKonamiCode(true);
          return [];
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return isKonamiCode;
}; 