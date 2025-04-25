import mongoose from "mongoose";

const slidesSchema = new mongoose.Schema({
  image: { type: mongoose.Schema.Types.Mixed, required: true, unique: true },
});

export const Slide = mongoose.model("Slide", slidesSchema);
