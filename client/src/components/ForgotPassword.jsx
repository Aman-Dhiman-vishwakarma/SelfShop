import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCheckMail } from "../redux/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const naviget = useNavigate();
  const dispatch = useDispatch()

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email format
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/resetotpsend",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        setLoading(false);
        dispatch(setCheckMail(data.email))
        naviget("/resetotpinput");
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }

    setError("");
    setEmail("")
  };

  return (
    <div className="flex justify-center items-center h-[68vh]">
      <div className="w-96 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Send OTP</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-6">
            {!loading ? (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="button"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                <span className="loading loading-spinner text-white loading-sm mr-2"></span> Wait...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
