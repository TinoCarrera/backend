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
    res
      .status(201)
      .json({ data: saveCategory, message: "Categoria creada correctamente" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    if (categories.length == 0) {
      res.status(400).json({
        message: "Ninguna catogoria encontrada",
      });
    } else {
      res
        .status(200)
        .json({ data: categories, message: "Categorias encontradas" });
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: error.message });
  }
};
