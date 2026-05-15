"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function StaggerContainer({ children, className, style }: ContainerProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style }: ItemProps) {
  return (
    <motion.div variants={item} className={className} style={style}>
      {children}
    </motion.div>
  );
}
