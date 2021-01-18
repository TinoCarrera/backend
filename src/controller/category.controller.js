const Category = require("../models/category.model");
const slugify = require("slugify");

exports.addCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true }),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const newCategory = new Category(categoryObj);
    const saveCategory = await newCategory.save();
    console.log(saveCategory);
    res.status(201).json({ data: saveCategory, message: "Categoria creada" })
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: error.message });
  }
};
