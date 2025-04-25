import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setChooseAddress } from "../redux/addressSlice";
import { setOrderSummery } from "../redux/orderSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { HiOutlineShoppingBag } from "react-icons/hi";

const OrderSummery = () => {
  const { cart } = useSelector((store) => store.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const { orderSummery, totalamount, totalitems } = useSelector(
    (store) => store.order
  );
  const [paymentMethod, setPaymentMethod] = useState(" ");
  const { chooseAddress } = useSelector((store) => store.address);
  const [loading, setLoading] = useState(false);
  const naviget = useNavigate();
  const dispatch = useDispatch();
  // const totalamount = cart?.reduce(
  //   (amount, product) =>
  //     product.productId.discountPrice * product.quantity + amount,
  //   0
  // );
  // const totalitems = cart?.reduce(
  //   (items, product) => product.quantity + items,
  //   0
  // );

  // const setCart = () => {

  // }

  // useEffect(()=>{
  //   setCart();
  // }, [])
  console.log(totalamount, totalitems)
  console.log(orderSummery)

  const handleorder = async () => {
    try {
      if (chooseAddress && paymentMethod !== " ") {
        const order = {
          products: orderSummery,
          totalamount,
          totalitems,
          user: currentUser._id,
          paymentMethod,
          selectedaddress: chooseAddress,
          status: "pending",
        };
        setLoading(true);
        const res = await axios.post("/api/order/createorder", order, {
          headers: { "Content-Type": "application/json" },
        });
        if (res?.data?.success) {
          setLoading(false);
          if (res?.data?.order?.paymentMethod == "cash") {
            naviget(`/ordersuccess/${res?.data?.order._id}`);
          }
          toast.success(res.data.message);
        }
      } else {
        toast.error("Select any Payment Method");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Somthing went wrong!");
    }
  };

  useEffect(() => {
    if (chooseAddress === null) {
      naviget("/checkout");
    }
    if (!orderSummery) {
      naviget("/")
    }
  }, []);
 
  return (
    <>
      <div className="text-center py-8 md:px-2 self-center">
        <ul className="steps w-full">
          <li className="step step-error">Register</li>
          <li className="step step-error">Diliver Address</li>
          <li className="step step-error">Order Summery</li>
          <li className="step">Receive Product</li>
        </ul>
      </div>
      <div className="flex justify-evenly flex-wrap mt-4">
        <div className="">
          <h1 className="text-xl font-semibold py-6">Order Information</h1>
          <div className="p-2 border-[1px] border-gray-100 shadow-md">
            <h1 className="text-lg font-semibold">Your Dilivry Address:</h1>
            <ul role="list">
              <div className="flex justify-between gap-x-6 w-full md:w-[100%] mt-2 cursor-pointer border-solid">
                <div className="min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold  text-gray-800">
                      Name:{" "}
                      <span className="text-red-500">
                        {chooseAddress?.fullname}
                      </span>
                    </p>
                    <p className="mt-1 truncate text-base text-wrap w-96 font-semibold text-gray-700">
                      Street Address:{" "}
                      <span className="text-red-500">
                        {chooseAddress?.street}
                      </span>
                    </p>
                    <p className="mt-1 truncate text-base font-semibold text-gray-700">
                      Pin Code:{" "}
                      <span className="text-red-500">
                        {chooseAddress?.pincode}
                      </span>
                    </p>
                  </div>
                </div>
                <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-base leading-6 font-semibold text-gray-800">
                    Phone:{" "}
                    <span className="text-red-500">{chooseAddress?.phone}</span>
                  </p>
                  <p className="text-base leading-6 font-semibold text-gray-700">
                    City:{" "}
                    <span className="text-red-500">{chooseAddress?.city}</span>
                  </p>
                  <p className="text-base leading-6 font-semibold text-gray-700">
                    State:{" "}
                    <span className="text-red-500">{chooseAddress?.state}</span>
                  </p>
                </div>
              </div>
            </ul>
          </div>
          <div className=" shadow-md p-2 border-[1px] border-gray-100 rounded-md mt-4">
            <h1 className="text-lg font-semibold">Choose Payment Method:</h1>
            <ul className="flex gap-4 items-center mt-2">
              {" "}
              <li
                onClick={() => setPaymentMethod("cash")}
                className={`text-base ${
                  paymentMethod === "cash" &&
                  "border-2 border-red-600 text-red-700"
                } font-semibold cursor-pointer rounded-md px-3 py-2 bg-red-50`}
              >
                Cash Payment
              </li>
              <li
                onClick={() => toast.error("You can't use card payment that time")}
                className={`text-base ${
                  paymentMethod === "card" &&
                  "border-2 border-red-600 text-red-700"
                } font-semibold cursor-pointer rounded-md px-3 py-2 bg-red-50`}
              >
                Card Payment
              </li>
            </ul>
          </div>
        </div>

        <div className="flex h-full flex-col bg-white xl:px-10">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-semibold">Order Summery</h1>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {orderSummery?.length != 0 ? (
                    orderSummery?.map((product) => (
                      <li key={product.productId._id} className="flex py-4">
                        <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={product.productId.title}
                            src={product.productId.thumbnail || product.productId.images[0]}
                            className="size-full object-contain"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-semibold text-gray-900">
                              <h3>
                                <a
                                  href={product.href}
                                  className="line-clamp-1 w-64"
                                >
                                  {product.productId.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                Rs.{product.productId.discountPrice}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-center justify-between text-sm">
                            <p className="mt-1 text-sm text-gray-700 font-semibold">
                              Color: {product.productId.color}
                            </p>

                            <div className="flex">
                              <p className="text-gray-700 font-semibold">
                                Qty: {product.quantity}
                              </p>
                              {/* <button
                           
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500 hover:bg-red-100 rounded-md p-1"
                          >
                            {!loading ? "Remove" : <span className="loading loading-spinner text-secondary loading-sm"></span>}
                          </button> */}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="p-4 w-full flex items-center flex-col gap-4">
                      <div className="h-80 w-80">
                        <img
                          src="https://img.freepik.com/free-vector/empty-shopping-bag-white-advertising-branding_1284-48173.jpg"
                          alt=""
                        />
                      </div>
                      <div className="font-semibold text-3xl">
                        Your Shopping Bag is{" "}
                        <span className="text-red-500">Empty!</span>
                      </div>
                      <p>
                        Must add items on the beg before you proceed to
                        checkout.
                      </p>
                      <Link
                        to="/allproducts"
                        className="px-6 py-3 rounded-3xl bg-red-500 font-semibold text-white flex gap-2 items-center"
                      >
                        <HiOutlineShoppingBag size="20" /> Return to Shope
                      </Link>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {orderSummery?.length != 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs.{totalamount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total items in beg</p>
                <p>{totalitems} Items</p>
              </div>
              <div className="mt-6">
                {!loading ? (
                  <button
                    onClick={handleorder}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-2 text-base font-medium text-white shadow-xs hover:bg-red-700"
                  >
                    Place Order
                  </button>
                ) : (
                  <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-2 text-base font-medium text-white shadow-xs hover:bg-red-700">
                    <span className="loading loading-spinner text-white loading-sm mr-2"></span>{" "}
                    Loading...
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSummery;
