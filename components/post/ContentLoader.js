import { Skeleton } from "../ui/skeleton";

function ContentLoader() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="w-full h-[50rem]" />
      <Skeleton className="w-96 h-8" />
      <Skeleton className="w-full h-4" />
    </div>
  );
}

export default ContentLoader;
