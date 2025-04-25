import { Section } from "../modles/section.modle.js";
import { TopCategory } from "../modles/topCategory.modle.js";

export const getTopCategorys = async (req, res) => {
  try {
    const allTopCategorys = await TopCategory.find().populate("sections");
    res.status(200).json({
      success: true,
      allTopCategorys,
      message: "TopCategorys fetch successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTopCategorys = async (req, res) => {
  try {
    const topCategory = await TopCategory.findByIdAndUpdate(
      req.params.topCategoryId,
      { $set: req.body },
      { new: true }
    ).populate("sections");

    res.status(200).json({
      success: true,
      topCategory,
      message: "TopCategorys Updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const newSection = await Section.findByIdAndUpdate(
      req.params.sectionId,
      { $set: req.body },
      { new: true }
    );
   
    res.status(200).json({
      success: true,
      newSection,
      message: "Section Updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTopCategorys = async (req, res) => {
  try {
    const topCategory = await TopCategory.findById(req.params.topCategoryId);
    const deleteSections = await Section.deleteMany({
      _id: { $in: topCategory.sections },
    });
    const deleteCategory = await TopCategory.findByIdAndDelete(
      req.params.topCategoryId
    );
    res.status(200).json({
      success: true,
      deleteCategory,
      message: "TopCategorys deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    let topCategory = await TopCategory.findById(req.params.topCategoryId);
    const deletedSection = await Section.findByIdAndDelete(
      req.params.sectionId
    );
    const newArray = topCategory.sections.filter(
      (id) => id.toString() !== deletedSection._id.toString()
    );
    topCategory.sections = newArray;
    const doc = await topCategory.save();
    const newTopCategory = await doc.populate("sections");
    res.status(200).json({
      success: true,
      newTopCategory,
      message: "Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
