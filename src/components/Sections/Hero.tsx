"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import CryptoTicker from '../Finance/CryptoTicker';
import { FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri';
import { useState } from 'react';

const Hero = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const defaultImage = "https://i.hizliresim.com/ljdgion.png";
  const hoverImage = "https://i.hizliresim.com/pi2j3rf.png?_gl=1*10cejmg*_ga*ODM2OTU4MjUuMTc0MTc3OTk3NQ..*_ga_M9ZRXYS2YN*MTc0Mzc2NTMxMC4yLjEuMTc0Mzc2NTM3NC42MC4wLjA.";

  return (
    <section className="min-h-screen flex items-center justify-center py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 w-full">
            <div className="mb-4 w-full">
              <CryptoTicker />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 relative">
                <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-600/30 to-teal-500/30 animate-pulse"></span>
                Merhaba, ben{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-1 blur bg-gradient-to-r from-emerald-600 to-teal-500 opacity-30 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Fırat Engin
                  </span>
                </span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed relative backdrop-blur-sm p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-600/10 to-teal-500/10"></span>
                <span className="relative">
                  Karmaşık problemleri, basit, şık ve kullanıcı dostu çözümlere dönüştürüyorum.
                  <span className="font-medium text-emerald-600 dark:text-emerald-400"> Tıpkı bir Ayvalık tostu gibi: </span> 
                  doyurucu, lezzetli ve akılda kalıcı işler üretmeye odaklıyım! 
                  <span className="block mt-2 italic text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    (Bu kişisel sitem, biraz fantezi, biraz da kodlamaya dair tutkumun karışımı. 
                    <span className="inline-block animate-bounce">🚀</span> Tadı damağınızda kalacak!)
                  </span>
                </span>
              </motion.p>

              <style jsx global>{`
                @keyframes gradient {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                  animation: gradient 8s linear infinite;
                }
              `}</style>

              <div className="flex flex-wrap gap-4 pt-6">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-2 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 text-sm"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
                  <span className="relative flex items-center gap-2">
                    <FaEnvelope className="w-3 h-3 animate-pulse" />
                    <span>İletişime Geç</span>
                    <RiSparkling2Fill className="w-3 h-3 text-yellow-300 animate-bounce" />
                  </span>
                </motion.a>
                
                <motion.a
                  href="https://drive.google.com/file/d/1M863mT14DDXq9Py3wEZEnI6t8pGEsIG2/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="group relative flex items-center gap-2 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-5 py-2 rounded-xl hover:text-white transition-all duration-300 text-sm"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></span>
                  <span className="relative flex items-center gap-2">
                    <FaFileAlt className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                    <span>CV'yi İncele</span>
                    <RiSparkling2Fill className="w-3 h-3 text-emerald-500 group-hover:text-yellow-300 group-hover:animate-bounce transition-colors" />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            className="flex justify-center items-center w-full"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px]">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={defaultImage}
                  alt="Fırat Engin"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 420px"
                  unoptimized
                />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={hoverImage}
                  alt="Fırat Engin - CV Hover"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 420px"
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
