import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import { FaStar } from "react-icons/fa";
import Quantity from "../components/Quantity";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addInCart } from "../redux/cartSlice";
import { resetQuantity, sizeSelect } from "../redux/quantitySlice";
import {
  setSingleOrderSummery,
  setTotleAmountItems,
} from "../redux/orderSlice";
import StarRating from "../components/StarRating";
import SkeletonDetailProduct from "../components/SkeletonDetailProduct";

const ProductDetail = () => {
  const scroll = useRef();
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [toggleImage, setToggleImage] = useState(null);
  const [reletedProduct, setReletedProduct] = useState(null);
  const { currentUser } = useSelector((store) => store.auth);
  const { value, selectedSize } = useSelector((store) => store.quantity);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const naviget = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sProductLoading, setSProductLoading] = useState(false);
  const [similerProductLoading, setSimilerProductLoading] = useState(false);

  const totalamount = singleProduct.discountPrice * value;
  const totalitems = value;

  const getProductDetail = async () => {
    try {
      setSProductLoading(true);
      const res = await axios.get(
        `/api/product/productbyid/${params?.productid}`
      );
      if (res.data.success) {
        setSProductLoading(false);
        setSingleProduct(res.data.product);
        setToggleImage(res.data.product?.images[0] || res.data.product?.thumbnail);
      }
    } catch (error) {
      setSProductLoading(false);
    }
  };
  useEffect(() => {
    getProductDetail();
    scroll.current?.scrollIntoView();

    return () => {
      dispatch(sizeSelect(null));
      dispatch(resetQuantity());
    };
  }, [params.productid]);

  const handleImage = (imageIndex) => {
    setToggleImage(singleProduct?.images[imageIndex]);
  };

  const handleSize = (size) => {
    setSize(size.name);
    dispatch(sizeSelect(size.name));
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.error("Please SignIn First");
      naviget("/signin");
      return;
    }
    if (singleProduct?.availableSizes?.length !== 0 && !size) {
      toast.error("Select some size");
      return;
    }
    const buyProduct = {
      ...singleProduct,
      quantity: value,
      productSizeOrConfigretion: size,
    };
    dispatch(setSingleOrderSummery({ singleProduct, value, size }));
    dispatch(setTotleAmountItems({ totalamount, totalitems }));
    naviget("/checkout");
  };

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error("Please SignIn First");
      naviget("/signin");
      return;
    }
    if (singleProduct?.availableSizes?.length !== 0 && !size) {
      toast.error("Select some size");
      return;
    }
    const isDuplicate = cart?.some(item => 
      item.productId._id === singleProduct?._id && item.productSizeOrConfigretion === size
    );
   
    if (!isDuplicate) {
      try {
        setLoading(true);
        const res = await axios.post(
          `/api/cart/addtocart/${singleProduct?._id}`,
          { quantity: value, productSizeOrConfigretion: size },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(addInCart(res.data.addCart));
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.message === "Unauthorized user") {
          naviget("/signin");
        }
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.info("Products Allready Exist With this Size in The Beg");
    }
  };

  const getReletedProduct = async () => {
    try {
      setSimilerProductLoading(true);
      const res = await axios.get(
        `/api/product/getsimilerproducts/${singleProduct?._id}`
      );
      if (res.data.success) {
        setSimilerProductLoading(false);
        setReletedProduct(res.data.similerProducts);
      }
    } catch (error) {
      setSimilerProductLoading(false);
    }
  };

  useEffect(() => {
    if (singleProduct.length !== 0) {
      getReletedProduct();
    }
  }, [singleProduct]);

  if (sProductLoading) {
    return (
      <div className=" h-[100vh] flex justify-center  text-lg font-semibold">
        {/* <span className="loading loading-spinner mr-2 text-secondary loading-xl"></span> */}
        <SkeletonDetailProduct />
      </div>
    );
  }
  return (
    <>
      <div
        ref={scroll}
        className="mx-auto flex flex-col lg:flex-row xl:w-[90%] 2xl:w-[80%] my-10"
      >
        <div className="flex gap-2">
          <div className="w-20 md:w-32 lg:w-32 flex flex-col gap-2 h-[20rem] md:h-[30rem] lg:h-[40rem]">
            {singleProduct?.images !== 0 &&
              singleProduct?.images?.map((image, index) => (
                <div key={index} className="w-[full] h-[19%] cursor-pointer">
                  <img
                    onClick={() => handleImage(index)}
                    className="h-[90%] w-[90%] object-contain"
                    src={image}
                    alt=""
                  />
                </div>
              ))}
          </div>
          <div className=" lg:w-[35rem] h-[40rem]">
            <img
              className="h-[90%] w-[90%] object-contain"
              src={toggleImage}
              alt="product image"
            />
          </div>
        </div>

        <div className=" flex-1  flex flex-col gap-2 px-10">
          <span className="text-3xl font-semibold">{singleProduct?.title}</span>
          <p className="text-lg text-gray-600 font-semibold ">
            {singleProduct?.description}
          </p>
          <span className="text-lg text-green-700 flex font-semibold gap-1 items-center">
            <span className="text-xl"> {singleProduct?.rating}</span>
            {<StarRating rating={singleProduct?.rating} />}
          </span>
          <div className="flex gap-10 items-end">
            <h1 className="text-3xl font-semibold">
              Price: ₹ {singleProduct?.discountPrice}
            </h1>{" "}
            <span className=" text-md bg-green-50 rounded-md font-semibold p-1 shadow-md">
              - {singleProduct?.discountPercentage}%off
            </span>
          </div>

          {singleProduct?.availableSizes?.length !== 0 && (
            <div className=" shadow-md rounded-md p-2">
              <h1 className="text-xl font-semibold">Sizes</h1>
              <div className="flex items-center gap-4 mt-2 flex-wrap w-72">
                {singleProduct?.availableSizes?.map((size, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      size?.stockAvailable != 0 ? handleSize(size) : " ";
                    }}
                    className={`py-1 ${
                      size?.stockAvailable != 0 && "cursor-pointer h-12"
                    } ${
                      selectedSize === size?.name && "border-2 border-red-700"
                    } px-4 flex flex-col items-center list-none rounded-md shadow-md border-2 border-gray-100 font-semibold bg-white`}
                  >
                    {size?.name}
                    {size?.stockAvailable == 0 ? (
                      <span className="text-xs text-red-700">Unavailable</span>
                    ) : size?.stockAvailable < 10 ? (
                      <span className="text-xs text-red-700">
                        {size?.stockAvailable} Left
                      </span>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 font-semibold shadow-md rounded-md py-2 px-2">
            Quantity:
            <Quantity />
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="text-center w-full p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400"
          >
            {!loading ? (
              "Add To Beg"
            ) : (
              <span className="loading loading-spinner text-white loading-sm"></span>
            )}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="text-center w-full p-2 rounded-md border-[2px] border-red-500 font-semibold text-red-500 hover:bg-red-100"
          >
            Buy Now
          </button>
          <div className="p-2 shadow-md">
            <p className="font-semibold text-xl">More Product Detail</p>
            {singleProduct?.color && (
              <div className="p-1">
                <span className="font-semibold">Color</span> :{" "}
                <span className="font-medium text-red-600">
                  {singleProduct?.color}
                </span>
              </div>
            )}
            {singleProduct?.brand && (
              <div className="p-1">
                <span className="font-semibold">Brand</span> :{" "}
                <span className="font-medium text-red-600">
                  {singleProduct?.brand}
                </span>
              </div>
            )}
            <div className="py-1 px-2 bg-green-50 shadow-md rounded-md">
              <span className="font-semibold">
                {singleProduct?.stock > 0 ? (
                  <span className="text-lg text-green-700 font-semibold">
                    Instock
                  </span>
                ) : (
                  <span className="text-lg text-red-700 font-semibold">
                    Out of stock
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold xl:w-[85%] mt-10 pt-2 mx-auto border-t-[1px] border-gray-200">
        SIMILAR PRODUCTS:
      </h1>
      {!similerProductLoading ? (
        <div className=" xl:w-[85%] mx-auto grid grid-cols-5 justify-items-center gap-10 pt-6">
          {reletedProduct?.length !== 0 ? (
            reletedProduct?.map((item, index) => (
              <SingleProduct key={index} item={item} />
            ))
          ) : (
            <div className="text-lg col-span-5 flex justify-center p-20 font-semibold">
              Products Not Found!
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center p-20">
          {" "}
          <span className="loading loading-spinner mr-2 text-secondary loading-xl"></span>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
