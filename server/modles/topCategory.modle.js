import mongoose from "mongoose";

const topCategorySchema = new mongoose.Schema({
    category:{type:String, required:true, unique:true},
    sections:{type:[mongoose.Schema.Types.ObjectId], ref:"Section"}
});

export const TopCategory = mongoose.model("TopCategory", topCategorySchema);