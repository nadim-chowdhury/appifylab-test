"use client";

import { YouMightLike } from "./you-might-like";
import { YourFriends } from "./your-friends";
import { motion } from "framer-motion";

export const RightSidebar = () => {
  const sidebarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <aside className="col-span-3">
      <motion.div
        className="sticky top-20 space-y-4"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <YouMightLike />
        </motion.div>
        <motion.div variants={itemVariants}>
          <YourFriends />
        </motion.div>
      </motion.div>
    </aside>
  );
};
