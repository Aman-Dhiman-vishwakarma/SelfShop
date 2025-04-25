import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(null);
  const [productInfo, setProductInfo] = useState([])

  const searchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/product/searchproducts?searchTerm=${value && value}`
      );
      if (res.data.success) {
        setProductInfo(res.data.products)
        console.log(res.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const searchTimer = setTimeout(()=>{
      if (value) {
        searchProducts();
      }
    }, 300)


    return () => {
      clearTimeout(searchTimer);
     
    };
  }, [value]);

  return (
    <form className="relative ml-9 w-[40%] p-2 border-[1px] lg:flex items-center gap-2 border-gray-400 rounded-md hidden">
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="size-6 text-gray-600"
      />
      <input
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onChange={(e) => setValue(e.target.value)}
        className="border-none w-full outline-none placeholder:text-gray-600"
        type="text"
        placeholder="Search For Products..."
      />
      {(productInfo.length !== 0  && value ) && (
        <div className="absolute z-50 w-full bg-white py-2 left-0 top-11 shadow-md rounded-b-md">
          {productInfo?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 font-medium text-gray-700 px-2 py-1 cursor-pointer hover:bg-red-50 text-sm"
            >
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="size-5 text-gray-600"
              />
              <Link to={`/allproducts?searchTerm=${item?.title}`} onClick={()=>setValue(null)} className="flex justify-between w-full items-center list-none">{item?.title}</Link>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
