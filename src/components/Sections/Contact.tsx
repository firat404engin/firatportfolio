"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
  };

  return (
    <section id="contact" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto"
      >
        <span className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/5 rounded-3xl blur-3xl -z-10"></span>

        <h2 className="section-title relative inline-block">
          <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-emerald-600/20 to-teal-500/20 animate-pulse rounded-lg"></span>
          <span className="relative">İletişime Geç</span>
          <RiSparkling2Fill className="absolute -top-2 -right-4 w-4 h-4 text-emerald-500 animate-bounce" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-gray-600 dark:text-gray-400 text-center relative"
        >
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-600/10 to-teal-500/10"></span>
          <span className="relative">
            Projeleriniz için benimle iletişime geçebilirsiniz. En kısa sürede dönüş yapacağım.
          </span>
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınız"
                className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 group-hover:shadow-lg"
                required
              />
              <RiSparkling2Fill className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500/50 transition-all duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta Adresiniz"
                className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 group-hover:shadow-lg"
                required
              />
              <RiSparkling2Fill className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500/50 transition-all duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mesajınız"
                rows={5}
                className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 group-hover:shadow-lg resize-none"
                required
              />
              <RiSparkling2Fill className="absolute right-4 top-6 w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500/50 transition-all duration-300" />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
            <span className="relative flex items-center justify-center gap-2">
              <span>Gönder</span>
              <FaPaperPlane className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Veya direkt e-posta gönder:
          </p>
          <a
            href="mailto:firatengin404@gmail.com"
            className="group inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            <FaEnvelope className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
            <span>firatengin404@gmail.com</span>
            <RiSparkling2Fill className="w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500 group-hover:animate-bounce transition-all duration-300" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
