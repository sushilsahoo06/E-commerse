"use client";
import { motion } from "framer-motion";

function LoadingThreeDotsPulse() {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="min-h-screen w-full flex justify-center items-center gap-5"
    >
      <motion.div
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full"
        variants={dotVariants}
      />
      <motion.div
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full"
        variants={dotVariants}
      />
      <motion.div
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full"
        variants={dotVariants}
      />
    </motion.div>
  );
}

export default LoadingThreeDotsPulse;




