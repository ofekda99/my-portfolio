"use client";

import { motion, type Variants } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";

type Direction = "up" | "left" | "right";

const VARIANTS: Record<Direction, Variants> = {
  up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
};

const noopSubscribe = () => () => {};

function useHasMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const mounted = useHasMounted();

  // Content renders fully visible by default (server-rendered and no-JS
  // fallback). The reveal animation only kicks in once JS has confirmed
  // it's running, so the animation never leaves content permanently hidden.
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={VARIANTS[direction]}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
