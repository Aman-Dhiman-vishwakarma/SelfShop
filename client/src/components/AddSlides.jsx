import axios from "axios";
import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSingleSlide } from "../redux/slideSlice";
import { useNavigate } from "react-router-dom";

const AddSlides = () => {
  const [slideImage, setSlideImage] = useState(null);
  const { slideImages } = useSelector((state) => state.slides);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const naviget = useNavigate();
  const filesRef = useRef();

  const handleSlide = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("slideImage", slideImage);
    try {
      setLoading(true)
      const res = await axios.post("/api/slides/addslide", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setLoading(false)
        toast.success(res.data.message);
        dispatch(setSingleSlide(res.data.slideImage))
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message);
      console.log(error)
    }
  };

  const deleteSlide = async (slideId) => {
    try {
      const res = await axios.delete(`/api/slides/deleteslide/${slideId}`);
      if (res.data.success) {
        toast.success(res.data.message);
        naviget("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="w-[90%] mx-auto p-8 shadow-md">
        {slideImage && (
          <img
            className="h-72"
            src={slideImage ? URL.createObjectURL(slideImage) : null}
            alt=""
          />
        )}
        <form onSubmit={handleSlide} className="flex gap-10 items-center mt-5">
          <span
            onClick={() => filesRef.current.click()}
            className="bg-white px-3 py-1 rounded-md cursor-pointer shadow-md border-[1px]"
          >
            <FaCloudUploadAlt size="38" color="red" />
          </span>
          <input
            ref={filesRef}
            onChange={(e) => setSlideImage(e.target.files[0])}
            type="file"
            accept="image/png, image/jpeg"
            hidden
          />
          {!loading ? <button
            className="text-white font-semibold p-2 bg-red-600 w-44 rounded-md"
            type="submit"
          >
            Add slide
          </button> : <button
            className="text-white font-semibold p-2 bg-red-600 w-44 rounded-md"
            type="button"
          >
            Loading...
          </button>}
          
        </form>
      </div>
      <div className="flex flex-col gap-4 items-center mt-10">
        {slideImages &&
          slideImages.map((slide, index) => (
            <div key={index} className=" relative">
              <img className="h-72" src={slide.image} alt="" />{" "}
              <button
              onClick={() => deleteSlide(slide._id)}
                className="btn absolute top-0 right-0 bg-white font-semibold text-red-600 px-4 py-[2px] rounded-md"
                type="button"
              >
                Delete Slide
              </button>{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddSlides;
