import { Skeleton } from "@/components/ui/skeleton";

export const EditorSkeleton = () => (
  <div className="space-y-4 py-6 pl-[69px]">
    <Skeleton className="bg-gray-500 rounded w-3/4 h-6" />
    <Skeleton className="bg-gray-500 rounded w-1/2 h-4" />
    <Skeleton className="bg-gray-500 mt-6 rounded w-1/2 h-16" />
    <Skeleton className="bg-gray-500 mt-4 rounded w-1/2 h-4" />
    <Skeleton className="bg-gray-500 rounded w-4/5 h-20" />
    <Skeleton className="bg-gray-500 rounded w-3/4 h-4" />
  </div>
);
