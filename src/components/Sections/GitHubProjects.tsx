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
          
        </div>
      </div>
    </section>
  );
};

export default GitHubProjects; 