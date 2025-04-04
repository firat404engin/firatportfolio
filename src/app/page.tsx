"use client";

import Hero from '@/components/Sections/Hero';
import About from '@/components/Sections/About';
import Projects from '@/components/Sections/Projects';
import Contact from '@/components/Sections/Contact';
import TechStack from '@/components/Home/TechStack';

export default function Home() {
  return (
    <div className="container mx-auto max-w-[95%]">
      <div className="space-y-16">
        <div id="home" className="scroll-mt-8">
          <Hero />
          <div className="mt-8 -mx-4 md:-mx-8 lg:-mx-16">
            <TechStack />
          </div>
        </div>
        <div id="about" className="scroll-mt-8">
          <About />
        </div>
        <div id="projects" className="scroll-mt-8">
          <Projects />
        </div>
        <div id="contact" className="scroll-mt-8">
          <Contact />
        </div>
      </div>
    </div>
  );
}
