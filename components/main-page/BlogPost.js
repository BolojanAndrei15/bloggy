"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function BlogPost({ id, title, desc, createdAt, tags, img, updatedAt }) {
  const tag = tags.slice(0, 3);

  function formatDateTime(date) {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options);
  }
  const creationDate = new Date(createdAt);
  const updateDate = new Date(updatedAt);

  const formattedCreationDate = formatDateTime(creationDate);
  const formattedUpdateDate = formatDateTime(updateDate);

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
            <div className="flex space-x-3 items-center">
              <p className="font-semibold text-[15px] text-slate-600">
                <span className="font-bold text-slate-600">Created:</span>{" "}
                {formattedCreationDate}
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
        <div className="flex mt-2">
          {" "}
          {creationDate.getTime() !== updateDate.getTime() && (
            <p className="font-semibold text-[12px] text-slate-400">
              Last edited: {formattedUpdateDate}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default BlogPost;
