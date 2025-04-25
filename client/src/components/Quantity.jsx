import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dicriseQuantity, incriseQuantity } from "../redux/quantitySlice";

const Quantity = () => {
  const { value } = useSelector((store) => store.quantity);
  const dispatch = useDispatch();
  return (
    <div className="h-9 w-24 flex items-center bg-red-50 rounded-md shadow-md">
      <button
        onClick={() => dispatch(dicriseQuantity())}
        className="h-full flex items-center justify-center flex-1 text-2xl"
        type="button"
      >
        -
      </button>
      <div className="flex items-center justify-center flex-1">{value}</div>
      <button
        onClick={() => dispatch(incriseQuantity())}
        className="flex items-center justify-center flex-1 text-2xl"
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
