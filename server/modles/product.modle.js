import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  rating: { type: String, default: 0 },
  stock: { type: Number, required: true },
  brand: { type: String },
  category: { type: String },
  topLavelCategory: { type: String, required: true },
  secondLavelCategory: { type: String, required: true },
  thirdLavelCategory: { type: String, required: true },
  color: { type: String, default: "" },
  sku:{type:String, unique:true, index: true, required: true},
  size:{type:String},
  availableSizes: {type:[mongoose.Schema.Types.Mixed]},
  thumbnail:{ type: String },
  images: { type: [String], required: true },
  bestSeller: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
}, {timestamps:true});

export const Product = mongoose.model("Product", productSchema);
