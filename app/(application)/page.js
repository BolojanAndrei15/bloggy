"use client";
import BlogPost from "@/components/main-page/BlogPost";
import Heading from "@/components/main-page/Heading";
import LoadingPage from "@/components/main-page/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/api/blogpost");
      return res.data;
    },
  });

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Heading />
      {isLoading ? (
        " "
      ) : data.length == 0 ? (
        <h1 className="w-full text-center text-gray-400">No posts</h1>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-5 lg:grid-cols-3">
        {isLoading ? (
          <LoadingPage />
        ) : (
          data.map((post) => (
            <motion.div initial="hidden" animate="visible" variants={container}>
              <BlogPost
                key={post.id}
                id={post.id}
                img={post.image}
                title={post.title}
                desc={post.description}
                createdAt={post.createdAt}
                tags={post.tags.map((tag) => tag)}
                updatedAt={post.updatedAt}
                categoryId={post.ca}
              />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
