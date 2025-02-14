const Category = require("../models/category");

const addCategory = async (req, res) => {
  try {
    const { firstName, description } = req.body;
    const category = await Category.findOne({ firstName });

    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({
      firstName,
      description,
    });
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const allCategories = async (req, res) => {
  try {
    const category = await Category.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const edit = req.body;
    const category = await Category.findByIdAndUpdate(id, edit, {
      new: true,
    });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { addCategory, allCategories, editCategory, deleteCategory };
