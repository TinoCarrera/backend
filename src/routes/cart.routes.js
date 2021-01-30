const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const Middleware = require("../middleware/index");

router.post(
  "/add",
  Middleware.requireLogin,
  Middleware.userMiddleware,
  CartController.addItemToCart
);

module.exports = router;
