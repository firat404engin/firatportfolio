"use client";

import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiGithubactions,
  SiAmazonaws,
  SiFigma,
  SiAdobexd,
  SiCsharp,
  SiCplusplus,
  SiVisualstudio,
  SiVisualstudiocode,
  SiJavascript,
  SiPython,
  SiRedux,
  SiGraphql,
  SiFirebase,
  SiMysql,
} from 'react-icons/si';
import { TbBrandCss3, TbUserCircle } from 'react-icons/tb';

const technologies = [
  { icon: SiReact, name: 'React', color: 'text-blue-400' },
  { icon: SiNextdotjs, name: 'Next.js', color: 'text-gray-800 dark:text-gray-200' },
  { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-600' },
  { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-500' },
  { icon: SiCsharp, name: 'C#', color: 'text-purple-600' },
  { icon: SiCplusplus, name: 'C++', color: 'text-blue-500' },
  { icon: SiPython, name: 'Python', color: 'text-blue-600' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-500' },
  { icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500' },
  { icon: SiExpress, name: 'Express', color: 'text-gray-700 dark:text-gray-300' },
  { icon: SiMongodb, name: 'MongoDB', color: 'text-green-600' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-500' },
  { icon: SiMysql, name: 'MySQL', color: 'text-blue-600' },
  { icon: SiGit, name: 'Git', color: 'text-orange-600' },
  { icon: SiDocker, name: 'Docker', color: 'text-blue-500' },
  { icon: SiGithubactions, name: 'CI/CD', color: 'text-purple-500' },
  { icon: SiAmazonaws, name: 'AWS', color: 'text-orange-500' },
  { icon: SiVisualstudio, name: 'Visual Studio', color: 'text-purple-600' },
  { icon: SiVisualstudiocode, name: 'VS Code', color: 'text-blue-500' },
  { icon: SiFigma, name: 'Figma', color: 'text-purple-600' },
  { icon: SiAdobexd, name: 'Adobe XD', color: 'text-pink-600' },
  { icon: SiRedux, name: 'Redux', color: 'text-purple-500' },
  { icon: SiGraphql, name: 'GraphQL', color: 'text-pink-600' },
  { icon: SiFirebase, name: 'Firebase', color: 'text-yellow-500' },
  { icon: TbBrandCss3, name: 'Responsive', color: 'text-blue-500' },
  { icon: TbUserCircle, name: 'UI/UX', color: 'text-indigo-500' },
];

export default function TechStack() {
  return (
    <div className="w-full overflow-hidden py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <div className="flex space-x-12 animate-scroll">
          {[...technologies, ...technologies].map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-w-[80px] group"
              >
                <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300 ${tech.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
} 