import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setChooseAddress } from "../redux/addressSlice";
import { titleCase } from "../lib/capitalcase";

const Checkout = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {orderSummery} = useSelector(
      (store) => store.order
    );
  const naviget = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.id]: titleCase(e.target.value) });
  };

  const handleChooseAdd = (index) => {
    dispatch(setChooseAddress(currentUser?.address[index]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.fullname != "" &&
      input.phone != "" &&
      input.street != "" &&
      input.city != "" &&
      input.state != "" &&
      input.pincode != ""
    ) {
      try {
        setLoading(true);
        const res = await axios.post(
          "/api/user/updateuser",
          { address: [...currentUser.address, input] },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res?.data?.success) {
          dispatch(setCurrentUser(res.data.updatedUser));
          dispatch(setChooseAddress(input));
          setLoading(false);
          toast.success(res.data.message);
          naviget("/ordersummery");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.error("You need to fill all filds");
    }
  };

  useEffect(()=> {
    if (!orderSummery) {
      naviget("/")
    }
  }, [])

  return (
    <>
      <div className="text-center py-8 md:px-2 self-center">
        <ul className="steps w-full">
          <li className="step step-error">Register</li>
          <li className="step step-error">Dilivery Address</li>
          <li className="step">Order Summery</li>
          <li className="step">Receive Product</li>
        </ul>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-white lg:w-[80%] mx-auto px-6 py-5"
      >
        {currentUser?.address?.length !== 0 && <div className="border-b border-gray-900/10 pb-6 mb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            Address:
          </h2>
          <p className="mt-1 text-base font-semibold leading-6 text-gray-600">
            You Can Choose From Existing Address
          </p>
          <ul className="flex flex-wrap gap-4" role="list">
            {currentUser?.address?.map((address, index) => (
              <Link
                to="/ordersummery"
                key={index}
                onClick={() => handleChooseAdd(index)}
                className="flex justify-between rounded-md gap-x-6 md:w-[40%] mt-2 cursor-pointer mb-1 px-5 py-5 border-solid border-[1px] border-gray-200 shadow-md"
              >
                <div className="min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-800">
                      Name:{" "}
                      <span className="text-red-500">{address.fullname}</span>
                    </p>
                    <p className="mt-1 truncate text-base leading-5 font-semibold text-gray-700">
                      Street Address:{" "}
                      <span className="text-red-500">{address.street}</span>
                    </p>
                    <p className="mt-1 truncate text-base leading-5 font-semibold text-gray-700">
                      Pin Code:{" "}
                      <span className="text-red-500">{address.pincode}</span>
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-base leading-6 font-semibold text-gray-800">
                    Phone: <span className="text-red-500">{address.phone}</span>
                  </p>
                  <p className="text-base leading-6 font-semibold text-gray-700">
                    City: <span className="text-red-500">{address.city}</span>
                  </p>
                  <p className="text-base leading-6 font-semibold text-gray-700">
                    State: <span className="text-red-500">{address.state}</span>
                  </p>
                </div>
              </Link>
            ))}
          </ul>
        </div>}
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              If You Wants To Add New Dilivry Address. So You Can.
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    value={input.fullname}
                    onChange={handleInput}
                    type="text"
                    id="fullname"
                    className="block w-full outline-none pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone No
                </label>
                <div className="mt-2">
                  <input
                    value={input.phone}
                    onChange={handleInput}
                    id="phone"
                    type="tel"
                    className="block w-full outline-none pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <textarea
                    value={input.street}
                    onChange={handleInput}
                    type="text"
                    id="street"
                    className="block w-full outline-none pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    value={input.city}
                    onChange={handleInput}
                    type="text"
                    id="city"
                    className="block w-full outline-none pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    value={input.state}
                    onChange={handleInput}
                    type="text"
                    id="state"
                    autoComplete="address-level1"
                    className="block w-full rounded-md outline-none pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pin Code
                </label>
                <div className="mt-2">
                  <input
                    value={input.pincode}
                    onChange={handleInput}
                    type="text"
                    id="pincode"
                    autoComplete="postal-code"
                    className="block w-full rounded-md outline-none pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {!loading ? (
                "Add Address"
              ) : (
                <span className="loading loading-spinner text-white loading-sm"></span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Checkout;
