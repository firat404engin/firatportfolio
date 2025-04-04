"use client";

import { motion } from 'framer-motion';
import NowPlaying from './NowPlaying';
import RecentlyPlayed from './RecentlyPlayed';
import SocialIcons from '../Layout/SocialIcons';
import Image from 'next/image';
import { RiSparkling2Fill } from 'react-icons/ri';
import { FaCode, FaPalette, FaServer, FaTools, FaSpotify, FaGithub } from 'react-icons/fa';

const skills = [
  { name: 'Frontend', icon: FaCode, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', icon: FaServer, items: [ 'Asp.Net Core','C#','Node.js', 'Express'] },
  { name: 'DevOps', icon: FaTools, items: ['Git', 'Docker', 'CI/CD', 'AWS'] },
  { name: 'Design', icon: FaPalette, items: ['Figma', 'Adobe XD', 'UI/UX', 'Responsive Design'] },
];

const About = () => {
  return (
    <section id="about" className="py-12">
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
          <span className="relative">Hakkımda</span>
          <RiSparkling2Fill className="absolute -top-2 -right-4 w-3 h-3 text-emerald-500 animate-bounce" />
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-emerald-500/30 group-hover:ring-emerald-500/50 transition-all duration-300">
                <Image
                  src="https://avatars.githubusercontent.com/u/62977294?v=4"
                  alt="Fırat Engin"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </motion.div>
            
            <div className="text-center space-y-3">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
              >
                Fırat Engin
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-primary font-medium text-sm"
              >
                Full Stack Developer & UI/UX Designer
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <p className="text-gray-600 dark:text-gray-400 text-center relative text-sm">
                <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-600/10 to-teal-500/10"></span>
                <span className="relative">
                  Karmaşık problemleri, basit, şık ve kullanıcı dostu çözümlere dönüştürüyorum.
                  <span className="font-medium text-emerald-600 dark:text-emerald-400"> Tıpkı bir Ayvalık tostu gibi: </span>
                  doyurucu, lezzetli ve akılda kalıcı işler üretmeye odaklıyım!
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaSpotify className="w-5 h-5 text-[#1DB954]" />
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                  Son Dinlediğim
                  <RiSparkling2Fill className="inline-block ml-2 w-3 h-3 text-[#1DB954] animate-bounce" />
                </h4>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-3">
                <RecentlyPlayed />
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <skill.icon className="w-5 h-5 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{skill.name}</h4>
                  </div>
                  <ul className="space-y-1">
                    {skill.items.map((item) => (
                      <li key={item} className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-xs">
                        <RiSparkling2Fill className="w-2 h-2 text-emerald-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
