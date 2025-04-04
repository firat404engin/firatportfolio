import { useEffect, useState } from 'react';

// Konami kodu: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
];

export const useKonamiCode = () => {
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      // Doğru tuşa basıldıysa
      if (event.code === KONAMI_CODE[count]) {
        const newCount = count + 1;
        setCount(newCount);

        // Tüm kod girildi mi?
        if (newCount === KONAMI_CODE.length) {
          setSuccess(true);
          setCount(0);
        }
      } else {
        // Yanlış tuş, sıfırla
        setCount(0);
      }
    };

    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, [count]);

  return success;
}; 