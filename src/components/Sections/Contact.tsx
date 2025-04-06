"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SocialIcons from '../Layout/SocialIcons';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri';
// @ts-ignore
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // EmailJS'i başlat
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) {
        throw new Error('Form referansı bulunamadı');
      }

      const templateParams = {
        user_name: formRef.current.user_name.value,
        user_email: formRef.current.user_email.value,
        message: formRef.current.message.value,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.text === 'OK') {
        toast.success('Mesajınız başarıyla gönderildi!');
        formRef.current.reset();
      } else {
        throw new Error('Email gönderimi başarısız oldu');
      }
    } catch (error) {
      console.error('Email error:', error);
      toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
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
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                İsim
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-posta
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mesaj
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Mesajınız..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:opacity-90 transition-all duration-300 relative group disabled:opacity-70"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Gönder</span>
                      <RiSparkling2Fill className="w-4 h-4 text-yellow-300 animate-bounce" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
