import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import userRoute from "./routes/user.route.js";
import sectionRoute from "./routes/selectcategory.route.js";
import topCategoryRoute from "./routes/topCaregory.route.js";
import slideRoute from "./routes/slides.route.js";
import orderRoute from "./routes/order.route.js";
import brandRoute from "./routes/brand.route.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config({});
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Dtabase connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", userRoute);
app.use("/api/categorysection", sectionRoute);
app.use("/api/topcategory", topCategoryRoute);
app.use("/api/slides", slideRoute);
app.use("/api/order", orderRoute);
app.use("/api/brand", brandRoute);


app.listen(8080, () => {
  console.log("server is started");
});
