import React from 'react';
import { FaBoxOpen } from 'react-icons/fa'; // Using react-icons for a nice box icon
import { Link } from 'react-router-dom';

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-6">
      
      {/* Icon */}
      <FaBoxOpen className="text-red-500 text-6xl mb-4 animate-pulse" />

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No Orders Yet
      </h2>

      {/* Subtext */}
      <p className="text-gray-700 max-w-md">
        You have not placed any orders yet. Once you make a purchase, your orders will appear here.
      </p>

      {/* Go Shop Button */}
      <Link to="/allproducts" className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition duration-300">
        Start Shopping
      </Link>

    </div>
  );
};

export default NoOrders;
