import { Brand } from "../modles/brand.modle.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands) {
      res.status(400).json({
        success: false,
        message: "Brands not found",
      });
    }
    res.status(200).json({ success: true, brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
