"use client";
import { v4 as uuidv4 } from "uuid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ContentLoader from "@/components/post/ContentLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PenSquare, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Error from "next/error";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.3,
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

function PostPage() {
  const [category, setCategory] = useState("");
  const { data: session, status } = useSession();
  const params = useParams();
  const [id] = params.id;
  const { toast } = useToast();
  const [userPost, setUserPost] = useState(null);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axios.post("/api/post", {
        postId: id,
      });

      return res.data;
    },
  });

  useEffect(() => {
    axios
      .get("/api/category")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error making GET request:", error);
      });
  }, []);

  useEffect(() => {
    if (isLoading) {
    } else if (status === "loading") {
    } else if (status === "authenticated") {
      if (data.authorId == session.user.id) {
        setUserPost(true);
      } else {
        setUserPost(false);
      }
    } else if (status === "unauthenticated") {
    }
  }, [status, isLoading, data, session]);

  const handleDelete = async () => {
    await axios.post("/api/blogpost/delete", { postId: id }).then(() => {
      toast({
        title: `Post was deleted succesfully`,
        description: "What are you waiting, go now and write a new one",
        action: (
          <ToastAction
            onClick={() => router.push("/create")}
            altText="Try again"
          >
            Create now
          </ToastAction>
        ),
      });
      router.push("/");
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isLoading ? (
        <ContentLoader />
      ) : isError ? (
        <Error statusCode={404} />
      ) : (
        <motion.div variants={container} initial="hidden" animate="visible">
          <div className="flex flex-col mb-10">
            <motion.div variants={item}>
              <img className="object-cover h-[30rem] w-full" src={data.image} />
            </motion.div>
            <div className="mt-2 flex flex-col space-y-2 mb-2">
              <div>
                <motion.h1 variants={item} className="text-2xl font-bold">
                  {data.title}
                </motion.h1>

                {data.createdAt !== data.updatedAt && (
                  <motion.p
                    variants={item}
                    className="text-[12px] font-semibold text-gray-500"
                  >
                    Last edited:{" "}
                    {new Date(data.updatedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </motion.p>
                )}
              </div>
              {category && (
                <motion.div
                  variants={item}
                  className="text-md flex items-center  font-semibold text-gray-800"
                >
                  <motion.p className="mr-1">Category:</motion.p>{" "}
                  {category.find((cat) => cat.id === data.categoryId)?.name ||
                    "Unknown Category"}
                </motion.div>
              )}

              <motion.h2
                variants={item}
                className="text-md font-semibold text-slate-800"
              >
                {data.description}
              </motion.h2>
            </div>
            <div className="w-full flex justify-start">
              <motion.div
                variants={item}
                className="grid grid-flow-row  grid-cols-3 sm:grid-cols-4 gap-2 lg:flex lg:space-x-2"
              >
                {data.tags.slice(0, 9).map((tag) => (
                  <Badge
                    key={uuidv4()}
                    className="text-[10px] sm:text-sm flex justify-center md:text-sm "
                  >
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            </div>
            <motion.div
              variants={item}
              className="flex md:flex-row flex-col mt-5 space-y-3"
            >
              <div className="flex space-x-2 w-[50%] items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-bold text-sm">{data.authorName}</h1>
                  <p className="font-semibold bold text-sm ">
                    Created: {data.createdAt}
                  </p>
                </div>
              </div>
              {userPost == true ? (
                <div className="flex space-x-3 pl-3 w-full justify-between lg:justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full lg:w-20">
                        <Link href={`/edit/${id}`}>
                          <Button className="w-full" variant={"outline"}>
                            <PenSquare />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit post</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full lg:w-20">
                        <Button
                          className="w-full"
                          onClick={() => {
                            handleDelete();
                          }}
                          variant={"destructive"}
                        >
                          <Trash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-500 text-white">
                        <p>Delete post</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                ""
              )}
            </motion.div>
          </div>
          <motion.div
            variants={item}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default PostPage;
