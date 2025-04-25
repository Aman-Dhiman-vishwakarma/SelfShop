import React from "react";
import { GiReturnArrow } from "react-icons/gi";
import { GiCash } from "react-icons/gi";
import { IoIosPricetag } from "react-icons/io";

const Policy = () => {
  return (
    <div className="border-[1px] border-red-500 rounded-md p-3 w-[98%] text-xs md:text-base mx-auto mt-2">
      <div className="w-fit mx-auto flex gap-10 font-[500] text-gray-800">
        <div className="flex items-center gap-2"><GiReturnArrow className="text-red-600" /> 7 Days Easy Return</div> <span className="text-red-300 font-light">|</span>
        <div className="flex items-center gap-2"> <GiCash className="text-red-600" /> Cash on Delivery</div> <span className="text-red-300 font-light">|</span>
        <div className="flex items-center gap-2"><IoIosPricetag className="text-red-600" /> Lowest Prices</div>
      </div>
    </div>
  );
};

export default Policy;
