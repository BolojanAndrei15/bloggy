"use client";
import { motion } from "framer-motion";

import { FaBlogger } from "react-icons/fa";

const item = {
  hidden: { height: "100vh" },
  visible: { height: 0 },
};

const word = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: 8,
        duration: 2,
        type: "spring",
        stiffness: 360,
        damping: 100,
      }}
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-[100vh]"
    >
      <div className="fixed w-full h-full">
        <div className="w-full h-full flex align-middle items-center justify-center flex-col space-y-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 100,
            }}
          >
            <FaBlogger className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 " />
          </motion.div>
          <div className="flex space-x-7 sm:space-x-9">
            <motion.span
              transition={{ delay: 2 }}
              initial="hidden"
              animate="visible"
              variants={word}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              B
            </motion.span>
            <motion.span
              transition={{ delay: 2.5 }}
              initial="hidden"
              animate="visible"
              variants={word}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              L
            </motion.span>
            <motion.span
              transition={{ delay: 3 }}
              initial="hidden"
              animate="visible"
              variants={word}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              O
            </motion.span>
            <motion.span
              transition={{ delay: 3.5 }}
              initial="hidden"
              animate="visible"
              variants={word}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              G
            </motion.span>
            <motion.span
              transition={{ delay: 4 }}
              initial="hidden"
              animate="visible"
              variants={word}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              G
            </motion.span>
            <motion.span
              transition={{ delay: 4.5 }}
              initial="hidden"
              animate="visible"
              variants={word}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              Y
            </motion.span>
          </div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 5 }}
        variants={item}
        className="h-full bg-white text-transparent"
      >
        0
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 5.5 }}
        variants={item}
        className="h-full bg-slate-50 text-transparent"
      ></motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 6 }}
        variants={item}
        className="h-full bg-slate-100 text-transparent"
      ></motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 6.5 }}
        variants={item}
        className="h-full hidden md:block bg-slate-200 text-transparent"
      ></motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 7 }}
        variants={item}
        className="hidden lg:block h-full bg-slate-300 text-transparent"
      >
        2
      </motion.div>
    </motion.div>
  );
}

export default Loader;
