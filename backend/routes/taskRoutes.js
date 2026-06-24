const express = require("express");

const router = express.Router();

const { 
  createTask,
  getAllTasks,
  deleteTask,
  updateTask, 
  getMyTasks, 
  updateTaskStatus,
  getStats } = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllTasks
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTask
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTask
);

router.get(
  "/my-tasks",
  authMiddleware,
  getMyTasks
);

router.put(
  "/status/:id",
  authMiddleware,
  updateTaskStatus
);

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getStats
);

module.exports = router;