"use client";

import Skeleton from "@/Components/Skeleton";

export default function HunterDetailsSkeleton() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left Side */}
        <div className="w-full md:w-[40%] space-y-4">
          <Skeleton className="w-full h-[60vh] rounded-2xl" />
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-[72px] h-[72px] rounded-lg" />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 space-y-6">
          <Skeleton className="w-1/3 h-10" />
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>

          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-full h-24" />

          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="w-36 h-6 mb-2" />
                <Skeleton className="h-28 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
