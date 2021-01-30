const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const Middleware = require("../middleware/index");

router.post(
  "/add",
  Middleware.requireLogin,
  Middleware.adminMiddleware,
  CategoryController.addCategory
);
router.get("/", CategoryController.getCategories);

module.exports = router;
