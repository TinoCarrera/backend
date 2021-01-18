const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/category.controller");

router.post("/category/create", CategoryController.addCategory);

module.exports = router;
