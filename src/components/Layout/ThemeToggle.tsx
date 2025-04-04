"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-8 right-8 z-50"
    >
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300"
        title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
      >
        {theme === 'dark' ? (
          <>
            <RiSunLine className="w-5 h-5" />
            <span className="text-sm font-medium">Aydınlık</span>
          </>
        ) : (
          <>
            <RiMoonLine className="w-5 h-5" />
            <span className="text-sm font-medium">Karanlık</span>
          </>
        )}
      </button>
    </motion.div>
  );
}
