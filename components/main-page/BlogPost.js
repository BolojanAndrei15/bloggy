"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function BlogPost({ id, title, desc, createdAt, tags, img }) {
  return (
    <div>
      <Link href={id} className="flex flex-col">
        <img src={img} />
        <div className="flex flex-col mt-3 ">
          <div>
            <p className="font-semibold text-sm text-slate-800">{createdAt}</p>
          </div>
          <h1 className="font-bold text-lg ">{title}</h1>
          <h2 className="font-medium text-sm">{desc.slice(0, 100) + "..."}</h2>
        </div>
        <div className="w-full flex justify-start mt-3">
          <div className="flex space-x-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogPost;
