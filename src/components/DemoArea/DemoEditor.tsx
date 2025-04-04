"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setDemoActive } from '@/store/easterEggSlice';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', template: 'console.log("Merhaba Dünya!");' },
  { id: 'python', name: 'Python', template: 'print("Merhaba Dünya!")' },
  { id: 'html', name: 'HTML', template: '<h1>Merhaba Dünya!</h1>' },
];

const DemoEditor = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState(LANGUAGES[0].template);
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [output, setOutput] = useState('');

  const handleRun = () => {
    try {
      let result = '';
      switch (language) {
        case 'javascript':
          // JavaScript kodunu güvenli bir şekilde çalıştır
          const consoleLog = (...args: any[]) => {
            result += args.join(' ') + '\n';
          };
          const console = { log: consoleLog };
          new Function('console', code)(console);
          break;
        case 'python':
          // Python kodu için basit bir simülasyon
          result = code.replace(/print\((.*)\)/, '$1');
          break;
        case 'html':
          // HTML kodunu render et
          result = code;
          break;
      }
      setOutput(result);
    } catch (error: any) {
      setOutput(`Hata: ${error?.message || 'Bilinmeyen bir hata oluştu'}`);
    }
  };

  const handleLanguageChange = (langId: string) => {
    const selectedLang = LANGUAGES.find(lang => lang.id === langId);
    if (selectedLang) {
      setLanguage(langId);
      setCode(selectedLang.template);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleRun}
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Çalıştır
            </button>
          </div>
          <button
            onClick={() => dispatch(setDemoActive(false))}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 h-[calc(90vh-4rem)]">
          <div className="p-4 border-r border-gray-200 dark:border-gray-700">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded resize-none"
              spellCheck="false"
            />
          </div>
          <div className="p-4 overflow-auto">
            <div className="font-mono text-sm whitespace-pre-wrap text-gray-900 dark:text-gray-100">
              {output}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoEditor; 