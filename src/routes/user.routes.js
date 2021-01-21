const express = require("express");
const UserController = require("../controller/user.controller");
const UserValidator = require("../validators/user.validator");
const router = express.Router();

router.post(
  "/signup",
  UserValidator.validateSignup,
  UserValidator.isValidated,
  UserController.userSignup
);
router.post(
  "/login",
  UserValidator.validateLogin,
  UserValidator.isValidated,
  UserController.userLogin
);

// Admin
router.post(
  "/admin/signup",
  UserValidator.validateSignup,
  UserValidator.isValidated,
  UserController.adminSignup
);
router.post(
  "/admin/login",
  UserValidator.validateLogin,
  UserValidator.isValidated,
  UserController.adminLogin
);

module.exports = router;
