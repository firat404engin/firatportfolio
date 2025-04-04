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
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        // API route'u kullanarak pinlenmiş projeleri çek
        const response = await fetch('/api/github');
        
        if (!response.ok) {
          throw new Error('API yanıt vermedi');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // API'den gelen verileri Repository formatına dönüştür
        const formattedRepos = data.map((repo: any) => {
          // GraphQL API'den gelen veri formatı
          if (repo.url) {
            return {
              id: repo.id,
              name: repo.name,
              url: repo.url,
              description: repo.description || 'Açıklama bulunmuyor',
              stargazerCount: repo.stargazerCount,
              forkCount: repo.forkCount,
              primaryLanguage: repo.primaryLanguage ? {
                name: repo.primaryLanguage.name,
                color: repo.primaryLanguage.color
              } : null,
              updatedAt: repo.updatedAt
            };
          } 
          // REST API'den gelen veri formatı
          else {
            return {
              id: repo.id,
              name: repo.name,
              url: repo.html_url,
              description: repo.description || 'Açıklama bulunmuyor',
              stargazerCount: repo.stargazers_count,
              forkCount: repo.forks_count,
              primaryLanguage: repo.language ? {
                name: repo.language,
                color: getLanguageColor(repo.language)
              } : null,
              updatedAt: repo.updated_at
            };
          }
        });
        
        setRepos(formattedRepos);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Projeler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  // Dil renklerini belirle
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C#': '#178600',
      'C++': '#f34b7d',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'PHP': '#4F5B93',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33',
      'Dart': '#00B4AB',
      'R': '#198CE7',
      'Scala': '#c22d40',
      'Shell': '#89e051',
      'Vue': '#2c3e50',
      'React': '#61dafb',
      'Angular': '#dd0031',
      'Svelte': '#ff3e00',
      'Next.js': '#000000',
      'Node.js': '#339933',
      'Express': '#000000',
      'Django': '#092e20',
      'Flask': '#000000',
      'Laravel': '#ff2d20',
      'Spring': '#6db33f',
      'ASP.NET': '#512bd4',
      'GraphQL': '#e535ab',
      'MongoDB': '#13aa52',
      'PostgreSQL': '#336791',
      'MySQL': '#4479a1',
      'SQLite': '#003b57',
      'Redis': '#dc382d',
      'Docker': '#2496ed',
      'Kubernetes': '#326ce5',
      'AWS': '#ff9900',
      'Azure': '#0078d4',
      'GCP': '#4285f4',
      'Firebase': '#ffca28',
      'TensorFlow': '#ff6f00',
      'PyTorch': '#ee4c2c',
      'Jupyter': '#f37626',
      'Markdown': '#083fa1',
      'YAML': '#cb171e',
      'JSON': '#000000',
      'XML': '#f0f0f0',
      'SVG': '#ffb13b',
      'WebAssembly': '#654ff0',
      'Assembly': '#6e4c13',
      'C': '#555555',
      'Objective-C': '#438eff',
      'Perl': '#0298c3',
      'Haskell': '#5e5086',
      'Clojure': '#db5855',
      'Elixir': '#6e4a7e',
      'Erlang': '#b83998',
      'F#': '#b845fc',
      'OCaml': '#3be133',
      'Pascal': '#e3f171',
      'Prolog': '#74283c',
      'Smalltalk': '#596706',
      'Tcl': '#e4cc98',
      'Visual Basic': '#945db7',
      'Zig': '#f7a41d',
      'Unknown': '#cccccc'
    };
    
    return colors[language] || colors['Unknown'];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <section id="projects" className="py-16">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2 text-sm">Lütfen daha sonra tekrar deneyin</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative"
      >
        <span className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/5 rounded-3xl blur-3xl -z-10"></span>

        <h2 className="section-title relative inline-block">
          <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-emerald-600/20 to-teal-500/20 animate-pulse rounded-lg"></span>
          <span className="relative">Öne Çıkan Projelerim</span>
          <RiSparkling2Fill className="absolute -top-2 -right-4 w-4 h-4 text-emerald-500 animate-bounce" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto relative"
        >
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-600/10 to-teal-500/10"></span>
          <span className="relative">
            GitHub profilimde öne çıkardığım projeler. Her biri özenle hazırlanmış ve sürekli geliştirilmekte olan çalışmalarım.
          </span>
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-spin"></div>
              </div>
            </div>
          ) : repos.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              <p>Henüz pinlenmiş proje bulunmuyor.</p>
              <p className="mt-2 text-sm">GitHub profilinizde projeleri pinleyerek burada görüntüleyebilirsiniz.</p>
            </div>
          ) : (
            repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl -z-10 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-colors duration-300"></span>
                
                <div className="flex items-center gap-3 mb-4">
                  <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors truncate">
                    {repo.name}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 min-h-[3rem] line-clamp-2">
                  {repo.description || 'Açıklama bulunmuyor'}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  {repo.primaryLanguage && (
                    <span className="flex items-center gap-1.5">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: repo.primaryLanguage.color }}
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        {repo.primaryLanguage.name}
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <FaStar className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-400">{repo.stargazerCount}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCodeBranch className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-600 dark:text-gray-400">{repo.forkCount}</span>
                  </span>
                </div>

                {repo.updatedAt && (
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Son güncelleme: {formatDate(repo.updatedAt)}
                  </div>
                )}

                <RiSparkling2Fill className="absolute top-2 right-2 w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500/50 transition-all duration-300" />
              </motion.a>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
