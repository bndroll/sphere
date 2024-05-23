"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <motion.div
      style={{ height: "100%" }}
      initial={{ x: 300, opacity: 0 }}
      animate={{
        x: loading ? 300 : 0,
        opacity: loading ? 0 : 1,
      }}
      transition={{
        type: "spring",
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
