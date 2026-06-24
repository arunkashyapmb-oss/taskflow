const express = require("express");

const router = express.Router();

const {
  createUser,
  getAllUsers,
  deleteUser,
  getProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Logged In User Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// Get All Users (Admin Only)
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// Create User (Admin Only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createUser
);

// Delete User
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);



module.exports = router;