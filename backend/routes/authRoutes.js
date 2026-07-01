const express = require("express");
const router = express.Router();

const { register, login, refreshAccessToken, logout, forgotPassword , resetPassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

module.exports = router;