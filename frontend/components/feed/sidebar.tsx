"use client";

import { EventsWidget } from "./events-widget";
import { ExploreMenu } from "./explore-menu";
import { SuggestedPeople } from "./suggested-people";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const sidebarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
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
        className="bg-white rounded-lg shadow-sm p-4 sticky top-20"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ExploreMenu />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SuggestedPeople />
        </motion.div>
        <motion.div variants={itemVariants}>
          <EventsWidget />
        </motion.div>
      </motion.div>
    </aside>
  );
};
