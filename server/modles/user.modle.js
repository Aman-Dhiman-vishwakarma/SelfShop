import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address:{type:[mongoose.Schema.Types.Mixed]},
  isAdmin: { type: Boolean, default:false},
  host:{ type: Boolean, default:false},
  isVerified: { type: Boolean, default:false},
  verifyOtp: { type: String, default:""},
  verifyOtpExpireAt: { type: Number, default:0},
  resetOtp: { type: String, default:""},
  resetOtpExpireAt: { type: Number, default:0},
});

export const User = mongoose.model("User", userSchema);
