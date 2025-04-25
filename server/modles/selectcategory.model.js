import mongoose from "mongoose";

const seletcategorySchema = new mongoose.Schema({
    category:{type:String, required:true},
    sections:{type:[mongoose.Schema.Types.Mixed]}
}, {timestamps:true});

export const SelectCategory = mongoose.model("SelectCategory", seletcategorySchema);
