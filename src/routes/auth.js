const express = require("express");
const { register, login, requireLogin } = require("../controller/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.post("/profile", requireLogin, (req, res) => {
//   res.status(200).json({
//     user: "profile",
//   });
// });

module.exports = router;
