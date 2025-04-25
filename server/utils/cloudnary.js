import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import pLimit from "p-limit";

dotenv.config();

const limit = pLimit(4);

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFileArray) => {
  try {
    if (!localFileArray) {
      return null;
    }
    //upload the file on cloudinary
    const imagesToUpload = localFileArray.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image.path);
        return result;
      });
    });
    let uploads = await Promise.all(imagesToUpload);
    const newArr = uploads?.map((obj) => obj.secure_url);

    if (uploads?.length !== 0) {
      localFileArray?.forEach((img) => fs.unlinkSync(img.path));
    }

    return newArr;
  } catch (error) {
    localFileArray?.forEach((img) => fs.unlinkSync(img.path));
    console.log(error);
    return null;
  }
};

const uploadSlideImage = async (slidePath) => {
  try {
    if (!slidePath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(slidePath);
    if (result.secure_url) {
      fs.unlinkSync(slidePath)
    }
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(slidePath)
    return null;
  }
}

export { uploadOnCloudinary, uploadSlideImage };
