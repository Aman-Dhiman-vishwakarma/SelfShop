import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { setCurrentUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { titleCase } from "../lib/capitalcase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [editForm, setEditForm] = useState(-1);
  const [selectIndex, setSelectIndex] = useState(-1);

  const [input, setInput] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleEdit = (index) => {
    setEditForm(index);
    setInput(currentUser.address[index]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = [...currentUser.address];
    newAddress.splice(editForm, 1, input);
    updateAddress(newAddress);
  };

  const handleDelete = async (index) => {
    setSelectIndex(index);
    const newAddress = [...currentUser.address];
    newAddress.splice(index, 1);

    try {
      setLoading(true);
      const res = await axios.post(
        "/api/user/updateuser",
        { address: newAddress },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res?.data?.success) {
        dispatch(setCurrentUser(res.data.updatedUser));
        setLoading(false);
        setEditForm(-1);
        toast.success("Add delete Successfuly");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateAddress = async (editedAddress) => {
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
          { address: editedAddress },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res?.data?.success) {
          dispatch(setCurrentUser(res.data.updatedUser));
          setLoading(false);
          setEditForm(-1);
          toast.success(res.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.error("You need to fill all filds");
    }
  };
  return (
    <div className="flex justify-evenly mt-10 max-w-7xl mx-auto gap-10">
      <div className="">
        <h1 className="text-2xl text-red-500 font-bold"><span className="text-black">Hello,</span> {titleCase(currentUser?.fullname)}</h1>
        <h1 className="text-2xl font-bold">Manage Your Self<span className="text-red-500">Shope!</span>  Account</h1>
        <p className="text-base text-gray-700 py-1">Yoy can add new address at the time of chechout.</p>
        <p className="text-base text-gray-700 pb-1">You can remove and edit your address hear.</p>
      <div className="">
         <img className="h-96 mt-2" src="https://growwiderinternational.com/wp-content/uploads/2023/09/1.-Ecommerce-Account-Setup-cghmgchm-jd.webp" alt="image" />
      </div>
      </div>
    <div className=" max-w-xl bg-white shadow-md px-4 py-4 rounded-md">
      <h1 className="text-xl text-center font-semibold p-2 mb-2">
        Your Profile
      </h1>
      <h1 className="text-lg font-semibold">
        Name:{" "}
        <span className="text-red-600 font-semibold">
          {titleCase(currentUser?.fullname)}
        </span>
      </h1>
      <h1 className="text-lg font-semibold">
        Email:{" "}
        <span className="text-red-600 font-semibold">{currentUser?.email}</span>
      </h1>
      <div className="">
        <h1 className="text-lg font-semibold mt-2">Your Addresses:</h1>
        <div className="flex flex-wrap gap-2">
          {(currentUser?.address?.length !== 0) ? currentUser?.address?.map((address, index) => (
            <div className="w-full">
              {editForm === index && (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="bg-white lg:w-[100%] shadow-md p-2 py-5"
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
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
                        onClick={() => setEditForm(-1)}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Cancle
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        {!loading ? (
                          "Edit Address"
                        ) : (
                          <span className="loading loading-spinner text-neutral loading-sm mr-2"></span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
              <div className="shadow-md p-2 w-full">
                <div className="flex justify-between items-center">
                  <p className="mt-1 truncate text-base font-semibold text-gray-700">
                    Name:{" "}
                    <span className="text-red-500">{address?.fullname}</span>
                  </p>

                  <p className="mt-1 truncate text-base font-semibold text-gray-700">
                    Pin Code:{" "}
                    <span className="text-red-500">{address?.pincode}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base leading-6 font-semibold text-gray-800">
                    Phone: <span className="text-red-500">{address?.phone}</span>
                  </p>
                  <p className="text-base leading-6 font-semibold text-gray-700">
                    City: <span className="text-red-500">{address?.city}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="mt-1 text-wrap w-80 mr-10 text-base  font-semibold text-gray-700">
                    Street Address:{" "}
                    <span className="text-red-500">{address?.street}</span>
                  </p>
                  <p className="text-base leading-6 font-semibold text-gray-700">
                    State: <span className="text-red-500">{address?.state}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {" "}
                  <span
                    onClick={() => handleEdit(index)}
                    className="px-3 py-2 cursor-pointer text-white bg-green-600 rounded-md"
                  >
                    <MdModeEdit color="white" size="22" />
                  </span>
                  <span
                    onClick={() => handleDelete(index)}
                    className="px-3 py-2 cursor-pointer bg-red-600 rounded-md"
                  >
                    {" "}
                    {loading && selectIndex === index ? <span className="text-white">Loading...</span> : <MdDelete color="white" size="22" />}
                    
                  </span>
                </div>
              </div>
            </div>
          )) : <div className="text-base flex flex-col gap-2 font-semibold text-gray-700 p-2">Address Added at Checkout  <Link to="/allproducts" className="px-4 py-2 rounded-3xl bg-red-500 font-semibold text-white flex gap-2 items-center"><HiOutlineShoppingBag size="20" /> Return to Shope</Link></div>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
