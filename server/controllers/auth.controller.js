import { User } from "../modles/user.modle.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { titleCase } from "../utils/capitalFullname.js";
import { chatGptT, sendmail } from "../utils/sendMail.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (
      !fullname ||
      !email ||
      !password ||
      fullname === "" ||
      email === "" ||
      password === ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fiends are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "user allready exist with this information",
      });
    }
    const hashPassword = bcrypt.hashSync(password, 10);

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const newUser = new User({
      fullname: titleCase(fullname),
      email,
      password: hashPassword,
      verifyOtp:otp,
      verifyOtpExpireAt:  Date.now() + 5 * 60 * 1000
    });

    const mailOptions = {
      to: email,
      subject: "Email Verification OTP",
      // text: `Your Email Verification OTP is: ${otp}`,
      html: chatGptT.replace("{{otp}}", otp).replace("{{for}}", "Your Email Varification OTP is")
    };

    const responce = await sendmail(mailOptions);

    console.log(responce)

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, isAdmin:newUser.isAdmin }, process.env.JWT_SECRET);
    // res.status(200).json({ success: true, message: "Verify OTP send on youe email!" });
    res
    .status(200)
    .cookie("shelfshop_token", token, { httpOnly: true })
    .json({ success: true, message: "Verify OTP send on youe email!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.user.id, verifyOtp:req.body.otp});
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "This OTP has been expeired!",
      });
    }
    user.isVerified = true;
    user.verifyOtp = ""
    user.verifyOtpExpireAt = 0
    await user.save();
    const { password: pass, ...rest } = user._doc;
    res
    .status(200)
    .json({
      success: true,
      user: rest,
      message: "SignUp and Verify Successfull!",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist with this information",
      });
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid  information" });
    }

    const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = user._doc;

    // const mailOptions = {
    //   to: email,
    //   subject: "Welcome to SelfShop",
    //   text: `Welcome to SelfShop E-Commers. Your account has been created with email id: ${email}`,
    // };

    // await sendmail(mailOptions);
    res
      .status(200)
      .cookie("shelfshop_token", token, { httpOnly: true })
      .json({ success: true, user: rest, message: "Signin Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendOtpOnMail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist with this information",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000;

    await user.save();

    const mailOptions = {
      to: req.body.email,
      subject: "Reset Password OTP",
      // text: `Your reset password OTP is: ${otp}`,
      html: chatGptT.replace("{{otp}}", otp).replace("{{for}}", "Your Reset Password OTP is")
    };

    await sendmail(mailOptions);
    res
      .status(200)
      .json({
        success: true,
        email: req.body.email,
        message: "Reset OTP has been send on your Email",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, resetOtp: otp });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "This OTP has been expeired!",
      });
    }
    res
    .status(200)
    .json({
      success: true,
      message: "Fill new password hear!",
    });
  } catch (error) {}
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is reqiured",
      });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "uesr not exist",
      });
    }
     const hashPassword = bcrypt.hashSync(newPassword, 10)
     user.password = hashPassword;
     user.resetOtp = ""
     user.resetOtpExpireAt = 0
     await user.save();
    res
    .status(200)
    .json({
      success: true,
      message: "Password reset successfull!",
    });
  } catch (error) {}
};

export const signOut = async (req, res) => {
  try {
    res
      .clearCookie("shelfshop_token")
      .status(200)
      .json({ success: true, message: "User has been signed out" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
