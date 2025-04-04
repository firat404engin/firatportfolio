"use client";

import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* Arka plan efekti */}
        <div className="absolute inset-0 blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-500/20 to-emerald-600/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 via-transparent to-emerald-600/10 animate-pulse delay-75"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="relative flex flex-col items-center"
        >
          {/* Ana yükleme animasyonu */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity
              }}
              className="w-24 h-24 rounded-full border-t-2 border-r-2 border-emerald-500"
            />
            <FaCode className="absolute inset-0 m-auto text-4xl text-emerald-500" />
          </div>

          {/* Yükleniyor yazısı */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5
            }}
            className="mt-8 text-center"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Yükleniyor
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Harika şeyler hazırlanıyor...
            </p>
          </motion.div>

          {/* Yükleme noktaları */}
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-emerald-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 