import { Brand } from "../modles/brand.modle.js";
import { Category } from "../modles/category.modle.js";
import { Product } from "../modles/product.modle.js";
import { Section } from "../modles/section.modle.js";
import { TopCategory } from "../modles/topCategory.modle.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

export const createProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res
      .status(401)
      .json({ success: false, message: "You are not able to add products" });
    }
    const images = req.files;

    if (!images || images?.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "Images is required" });
    }
    const response = await uploadOnCloudinary(images);

    if (!response || response?.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "Images is required" });
    }

    const product = new Product({...req.body, availableSizes: JSON.parse(req.body.availableSizes), images: response,});
    const doc = await product.save();

    if (req.body.brand != "") {
    const brand = await Brand.findOne({lable: req.body.brand});
      if (!brand) {
        const newBrand = await Brand.create({lable:req.body.brand, value:req.body.brand.toLowerCase()})
      }
    }

    let newCategory = await TopCategory.findOne({
      category: doc.topLavelCategory,
    });
    let newSection = await Section.findOne({ name: doc.secondLavelCategory });

    if (!newCategory) {
      newCategory = await TopCategory.create({
        category: doc.topLavelCategory,
      });
    }

    if (!newSection) {
      newSection = await Section.create({ name: doc.secondLavelCategory });
      newSection.array.push(doc.thirdLavelCategory);
      newCategory.sections.push(newSection._id);
    } else {
      if (
        newSection.array.findIndex((item) => item === doc.thirdLavelCategory) <
        0
      ) {
        newSection.array.push(doc.thirdLavelCategory);
      }
    }

    await newCategory.save();
    await newSection.save();

    res
      .status(200)
      .json({ success: true, doc, message: "product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const shortDirection = req.query.order === "asce" ? 1 : -1;

    const queryObj = {
      ...(req.query.category && {
        category: { $in: req.query.category.split(",") },
      }),
      ...(req.query.brand && { brand: { $in: req.query.brand.split(",") } }),
      ...(req.query.color && { color: { $in: req.query.color.split(",") } }),
      ...(req.query.gender && {
        topLavelCategory: { $in: req.query.gender.split(",") },
      }),
      ...(req.query.topLavelCategory && {
        topLavelCategory: req.query.topLavelCategory,
      }),

      ...(req.query.secondLavelCategory && {
        secondLavelCategory: req.query.secondLavelCategory,
      }),
      ...(req.query.thirdLavelCategory && {
        thirdLavelCategory: req.query.thirdLavelCategory,
      }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const products = await Product.find(queryObj)
      .sort({ discountPrice: shortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalProducts = await Product.find(queryObj).countDocuments();

    res.status(200).json({ success: true, products, totalProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { description: { $regex: req.query.searchTerm, $options: "i" } },
      ],
    })
      .select("title")
      .skip(0)
      .limit(6);

    res.status(200).json({ success: true, products });
  } catch (error) {}
};

export const productById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Ptoduct not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchSimilerProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Ptoduct not found" });
    }

    const similerProducts = await Product.find({
      _id: { $ne: product._id },
      thirdLavelCategory: product.thirdLavelCategory,
    });
    if (!similerProducts) {
      return res
        .status(400)
        .json({ success: false, message: "Ptoducts not found" });
    }
    res.status(200).json({ success: true, similerProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateproduct = async (req, res) => {
  if (!req.user.isAdmin) {
    return res
    .status(401)
    .json({ success: false, message: "You are not able to update products" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedProduct,
      message: "Product Updated Successfuly",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResentProduct = async (req, res) => {
  try {
    const resentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .skip(0);
    if (!resentProducts) {
      return res
        .status(400)
        .json({ success: false, message: "Ptoducts not found" });
    }
    res.status(200).json({ success: true, resentProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBestsellerProduct = async (req, res) => {
  try {
    const bestsellerProducts = await Product.find({ bestSeller: true })
      .limit(5)
      .skip(0);
    if (!bestsellerProducts) {
      return res
        .status(400)
        .json({ success: false, message: "Ptoducts not found" });
    }
    res.status(200).json({ success: true, bestsellerProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res
      .status(401)
      .json({ success: false, message: "You are not able to delete products" });
    }

    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Somthing Wrong" });
    }
    res.status(200).json({
      success: true,
      deletedProduct,
      message: "Product Deleted Successfuly",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
