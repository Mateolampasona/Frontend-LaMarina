import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col bg-red-400 w-56 justify-center h-64 animate-pulse rounded-xl p-4 gap-4">
      <div className="bg-red-300/50 w-full h-32 animate-pulse rounded-md"></div>
      <div className="flex flex-col gap-2">
        <div className="bg-neutral-300/50 w-full h-4 animate-pulse rounded-md"></div>
        <div className="bg-neutral-300/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        <div className="bg-neutral-300/50 w-full h-4 animate-pulse rounded-md"></div>
        <div className="bg-neutral-300/50 w-2/4 h-4 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export default Loading;
