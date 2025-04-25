import React from "react";
import { TiTick } from "react-icons/ti";
import { TbCircleKeyFilled } from "react-icons/tb";

const PolicySecond = () => {
  return (
    <div className="bg-red-50 p-3 w-[95%] mx-auto mt-2">
      <div className="mx-auto flex justify-evenly font-[500] text-gray-800">
        <div className="flex items-center gap-2 text-red-700">
          {" "}
          <div className="p-1 rounded-full bg-red-500 h-8 w-8">
            <TiTick size="24" color="white" />
          </div>{" "}
          100% ORIGNEL PRODUCTS
        </div>{" "}
        <span className="text-red-300 font-light">|</span>
        <div className="flex items-center gap-2 text-red-700">
          {" "}
          <div className="p-1 rounded-full flex justify-center items-center text-white bg-red-500 h-8 w-8">
          <span className="text-2xl mr-[2px]">₹</span>
          </div>
           EASY RETURN & REFUNDS
        </div>{" "}
        <span className="text-red-300 font-light">|</span>
        <div className="flex items-center gap-2 text-red-700">
          <div className="rounded-full">
            <TbCircleKeyFilled className="text-red-500" size="40" />
          </div>
          100% SECURE PYMENTS
        </div>
      </div>
    </div>
  );
};

export default PolicySecond;
