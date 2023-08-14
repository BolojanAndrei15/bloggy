import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Heading() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center space-y-3 my-10"
    >
      <motion.h1 variants={item} className="font-bold">
        The blog
      </motion.h1>
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-semibold">
        Writings from around the globe
      </motion.h2>
      <motion.p
        variants={item}
        className="font-semibold md:w-[50%] text-sm md:text-md"
      >
        Join us as we embark on a journey of discovery, learning, and
        inspiration. Whether you're a curious mind or an avid enthusiast, you'll
        find something to captivate your interests here at Bloggy.
      </motion.p>
    </motion.div>
  );
}

export default Heading;
