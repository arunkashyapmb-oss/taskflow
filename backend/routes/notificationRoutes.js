const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Get Logged In User Notifications
router.get("/", authMiddleware, getNotifications);

// Mark Notification As Read
router.put("/:id", authMiddleware, markAsRead);

// Delete Notification
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;