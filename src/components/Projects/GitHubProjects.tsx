"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setProjectsActive } from '@/store/easterEggSlice';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

const GitHubProjects = () => {
  const dispatch = useDispatch();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github');
        
        if (!response.ok) {
          throw new Error('API yanıt vermedi');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setRepos(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu';
        console.error('API hatası:', err);
        setError(`Projeler yüklenirken bir hata oluştu: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Projelerim</h2>
          <button
            onClick={() => dispatch(setProjectsActive(false))}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">
              {error}
            </div>
          ) : repos.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
              Henüz GitHub projesi bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.language && (
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                        {repo.language}
                      </span>
                    )}
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                      🔀 {repo.forks_count}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Son güncelleme: {formatDate(repo.updated_at)}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubProjects; 