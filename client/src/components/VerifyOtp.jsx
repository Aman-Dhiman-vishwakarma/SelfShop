import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCurrentUser } from "../redux/authSlice";

const VerifyOtp = ({ length = 6 }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const { checkMail } = useSelector((state) => state.auth);
  const naviget = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, length)
      .split("");
    const newOtp = [...otp];

    pastedData.forEach((char, i) => {
      if (i < length) newOtp[i] = char;
    });

    setOtp(newOtp);
    // onChangeOtp(newOtp.join(''));

    // Move focus to last filled
    const lastIndex = pastedData.length - 1;
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/verifyotp",
        { otp: otpValue },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        setLoading(false);
        dispatch(setCurrentUser(data.user));
        naviget("/");
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }

    // const newOtp = [...otp];
    // newOtp.forEach((char, i) => {
    //   if (i < length) newOtp[i] = "";
    // });
    // setOtp(newOtp);
  };

  useEffect(() => {
    if (checkMail == null) {
      naviget("/");
    }
  }, []);

  return (
    <div className="h-[70vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-8 space-y-4 shadow-md border border-gray-200 rounded-md"
      >
        <div className="text-center">
          <h1 className="text-xl font-semibold">Verify Email</h1>
          <p className="text-sm font-semibold">
            OTP send on your email. please check your email
          </p>
        </div>
        <div className="flex gap-3" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => (inputsRef.current[i] = el)}
              className="w-10 h-10 text-center text-xl border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </div>
        {!loading ? (
          <button
            type="submit"
            className="mt-4 p-2 w-full bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Send OTP
          </button>
        ) : (
          <button
            type="button"
            className="mt-4 p-2 w-full bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            <span className="loading loading-spinner text-white loading-sm"></span>
          </button>
        )}
      </form>
    </div>
  );
};

export default VerifyOtp;
