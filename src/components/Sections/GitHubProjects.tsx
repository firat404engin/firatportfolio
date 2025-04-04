"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  language: "C#" | "Python" | "HTML";
  stars: number;
  isPublic: boolean;
}

// Dil renkleri
const LANGUAGE_COLORS = {
  "C#": "#178600",
  "Python": "#3572A5",
  "HTML": "#e34c26"
} as const;

// Manuel proje listesi
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Hastane_OtomasyonV2",
    description: "C# ve SQL ile geliştirilmiştir",
    url: "https://github.com/firat404engin/Hastane_OtomasyonV2",
    language: "C#",
    stars: 2,
    isPublic: true
  },
  {
    id: 2,
    name: "CSharp-ve-emgu--yuz-tanima-sistemli-kutuphane-otomasyonu",
    description: "Emgu kütüphanesi kullanılarak C# Forms ile geliştirilen kütüphane otomasyon sisteminin yapısını, işleyişini ve sunduğu fonksiyonları işlemektedir",
    url: "https://github.com/firat404engin/CSharp-ve-emgu--yuz-tanima-sistemli-kutuphane-otomasyonu",
    language: "C#",
    stars: 1,
    isPublic: true
  },
  {
    id: 3,
    name: "Pythoneticaretvericekme",
    description: "",
    url: "https://github.com/firat404engin/Pythoneticaretvericekme",
    language: "Python",
    stars: 1,
    isPublic: true
  },
  {
    id: 4,
    name: "ApiProjeKampi",
    description: "ApiProjeKampi",
    url: "https://github.com/firat404engin/ApiProjeKampi",
    language: "C#",
    stars: 0,
    isPublic: true
  },
  {
    id: 5,
    name: "BookMVC",
    description: "",
    url: "https://github.com/firat404engin/BookMVC",
    language: "C#",
    stars: 0,
    isPublic: true
  },
  {
    id: 6,
    name: "BooksApi",
    description: "",
    url: "https://github.com/firat404engin/BooksApi",
    language: "C#",
    stars: 0,
    isPublic: true
  }
];

const GitHubProjects = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Projelerim
              <FaGithub className="text-gray-700 dark:text-gray-300 text-2xl" />
            </h2>
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">
            GitHub üzerindeki projelerim. Her biri özenle hazırlanmış ve sürekli geliştirmekte olan çalışmalarım.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors flex items-center gap-2">
                    <FaGithub className="text-gray-700 dark:text-gray-300 flex-shrink-0" />
                    <span className="truncate">{project.name}</span>
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow text-sm line-clamp-2">
                {project.description || 'No description available'}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                {project.language && (
                  <span className="flex items-center gap-1.5">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: LANGUAGE_COLORS[project.language] }}
                    />
                    <span>{project.language}</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span>{project.stars}</span>
                </span>
                <span className="ml-auto text-xs bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                  Public
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubProjects; 