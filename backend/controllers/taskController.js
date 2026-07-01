const Task = require("../models/Task");
const User = require("../models/User");

const Notification = require("../models/Notification");
const { getIO, getUsers } = require("../config/socket");


const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      dueDate,
    } = req.body;

    // Create Task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      dueDate,
    });

    // Save Notification in Database
    await Notification.create({
      user: assignedTo,
      title: "New Task Assigned",
      message: `You have been assigned a new task: ${title}`,
    });

    // Send Live Notification
    const io = getIO();
    const users = getUsers();

    const socketId = users[assignedTo.toString()];

    if (socketId && io) {
      io.to(socketId).emit("newNotification", {
        title: "New Task Assigned",
        message: `You have been assigned a new task: ${title}`,
        task,
      });
    }

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email role");

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      dueDate,
      status,
    } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        assignedTo,
        dueDate,
        status,
      },
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user start hoga yha se 

const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    }).populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

////////////// dashboard controller

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalTasks = await Task.countDocuments();

    const pending = await Task.countDocuments({
      status: "Pending",
    });

    const inProgress = await Task.countDocuments({
      status: "In Progress",
    });

    const completed = await Task.countDocuments({
      status: "Completed",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalTasks,
        pending,
        inProgress,
        completed,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  getMyTasks,
  updateTaskStatus,
  getStats,
};