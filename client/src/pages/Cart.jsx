import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartProduct, setAddToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { setOrderSummery, setTotleAmountItems } from "../redux/orderSlice";
import { setvalues } from "../redux/sectionFilterSlice";

const Cart = () => {
  const [dIndex, setDIndex] = useState(-1);
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const totalamount = cart?.reduce(
    (amount, product) =>
      product.productId.discountPrice * product.quantity + amount,
    0
  );
  const totalitems = cart?.reduce(
    (items, product) => product.quantity + items,
    0
  );
  const [loading, setLoading] = useState(false);

  // const getCartProducts = async () => {
  //   try {
  //     const res = await axios.get("/api/cart/fetchcartproducts");
  //     if (res.data.success) {
  //       dispatch(setAddToCart(res.data.cartProducts));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(setOrderSummery(cart));
    dispatch(setTotleAmountItems({ totalamount, totalitems }));
  }, [cart]);

  const deleteCartItem = async (cartproductid) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `/api/cart/deletecartitem/${cartproductid}`
      );
      if (res.data.success) {
        dispatch(deleteCartProduct(res?.data?.deletedCartProduct?._id));
        toast.success(res.data.message);
        setLoading(false);
        setDIndex(-1);
      }
    } catch (error) {
      setLoading(false);
      setDIndex(-1);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white xl:px-28">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-semibold">Shopping Beg</h1>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart?.length != 0 ? (
                cart?.map((product, index) => (
                  <li key={product?._id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product?.productId?.title}
                        src={
                          product?.productId?.thumbnail ||
                          product?.productId?.images[0]
                        }
                        className="size-full object-contain"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                          <h3>
                            <a href={product?.href}>{product?.productId?.title}</a>
                          </h3>
                          <p className="ml-4">
                            Rs.{product?.productId?.discountPrice}
                          </p>
                        </div>
                        <div className="flex gap-4 mt-1">
                          <p className="mt-1 text-sm text-gray-700 font-semibold">
                            Color: {product?.productId?.color}
                          </p>
                          {product?.productSizeOrConfigretion && (
                            <p className="mt-1 text-sm text-gray-700 font-semibold">
                              <span className="text-gray-400 mr-2">|</span>
                              Size: {product?.productSizeOrConfigretion}{" "}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-700 font-semibold">
                          Qty: {product?.quantity}
                        </p>

                        <div className="flex">
                          <button
                            onClick={() => {
                              deleteCartItem(product?._id), setDIndex(index);
                            }}
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500 hover:bg-red-100 rounded-md p-1"
                          >
                            {loading && dIndex == index ? (
                              <span className="loading loading-spinner text-secondary loading-sm"></span>
                            ) : (
                              "Remove"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="p-4 w-full flex items-center flex-col gap-4">
                  <div className="h-80 w-80">
                    <img
                      src="https://img.freepik.com/free-vector/empty-shopping-bag-white-advertising-branding_1284-48173.jpg"
                      alt=""
                    />
                  </div>
                  <div className="font-semibold text-3xl">
                    Your Shopping Bag is{" "}
                    <span className="text-red-500">Empty!</span>
                  </div>
                  <p>
                    Must add items on the beg before you proceed to checkout.
                  </p>
                  <Link
                    to="/allproducts"
                    onClick={() => {
                      dispatch(
                        setvalues({ top: null, second: null, third: null })
                      );
                    }}
                    className="px-6 py-3 rounded-3xl bg-red-500 font-semibold text-white flex gap-2 items-center"
                  >
                    <HiOutlineShoppingBag size="20" /> Return to Shope
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      {cart?.length != 0 && (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>Rs.{totalamount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total items in beg</p>
            <p>{totalitems} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              onClick={() => {
                dispatch(setOrderSummery(cart)),
                  dispatch(setTotleAmountItems({ totalamount, totalitems }));
              }}
              className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-red-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to="/"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
