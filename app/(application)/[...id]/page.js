"use client";
import ContentLoader from "@/components/post/ContentLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error from "next/error";
import { useParams, useRouter } from "next/navigation";

function PostPage() {
  const params = useParams();
  const [id] = params.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axios.post("http://localhost:3000/api/post", {
        postId: id,
      });
      return res.data;
    },
  });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <ContentLoader />
      ) : isError ? (
        <Error statusCode={404} />
      ) : (
        <div>
          <div className="flex flex-col mb-10">
            <img src={data.image} />
            <div className="mt-2 flex flex-col space-y-2 mb-2">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <h2 className="text-md font-semibold text-slate-800">
                {data.description}
              </h2>
            </div>
            <div className="w-full flex justify-start">
              <div className="flex space-x-2">
                {data.tags.map((tag) => (
                  <Badge className="text-[10px] md:text-sm">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-sm">{data.authorId}</h1>
                <p className="font-semibold bold text-sm ">{data.createdAt}</p>
              </div>
            </div>
          </div>
          <div>{data.content}</div>
        </div>
      )}
    </>
  );
}

export default PostPage;
