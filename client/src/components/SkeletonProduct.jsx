import React from "react";

const SkeletonProduct = () => {
  return (
    <div className="flex w-52 flex-col gap-3">
      <div className="skeleton h-60 w-full"></div>
      <div className="flex justify-between">
        <div className="skeleton h-4 w-[80%]"></div>{" "}
        <div className="skeleton h-4 w-[15%]"></div>
      </div>
      <div className="skeleton h-3 w-full"></div>
      <div className="flex gap-6">
        <div className="skeleton h-6 w-20"></div>{" "}
        <div className="skeleton h-6 w-24"></div>
      </div>
      <div className="skeleton h-5 w-28"></div>
    </div>
  );
};

export default SkeletonProduct;
