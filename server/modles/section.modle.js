import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
   name:{type:String, required:true, unique:true},
   array:{type:[String]}
});

export const Section = mongoose.model("Section", sectionSchema);