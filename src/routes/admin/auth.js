const express = require("express");
const { register, login, requireLogin } = require("../../controller/admin/auth");
const router = express.Router();

router.post("/admin/register", register);
router.post("/admin/login", login);

module.exports = router;
