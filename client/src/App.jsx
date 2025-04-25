import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AllProducts from "./pages/AllProducts";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import axios from "axios";
import { useEffect } from "react";
import { setAddToCart } from "./redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/authSlice";
import OrderSummery from "./pages/OrderSummery";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import HeaderBottom from "./components/HeaderBottom";
import AdiminPage from "./pages/AdiminPage";
import AddProducts from "./components/AddProducts";
import AddSlides from "./components/AddSlides";
import AllAdminProducts from "./components/AllAdminProducts";
import AllAdminOrders from "./components/AllAdminOrders";
import AdminEditProduct from "./components/AdminEditProduct";
import AllCategories from "./components/AllCategories";
import OrderSucessPage from "./pages/OrderSucessPage";
import AdminOrderDetail from "./components/AdminOrderDetail";
import VerifyOtp from "./components/VerifyOtp";
import ResetOtpInput from "./components/ResetOtpInput";
import ForgotPassword from "./components/ForgotPassword";
import NewPasswordForm from "./components/NewPasswordForm";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AboutUs from "./pages/AboutUs";
import AllUsers from "./components/AdminAllUsers";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);

  const getCartProducts = async () => {
    try {
      const res = await axios.get("/api/cart/fetchcartproducts");
      if (res.data.success) {
        dispatch(setAddToCart(res.data.cartProducts));
      }
    } catch (error) {
      if (error?.response?.data?.message === "Unauthorized user") {
        dispatch(setCurrentUser(null));
        dispatch(setAddToCart([]));
      }
    }
  };

  useEffect(() => {
    getCartProducts();
   
  }, [currentUser]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <HeaderBottom />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allproducts/:top/:second" element={<AllProducts />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/checkout" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
          <Route path="/productdetail/:productid" element={<ProductDetail />} />
          <Route path="/ordersummery" element={<ProtectedRoutes><OrderSummery /></ProtectedRoutes>} />
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="/orders" element={<Order />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminProtectedRoutes><AdiminPage /></AdminProtectedRoutes>}>
            <Route path="/admin" element={<AddProducts />} />
            <Route path="/admin/addslides" element={<AddSlides />} />
            <Route path="/admin/allproducts" element={<AllAdminProducts />} />
            <Route path="/admin/allorders" element={<AllAdminOrders />} />
           {currentUser?.host && <Route path="/admin/allusers" element={<AllUsers />} />}
            <Route
              path="/admin/admineditproduct/:productId"
              element={<AdminEditProduct />}
            />
            <Route
              path="/admin/orderdetail/:orderId"
              element={<AdminOrderDetail />}
            />
            <Route path="/admin/allcategories" element={<AllCategories />} />
          </Route>
          <Route path="/ordersuccess/:orderId" element={<ProtectedRoutes><OrderSucessPage /></ProtectedRoutes>} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/resetotpinput" element={<ResetOtpInput />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/newpasswordform" element={<NewPasswordForm />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
