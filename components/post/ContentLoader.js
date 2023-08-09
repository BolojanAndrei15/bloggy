import { Skeleton } from "../ui/skeleton";

function ContentLoader() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="w-full h-[30rem]" />
      <Skeleton className="w-96 h-4" />
      <Skeleton className="w-full h-2" />
      <Skeleton className="w-full h-2" />
      <Skeleton className="w-full h-2" />
      <div className="flex w-full justify-start space-x-2 rounded-2xl">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-24 h-5" />
      </div>
      <div className="flex flex-row items-center">
        <Skeleton className="w-10 h-10 rounded-3xl" />
      </div>
      <div className="flex flex-col space-y-2 pt-10">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
      </div>
    </div>
  );
}

export default ContentLoader;
