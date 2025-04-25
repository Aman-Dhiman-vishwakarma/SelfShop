import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';
import "../App.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ResentProducts from "../components/ResentProducts";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSlides } from "../redux/slideSlice";
import Policy from "../components/Policy";
import BestSeller from "../components/BestSeller";
import PolicySecond from "../components/PolicySecond";
import { setOrderSummeryToN, setTotleAmountItems } from "../redux/orderSlice";
import { setChooseAddress } from "../redux/addressSlice";
import { setCheckMail } from "../redux/authSlice";

const silderImg = [
  {
    category: "women",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/14d5f677630559.5c8d3005a7c9c.png",
    link: "/allproducts",
  },
  {
    category: "women",
    image: "https://pixosoft.com/images/sliders/pixosoft-slider-3.jpg",
    link: "/allproducts",
  },
  {
    category: "women",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/30db5277630559.5c8d3005a8572.png",
    link: "/allproducts",
  },
  {
    category: "women",
    image:
      "https://4.imimg.com/data4/TX/JE/GLADMIN-30141012/wp-content-uploads-2016-05-indiabbazaar-e-commerce.jpg",
    link: "/allproducts",
  },
];

const Home = () => {
  const { slideImages } = useSelector((state) => state.slides);
  const [mainSlideLoding, setMainSlideLoding] = useState(false);
  const dispatch = useDispatch();

  const getSlides = async () => {
    try {
      setMainSlideLoding(true);
      const res = await axios.get("/api/slides/getallslide");
      if (res?.data?.success) {
        setMainSlideLoding(false);
        dispatch(setSlides(res.data.slides));
      }
    } catch (error) {
      setMainSlideLoding(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSlides();
    dispatch(setOrderSummeryToN());
    dispatch(setTotleAmountItems({ totalamount: 0, totalitems: 0 }));
    dispatch(setChooseAddress(null));
    dispatch(setCheckMail(null));
  }, []);

  // if (mainSlideLoding) {
  //   return (
  //     <div className="w-[100vw] h-[70vh] flex justify-center items-center text-lg font-semibold">
  //       <span className="loading loading-spinner text-secondary loading-xl"></span>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="xl:h-[65vh] xl:w-[100%] p-4">
        {!mainSlideLoding ? (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {slideImages &&
              slideImages?.map((itemImg, index) => (
                <SwiperSlide key={index}>
                  <Link to={itemImg.link}>
                    <img src={itemImg.image} alt="image" />
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div className=" skeleton h-full w-full"></div>
        )}
      </div>
      <Policy />
      <ResentProducts />
      <div className="h-auto mt-4 p-4">
        <img
          className="h-96 mx-auto"
          src="https://img.pikbest.com/origin/10/01/82/867pIkbEsTAIq.png!w700wp"
          alt=""
        />
      </div>
      <PolicySecond />
      <BestSeller />
      <div className="h-auto mt-4 p-4">
        <img
          className="h-96 mx-auto"
          src="https://static.vecteezy.com/system/resources/previews/002/294/833/non_2x/e-commerce-promotion-web-banner-design-free-vector.jpg"
          alt=""
        />
      </div>
    </>
  );
};

export default Home;
