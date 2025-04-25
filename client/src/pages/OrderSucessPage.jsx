import axios from "axios";
import React, { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setAddToCart } from "../redux/cartSlice";
import { setOrderSummeryToN, setTotleAmountItems } from "../redux/orderSlice";
import { setChooseAddress } from "../redux/addressSlice";

const OrderSucessPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const deleteAllCart = async () => {
    try {
      const res = await axios.delete("/api/cart/deleteUsercartItem");
      if (res.data.success) {
        dispatch(setAddToCart([]));
        dispatch(setOrderSummeryToN())
        dispatch(setTotleAmountItems({totalamount:0, totalitems:0}))
        dispatch(setChooseAddress(null))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deleteAllCart();
  }, []);

  return (
    <div>
      <main className="grid min-h-full w-[80%] mx-auto mt-10 place-items-center bg-white px-6 py-16 sm:py-24 lg:px-8 shadow-md border-[1px]">
        <div className="text-center">
          <div className="flex justify-center p-4">
            <div className="h-16 w-16 rounded-full flex justify-center items-center border-4 border-red-700">
              <TiTick size="40" className="text-red-700" />
            </div>
          </div>
          <p className="text-4xl font-semibold text-red-600 mb-4">
            OrderId # {orderId}
          </p>
          <span className="text-lg text-red-600 font-semibold">
            Thankyou fpr Ordering
          </span>
          <h1 className="mt-2 text-2xl font-medium tracking-tight text-balance text-gray-800 sm:text-5xl">
            YOUR ORDER IS CONFIRMED!
          </h1>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSucessPage;
