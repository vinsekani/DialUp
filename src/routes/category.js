const express = require("express");
const { Router } = express;
const router = Router();
const Category  = require("../models/category");
const {addCategory} = require("../controllers/category")
const {allCategories} = require("../controllers/category")
const {editCategory} = require("../controllers/category")
const {deleteCategory} = require("../controllers/category")


router.post("/newcategory", addCategory);

router.get("/", allCategories);

router.patch("/:id", editCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

