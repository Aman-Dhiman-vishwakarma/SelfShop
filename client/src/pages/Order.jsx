import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrders } from "../redux/orderSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import NoOrders from "../components/NoOrder";

const Order = () => {
  const { userOrders } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/order/fetchuserorders");
      if (res.data.success) {
        setLoading(false);
        dispatch(setUserOrders(res.data.orders));
      }
    } catch (error) {
      setLoading(false);
      toast.error("Somthing went wrong!");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {!loading ? (
        userOrders.length !== 0 ? (
          userOrders?.map((order) => (
            <div
              key={order._id}
              className="lg:max-w-7xl mx-auto mt-4 pb-2 shadow-md flex"
            >
              <div className="w-[66%]">
                <h1 className="text-md font-semibold p-4">
                  Order: #{order._id}
                </h1>
                <div className="px-10 py-3">
                  <div className="flex items-center px-11">
                    <div className="p-1 rounded-full bg-red-500 h-6 w-6">
                      <TiTick color="white" />
                    </div>
                    <div
                      className={`flex-1 border-t-2 ${
                        order?.status === "shipping" ||
                        order?.status === "deliverd"
                          ? "border-t-2 border-red-500"
                          : "border-dashed border-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`p-1 rounded-full ${
                        order?.status === "shipping" ||
                        order?.status === "deliverd"
                          ? "bg-red-500"
                          : "border-2 border-gray-400"
                      }  h-6 w-6`}
                    >
                      {(order?.status === "shipping" ||
                        order?.status === "deliverd") && (
                        <TiTick color="white" />
                      )}
                    </div>
                    <div
                      className={`flex-1 border-t-2 ${
                        order?.status === "deliverd"
                          ? "border-t-2 border-red-500"
                          : "border-dashed border-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`p-1 rounded-full ${
                        order?.status === "deliverd"
                          ? "bg-red-500"
                          : "border-2 border-gray-400"
                      } h-6 w-6`}
                    >
                      {order?.status === "deliverd" && <TiTick color="white" />}
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold text-sm text-gray-700 pt-1">
                    <span>Order Confirmed</span>
                    <span>Shipped</span>
                    <span>Delivered Success</span>
                  </div>
                </div>

                <div className="px-6 mt-4">
                  <div className="flow-root border-[1px] border-gray-300 rounded-md p-2">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order?.products?.map((product) => (
                        <li key={product?._id} className="flex py-6">
                          <div className="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt=""
                              src={
                                product.productId.thumbnail ||
                                product.productId.images[0]
                              }
                              className="size-full object-contain"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-semibold text-gray-900">
                                <h3>
                                  <a href="" className="line-clamp-1 w-64">
                                    {product.productId.title}
                                  </a>
                                </h3>
                                <p className="ml-4 text-orange-400">
                                  {order?.status === "deliverd" ? (
                                    <span className="text-green-700">
                                      Deliverd{" "}
                                    </span>
                                  ) : (
                                    "In Progress"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 gap-3 items-center text-sm">
                              {product.productSizeOrConfigretion && (
                                <p className="mt-1 text-sm text-gray-700 font-semibold">
                                  Size: {product.productSizeOrConfigretion}{" "}
                                  <span className="text-gray-400 ml-2">|</span>
                                </p>
                              )}

                              <div className="flex items-end">
                                <p className="text-gray-700 font-semibold">
                                  Qty: {product.quantity}
                                </p>
                              </div>
                              <div className="flex items-end">
                                {product.productId.color && (
                                  <p className="text-gray-700 font-semibold">
                                    <span className="text-gray-400 mr-2">
                                      |
                                    </span>{" "}
                                    Color: {product.productId.color}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-1 gap-3 font-semibold text-gray-900 items-center text-sm">
                              <p className="">
                                Rs.{product.productId.discountPrice}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-[34%] p-2">
                <div className="">
                  <h1 className="text-md font-semibold py-2">
                    Delivry Address
                  </h1>
                  <div className="border-[1px] border-gray-300 rounded-md p-2">
                    <div className="flex justify-between gap-x-6 w-full md:w-[100%] mt-2 cursor-pointer border-solid">
                      <div className="min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-semibold  text-gray-800">
                            Name:{" "}
                            <span className="text-red-500">
                              {order?.selectedaddress?.fullname}
                            </span>
                          </p>
                          <p className="mt-1 truncate text-base font-semibold text-gray-700">
                            Pin Code:{" "}
                            <span className="text-red-500">
                              {order?.selectedaddress?.pincode}
                            </span>
                          </p>
                          <p className="text-base leading-6 font-semibold text-gray-700">
                            State:{" "}
                            <span className="text-red-500">
                              {order?.selectedaddress?.state}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-base leading-6 font-semibold text-gray-800">
                          Phone:{" "}
                          <span className="text-red-500">
                            {order?.selectedaddress?.phone}
                          </span>
                        </p>
                        <p className="text-base leading-6 font-semibold text-gray-700">
                          City:{" "}
                          <span className="text-red-500">
                            {order?.selectedaddress?.city}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="mt-1 truncate text-base text-wrap font-semibold text-gray-700">
                      Street Address:{" "}
                      <span className="text-red-500 text-wrap">
                        {order?.selectedaddress?.street}
                      </span>
                    </p>
                  </div>
                  <h1 className="text-md font-semibold py-2 mt-2">
                    Order Detail
                  </h1>
                  <div className="font-semibold text-gray-700 border-[1px] border-gray-300 rounded-md p-2">
                    <p>
                      PaymentMethod :{" "}
                      <span className="text-red-600 ml-2">
                        {order?.paymentMethod}
                      </span>
                    </p>
                    <p>
                      TotalAmount :{" "}
                      <span className="text-red-600 ml-2">
                        {order?.totalamount}
                      </span>
                    </p>
                    <p>
                      TotalItem :{" "}
                      <span className="text-red-600 ml-2">
                        {order?.totalitems}
                      </span>
                    </p>
                    <p>
                      Order Date :{" "}
                      <span className="text-red-600 ml-2">
                        {order?.createdAt
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoOrders />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Order;
