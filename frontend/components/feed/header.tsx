"use client";

import HeaderActions from "./header-actions";
import Logo from "./logo";
import SearchBar from "./search-bar";
import { motion } from "framer-motion";

export default function Header() {
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.header
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div variants={itemVariants}>
            <Logo />
          </motion.div>
          <motion.div variants={itemVariants} className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </motion.div>
          <motion.div variants={itemVariants}>
            <HeaderActions />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
