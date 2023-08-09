import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ContentLoader() {
  return (
    <div className="flex flex-col space-y-2">
      <div>
        <Skeleton className="w-full h-60" />
      </div>
      <div>
        <Skeleton className="w-full h-3 rounded-sm" />
        <div className="flex space-x-2 mt-2 items-center">
          <Skeleton className="w-12 h-10 rounded-3xl " />

          <Skeleton className="w-full h-3 " />
        </div>
        <div className="mt-2">
          <Skeleton className="w-full h-5 " />
          <div className="flex-flex-col mt-2 space-y-2">
            <Skeleton className="w-full h-2 " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLoader;
