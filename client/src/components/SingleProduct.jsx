import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SingleProduct = ({ item }) => {
  return (
    <Link
      to={`/productdetail/${item?._id}`}
      className="relative h-[28rem] w-[22rem] md:h-[24rem] md:w-[14rem] pt-2 cursor-pointer hover:border-[1px] border-gray-100 shadow-md "
    >
      {item?.bestSeller && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium rounded-md p-1">Bestseller</span>}
      <div className="h-[68%] px-2 w-[100%]">
        <img
          className="h-full w-full object-contain"
          src={item?.images[0] || item?.thumbnail}
          alt="product image"
        />
      </div>
      <div className="pt-2 px-2">
        <div className="flex justify-between">
          <span className="text-lg font-semibold line-clamp-1">
            {item?.title}
          </span>
          <span className="text-green-700">
            {item?.rating !== 0 ? (
              <span className="flex items-center gap-1">
                {item?.rating} <FaStar />
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
        <p className="text-sm text-red-400 font-medium text-left line-clamp-1">
          {item?.description}
        </p>
        <span className="font-semibold mt-1 text-lg flex gap-4 items-center">
          <span className="text-lg">₹ {item?.discountPrice}</span>{" "}
          {/* <small className="text-gray-500 line-through">Rs.{item?.price}</small> */}
          <small className="text-red-500">
            ({item?.discountPercentage}% OFF)
          </small>
          
        </span>
        <span className="text-green-800 text-xs bg-green-50 rounded-full px-2 py-1 font-semibold shadow-md">Free Delevry</span>
      </div>
    </Link>
  );
};

export default SingleProduct;
