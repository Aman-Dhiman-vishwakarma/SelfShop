import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const AllAdminProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasmore, sethasmore] = useState(true);

  const fetchAdminProducts = async () => {
    try {
      sethasmore(true);
      setLoading(true);
      const res = await axios.get(
        `/api/product/getproducts?startIndex=${productsList?.length}`
      );
      if (res?.data?.success) {
        setLoading(false);
        setProductsList([...productsList, ...res.data.products]);
      }
      if (res?.data?.products?.length === 0) {
        sethasmore(false);
      }
    } catch (error) {
      setLoading(false);
      sethasmore(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(`/api/product/deleteproduct/${productId}`);
      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="w-[90%] text-center mx-auto p-10 mt-12">
  //       <span className="loading loading-spinner text-red-600 loading-xl mr-2"></span>
  //     </div>
  //   );
  // }

  return (
    <div
      id="scrollableDiv"
      className="w-[80%]  h-[85vh] mx-auto overflow-y-scroll"
    >
      <div className="">
        <InfiniteScroll
          dataLength={productsList?.length}
          next={fetchAdminProducts}
          hasMore={hasmore}
          scrollableTarget="scrollableDiv"
          loader={
            <h4 className="flex justify-center items-center text-lg font gap-2 p-14 mb-6">
              <span className="loading loading-spinner text-red-600 loading-xl"></span>{" "}
            </h4>
          }
          endMessage={
            <p className="text-center p-2 my-4 font-semibold border-t">
              Yay! You have seen it all
            </p>
          }
        >
          <ul className="list bg-base-100 rounded-box shadow-md mt-4">
            <li className="p-4 pb-2 text-lg opacity-80 font-semibold tracking-wide">
              Products List
            </li>

            {productsList?.map((item, index) => (
              <li key={index} className="list-row ">
                <div>
                  <img
                    className="w-16"
                    src={item?.images[0] || item?.thumbnail}
                  />
                </div>
                <div>
                  <div className="text-base font-semibold">{item?.title}</div>
                  <div className="text-sm font-semibold opacity-75">
                    {item?.description}
                  </div>
                  <div className="text-base opacity-90 font-semibold">
                    Color : <span className="text-red-700">{item?.color}</span>{" "}
                    | Brand :{" "}
                    <span className="text-red-700">{item?.brand}</span> | Price
                    :{" "}
                    <span className="text-red-700">{item?.discountPrice}</span>{" "}
                    | Discount :{" "}
                    <span className="text-red-700">
                      {item?.discountPercentage}%
                    </span>{" "}
                    | Rating :{" "}
                    <span className="text-green-700 mr-1">{item?.rating}</span>|{" "}
                    <span className="text-red-500">{item?.topLavelCategory}</span> |{" "}
                    <span className="text-red-500">{item?.secondLavelCategory}</span> |{" "}
                    <span className="text-red-500">{item?.thirdLavelCategory}</span>
                  </div>
                </div>
                <Link
                  to={`/admin/admineditproduct/${item?._id}`}
                  className="text-white btn rounded-md bg-green-700 font-semibold px-4 py-1 mt-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item?._id)}
                  className="text-white btn rounded-md bg-red-700 font-semibold px-4 py-1 mt-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllAdminProducts;
