"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setBlogActive } from '@/store/easterEggSlice';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Next.js ile Modern Web Uygulamaları Geliştirme",
    excerpt: "Next.js'in sunduğu özellikler ve modern web geliştirme pratikleri hakkında detaylı bir rehber.",
    content: `Next.js, React tabanlı web uygulamaları geliştirmek için mükemmel bir framework'tür. 
    Server-side rendering, statik site generation, API routes gibi özellikleriyle modern web uygulamaları 
    geliştirmeyi kolaylaştırır.

    Bu yazıda Next.js'in temel özelliklerini ve nasıl kullanılacağını ele alacağız.`,
    date: "2024-03-15",
    tags: ["Next.js", "React", "Web Development"]
  },
  {
    id: 2,
    title: "TypeScript ile Tip Güvenli Kod Yazımı",
    excerpt: "TypeScript kullanarak daha güvenli ve sürdürülebilir kod nasıl yazılır?",
    content: `TypeScript, JavaScript'e tip güvenliği ekleyerek daha güvenilir uygulamalar 
    geliştirmemizi sağlar. Bu yazıda TypeScript'in temel özelliklerini ve best practice'leri 
    inceleyeceğiz.`,
    date: "2024-03-10",
    tags: ["TypeScript", "JavaScript", "Programming"]
  },
  {
    id: 3,
    title: "Tailwind CSS ile Hızlı UI Geliştirme",
    excerpt: "Tailwind CSS kullanarak modern ve responsive tasarımlar nasıl oluşturulur?",
    content: `Tailwind CSS, utility-first bir CSS framework'üdür. Bu yaklaşım, 
    hızlı ve tutarlı UI geliştirmeyi mümkün kılar. Bu yazıda Tailwind CSS'in avantajlarını 
    ve kullanımını ele alacağız.`,
    date: "2024-03-05",
    tags: ["Tailwind CSS", "CSS", "UI/UX"]
  }
];

const BlogArea = () => {
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Blog</h2>
          <button
            onClick={() => dispatch(setBlogActive(false))}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-3 h-[calc(90vh-4rem)]">
          {/* Blog Listesi */}
          <div className="border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            {SAMPLE_POSTS.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
                  selectedPost?.id === post.id
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => setSelectedPost(post)}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{post.excerpt}</p>
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                  {new Date(post.date).toLocaleDateString('tr-TR')}
                </time>
              </motion.div>
            ))}
          </div>
          {/* Blog İçeriği */}
          <div className="col-span-2 p-6 overflow-y-auto">
            {selectedPost ? (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose dark:prose-invert max-w-none"
              >
                <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                <div className="flex gap-2 mb-4">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-sm text-gray-500 dark:text-gray-400 block mb-6">
                  {new Date(selectedPost.date).toLocaleDateString('tr-TR')}
                </time>
                <div className="whitespace-pre-wrap">{selectedPost.content}</div>
              </motion.article>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Bir blog yazısı seçin
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogArea; 