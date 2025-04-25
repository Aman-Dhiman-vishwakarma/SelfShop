import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    lable:{type:String, required:true, unique: true},
    value:{type:String, required:true, unique: true},
})

export const Brand = mongoose.model("Brand", brandSchema);