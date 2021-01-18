const express = require("express");
const UserController = require("../controller/user.controller");
const UserValidator = require("../validators/user.validator");
const router = express.Router();

router.post(
  "/register",
  UserValidator.validateRegister,
  UserValidator.isValidated,
  UserController.userRegister
);
router.post(
  "/login",
  UserValidator.validateLogin,
  UserValidator.isValidated,
  UserController.userLogin
);

// Admin
router.post(
  "/admin/register",
  UserValidator.validateRegister,
  UserValidator.isValidated,
  UserController.adminRegister
);
router.post(
  "/admin/login",
  UserValidator.validateLogin,
  UserValidator.isValidated,
  UserController.adminLogin
);

module.exports = router;
