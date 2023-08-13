"use client";

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
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

function PostPage() {
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
  }, [status, isLoading]);
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
    <>
      {isLoading ? (
        <ContentLoader />
      ) : isError ? (
        <Error statusCode={404} />
      ) : (
        <div>
          <div className="flex flex-col mb-10">
            <div>
              <img className="object-cover h-[30rem] w-full" src={data.image} />
            </div>
            <div className="mt-2 flex flex-col space-y-2 mb-2">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <h2 className="text-md font-semibold text-slate-800">
                {data.description}
              </h2>
            </div>
            <div className="w-full flex justify-start">
              <div className="flex space-x-2">
                {data.tags.map((tag) => (
                  <Badge key={tag} className="text-[10px] md:text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-5">
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
              {userPost == true ? (
                <div className="flex space-x-3 pl-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/edit/${id}`}>
                          <Button variant={"outline"}>
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
                      <TooltipTrigger>
                        <Button
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
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      )}
    </>
  );
}

export default PostPage;
