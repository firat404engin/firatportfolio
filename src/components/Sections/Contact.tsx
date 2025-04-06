"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import SocialIcons from '../Layout/SocialIcons';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Burada form gönderme işlemi yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
      setSubmitStatus('success');
      setEmail('');
      setMessage('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12">
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
          <span className="relative">İletişim</span>
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
            Benimle iletişime geçmek için aşağıdaki formu kullanabilir veya sosyal medya hesaplarımdan bana ulaşabilirsiniz.
          </span>
        </motion.p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaGithub className="w-7 h-7 text-gray-900 dark:text-white" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sosyal Medya
                  <RiSparkling2Fill className="inline-block ml-2 w-5 h-5 text-emerald-500 animate-bounce" />
                </h4>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6">
                <SocialIcons />
              </div>
            </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 text-sm"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mesaj
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 text-sm resize-none"
                placeholder="Mesajınızı yazın..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Gönderiliyor...</span>
                </div>
              ) : submitStatus === 'success' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gönderildi!</span>
                </span>
              ) : submitStatus === 'error' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Hata oluştu, tekrar deneyin</span>
                </span>
              ) : (
                'Gönder'
              )}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
