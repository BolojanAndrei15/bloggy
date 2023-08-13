"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function BlogPost({ id, title, desc, createdAt, tags, img }) {
  const tag = tags.slice(0, 3);

  return (
    <div>
      <Link
        href={`/post/${id}`}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <div className="min-w-full min-h-96 max-h-[22rem] max-w-full">
            <img className="object-cover h-[20rem] w-full" src={img} />
          </div>
          <div className="flex flex-col mt-3 ">
            <div>
              <p className="font-semibold text-sm text-slate-800">
                {createdAt}
              </p>
            </div>
            <h1 className="font-bold text-lg ">{title}</h1>
            <h2 className="font-medium text-sm">
              {desc.slice(0, 140) + "..."}
            </h2>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <div className="w-full flex">
            <div className="flex space-x-2 ">
              {tag.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogPost;
