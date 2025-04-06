"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed right-4 z-50 transition-all duration-300 ${
        scrollY > 10 ? 'top-4' : 'top-8'
      }`}
    >
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300"
        title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
      >
        {theme === 'dark' ? (
          <>
            <RiSunLine className="w-5 h-5" />
            <span className="text-sm font-medium hidden md:inline">Aydınlık</span>
          </>
        ) : (
          <>
            <RiMoonLine className="w-5 h-5" />
            <span className="text-sm font-medium hidden md:inline">Karanlık</span>
          </>
        )}
      </button>
    </motion.div>
  );
}
