import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: { type: [mongoose.Schema.Types.Mixed], required: true},
    totalamount: { type: Number },
    totalitems: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "pending" },
    selectedaddress: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
