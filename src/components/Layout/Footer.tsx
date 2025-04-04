"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMatrixActive, setSnakeActive, setDemoActive, setBlogActive, setProjectsActive } from '@/store/easterEggSlice';

const Footer = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const triggerRandomEasterEgg = () => {
    const random = Math.random();
    if (random < 0.5) {
      dispatch(setMatrixActive(true));
    } else {
      dispatch(setSnakeActive(true));
    }
  };

  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={triggerRandomEasterEgg}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.span
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
                className="inline-block mr-2"
              >
                🎁
              </motion.span>
              Sürpriz!
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setDemoActive(true))}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.span
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
                className="inline-block mr-2"
              >
                💻
              </motion.span>
              Demo Alanı
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setBlogActive(true))}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.span
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
                className="inline-block mr-2"
              >
                📝
              </motion.span>
              Blog
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setProjectsActive(true))}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.span
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
                className="inline-block mr-2"
              >
                🚀
              </motion.span>
              Projeler
            </motion.button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date().getFullYear()} Fırat Engin. Tüm hakları saklıdır.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
