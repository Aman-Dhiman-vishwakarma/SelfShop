import { SelectCategory } from "../modles/selectcategory.model.js";


export const getCategorySection = async (req, res) => {
    try {
        const allSections = await SelectCategory.find();
        return res
      .status(201)
      .json({
        success: true,
        allSections,
        message: "Section fetch Successfully",
      });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}



export const createCategorySections = async (req, res) => {
  try {
    const { category, sections } = req.body;
    if (!category || !sections) {
      return res
        .status(400)
        .json({ success: false, message: "All fiends are required" });
    }

    const newSection = new SelectCategory({
      category,
      sections,
    });
    const aadedSection = await newSection.save();
    return res
      .status(201)
      .json({
        success: true,
        aadedSection,
        message: "New Section Added Successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategorySections = async (req, res) => {
  try {
    if (!req.params.sectionId) {
        return res
        .status(400)
        .json({ success: false, message: "Somthing wrong" })
    }
    const updatedSection = await SelectCategory.findByIdAndUpdate(req.params.sectionId, {$set: req.body}, {new:true});
    return res
      .status(201)
      .json({
        success: true,
        updatedSection,
        message: "Section updeted Successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
