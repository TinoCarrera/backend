const Category = require("../models/category.model");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id)
    });
  }
  return categoryList;
}

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
      const categoryList = createCategories(categories);
      res
        .status(200)
        .json({ data: categoryList, message: "Categorias encontradas" });
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: error.message });
  }
};
