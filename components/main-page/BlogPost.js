"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function BlogPost({ id, title, desc, createdAt, tags, author }) {
  return (
    <div>
      <Link href={id} className="flex flex-col">
        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
        <div className="flex flex-col mt-3">
          <div>
            <p className="font-semibold text-sm text-slate-800">{createdAt}</p>
            <p>By{author}</p>
          </div>
          <h1 className="font-bold text-lg mt-2">{title}</h1>
          <h2 className="font-medium text-sm">{desc}</h2>
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
