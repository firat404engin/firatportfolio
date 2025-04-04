"use client";

import { FaGithub, FaLinkedin, FaInstagram, FaReddit, FaMedium } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/firat404engin',
    icon: FaGithub,
    hoverColor: 'hover:text-[#333] dark:hover:text-white',
    username: '@firat404engin',
    bgColor: 'bg-[#333] dark:bg-[#222]'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/firatengin404/',
    icon: FaLinkedin,
    hoverColor: 'hover:text-[#0077b5]',
    username: 'Fırat Engin',
    bgColor: 'bg-[#0077b5]'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/firatengin404/',
    icon: FaInstagram,
    hoverColor: 'hover:text-[#E4405F]',
    username: '@firatengin404',
    bgColor: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]'
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/Smart-Swordfish8148/',
    icon: FaReddit,
    hoverColor: 'hover:text-[#FF4500]',
    username: 'Smart-Swordfish8148',
    bgColor: 'bg-[#FF4500]'
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@fengin7373',
    icon: FaMedium,
    hoverColor: 'hover:text-black dark:hover:text-white',
    username: '@fengin7373',
    bgColor: 'bg-black dark:bg-white'
  },
];

const SocialIcons = () => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {socialLinks.map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative group"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${link.hoverColor} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50`}
            aria-label={link.name}
          >
            <link.icon className="w-10 h-10" />
          </a>

          {/* Mobil Cihaz Görünümü */}
          <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 hidden group-hover:block w-auto scale-90 origin-top">
            <div className="relative">
              {/* Cihaz Çerçevesi */}
              <div className="w-[200px] h-[100px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-1 border-4 border-gray-200 dark:border-gray-700">
                {/* Uygulama Header */}
                <div className={`h-8 ${link.bgColor} rounded-t-xl flex items-center justify-between px-3`}>
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  </div>
                  <span className="text-xs text-white font-medium">{link.name}</span>
                  <div className="w-4"></div>
                </div>
                {/* Uygulama İçeriği */}
                <div className="p-3 flex items-center gap-3">
                  <link.icon className="w-8 h-8 text-gray-800 dark:text-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{link.name}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{link.username}</span>
                  </div>
                </div>
              </div>
              {/* Üçgen İşaretçi */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-gray-900 border-t-4 border-l-4 border-gray-200 dark:border-gray-700"></div>
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  );
};

export default SocialIcons;
