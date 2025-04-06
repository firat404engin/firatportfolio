"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri';

interface Repository {
  id: number | string;
  name: string;
  url: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt?: string;
}

const Projects = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('/api/github', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepositories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching repositories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="projects" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative"
      >
        <span className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/5 rounded-3xl blur-3xl -z-10"></span>
        
        <h2 className="section-title relative inline-block text-xl sm:text-2xl">
          <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-emerald-600/20 to-teal-500/20 animate-pulse rounded-lg"></span>
          <span className="relative">Projelerim</span>
          <RiSparkling2Fill className="absolute -top-2 -right-4 w-3 h-3 text-emerald-500 animate-bounce" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto relative text-sm"
        >
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-600/10 to-teal-500/10"></span>
          <span className="relative">
            GitHub profilimde öne çıkardığım projeler. Her biri özenle hazırlanmış ve sürekli geliştirilmekte olan çalışmalarım.
          </span>
        </motion.p>

        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400">
              <p>{error}</p>
            </div>
          ) : repositories.length === 0 ? (
            <div className="col-span-full text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-600 dark:text-gray-400">
              <p>Henüz proje bulunmuyor.</p>
            </div>
          ) : (
            repositories.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors flex items-center gap-2">
                      <FaGithub className="text-gray-700 dark:text-gray-300 flex-shrink-0 w-4 h-4" />
                      <span className="truncate">{repo.name}</span>
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3 flex-grow text-sm line-clamp-3">
                  {repo.description || 'Açıklama bulunmuyor'}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <FaStar className="w-3 h-3 text-yellow-500" />
                      <span>{repo.stargazerCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <FaCodeBranch className="w-3 h-3 text-gray-500" />
                      <span>{repo.forkCount}</span>
                    </div>
                  </div>
                  
                  {repo.primaryLanguage && (
                    <div className="flex items-center gap-1">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: repo.primaryLanguage.color }}
                      ></span>
                      <span className="text-gray-600 dark:text-gray-400">{repo.primaryLanguage.name}</span>
                    </div>
                  )}
                </div>
                
                {repo.updatedAt && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    Son güncelleme: {formatDate(repo.updatedAt)}
                  </div>
                )}
              </motion.a>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
