const Product = require("../models/product.model");
const shortid = require("shortid");
const slugify = require("slugify");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, category } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }
    const newProduct = new Product({
      name,
      slug: slugify(name, { lower: true }),
      price,
      quantity,
      description,
      productPictures,
      category,
      createdBy: req.user._id,
    });
    const saveProduct = await newProduct.save();
    res
      .status(201)
      .json({ data: saveProduct, message: "Producto creado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
