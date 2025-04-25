import { Slide } from "../modles/slides.modle.js";
import { uploadSlideImage } from "../utils/cloudnary.js";
import { v2 as cloudinary } from "cloudinary";

export const addSlide = async (req, res) => {
  if (!req.user.isAdmin) {
    return res
    .status(401)
    .json({ success: false, message: "You are not able to add slides" });
  }
  try {
    const  slideImg  = req.file;
    if (!slideImg) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    const response = await uploadSlideImage(slideImg.path);
    if (!response) {
      return res
      .status(400)
      .json({ success: false, message: "Somthing went wrong" });
    }
    const setImg = new Slide({
      image: response,
    });
    const slideImage = await setImg.save();
    res
      .status(200)
      .json({ success: true, slideImage, message: "Slide add successfuly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSlides = async (req, res) => {
  try {
    const slides = await Slide.find();
    if (!slides) {
      return res
        .status(400)
        .json({ success: false, message: "Slides not found" });
    }
    res
      .status(200)
      .json({ success: true, slides, message: "Slide found successfuly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSlide = async (req, res) => {
  if (!req.user.isAdmin) {
    return res
    .status(401)
    .json({ success: false, message: "You are not able to delete products" });
  }
  try {
    const slide = await Slide.findById(req.params.slideid);

    if (!slide) {
      res.status(400).json({
        success: false,
        message: "Slide not found",
      });
    }

    if (slide.image) {
      const imgId = slide.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    const deletedSlide = await Slide.findByIdAndDelete(req.params.slideid);
    res.status(200).json({
      success: true,
      deletedSlide,
      message: "Slide deleted successfuly",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
