import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCheckMail } from "../redux/authSlice";

const SignUp = () => {
  const neviget = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.fullname === "" || input.email === "" || input.password === "") {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", input, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        dispatch(setCheckMail("dummymail"));
        setLoading(false);
        neviget("/verifyotp");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      neviget("/");
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Fullname
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  value={input.fullname}
                  onChange={handleInput}
                  required
                  autoComplete="fullname"
                  className="block w-full rounded-md border-[1px] border-gray-400 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleInput}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-[1px] border-gray-400 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={handleInput}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-[1px] border-gray-400 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
              <div className="text-sm">
                <Link
                  to="/forgotpassword"
                  className="font-semibold text-red-400 hover:text-red-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              {!loading ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="button"
                  className="flex w-full justify-center border-[1px] border-red-400 text-red-400 rounded-md bg-gray-100 px-3 py-1.5 font-semibold shadow-xs "
                >
                  <span className="loading loading-spinner text-secondary loading-sm mr-2"></span>{" "}
                  Loading...
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Allresdy have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-red-600 hover:text-red-500"
            >
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
