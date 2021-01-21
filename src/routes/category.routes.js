const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/category.controller");
const Middleware = require("../common-middleware/index");

router.post(
  "/add",
  Middleware.requireLogin,
  Middleware.adminMiddleware,
  CategoryController.addCategory
);
router.get("/", CategoryController.getCategories);

module.exports = router;
