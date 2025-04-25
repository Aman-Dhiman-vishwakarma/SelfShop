import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    lable:{type:String, required:true, unique: true},
    value:{type:String, required:true, unique: true}
})

export const Category = mongoose.model("Category", categorySchema);