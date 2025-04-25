import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCheckMail } from '../redux/authSlice';

const NewPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const {checkMail} = useSelector((state)=>state.auth)
  const naviget = useNavigate()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation (at least 8 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!checkMail) {
      return;
    }

    try {
      setLoading(true)
      const {data} = await axios.post("/api/auth/resetpassword", {email:checkMail, newPassword:password}, {
        headers: { "Content-Type": "application/json" },
      })
      if (data.success) {
        dispatch(setCheckMail(null))
        setLoading(false)
        toast.success(data.message)
        naviget("/signin")
      }
    } catch (error) {
      setLoading(false)
    }

    setError('');
    setPassword("")
  };

  useEffect(()=>{
    if (checkMail == null) {
      naviget("/")
    }

  }, [])

  return (
    <div className="flex justify-center items-center h-[64vh]">
    <div className="w-96 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Set New Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            New Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-red-500 focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {!loading ? (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Set Password
              </button>
            ) : (
              <button
                type="button"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                <span className="loading loading-spinner text-white loading-sm mr-2"></span> Wait...
              </button>
            )}
      </form>
    </div>
    </div>
  );
};

export default NewPasswordForm;
