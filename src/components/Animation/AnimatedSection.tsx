"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
}

const AnimatedSection = ({ children, className = "", direction = "left" }: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        type: "spring",
        bounce: 0.3
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 