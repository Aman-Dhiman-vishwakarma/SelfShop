import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.shelfshop_token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized user" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Unauthorized user" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
