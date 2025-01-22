const Category = require("../models/category")

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findOne({ name });

    if (category) {
      return res.status(400).json({ mesage: "Category already exists" });
    }

    const newCategory = new Category({
      name,
      description,
    });
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ "message": error });
  }
}


const allCategories = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ "message": error });
  }
}


const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const edit = req.body;
    const category = await Category.findByIdAndUpdate(id, edit, {
      new: true,
    });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ "message": error });
  }
}


const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ "message": error });
    }
  }

  module.exports = {addCategory, allCategories, editCategory, deleteCategory}