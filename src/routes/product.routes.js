const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product.controller");
const Middleware = require("../common-middleware/index");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/add",
  Middleware.requireLogin,
  Middleware.adminMiddleware,
  upload.array("productPicture"),
  ProductController.addProduct
);
//router.get("/", CategoryController.getCategories);

module.exports = router;
