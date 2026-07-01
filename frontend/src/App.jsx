import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import socket from "./socket";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Tasks from "./pages/admin/Tasks";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import MyTasks from "./pages/user/MyTasks";
import Profile from "./pages/user/Profile";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    socket.on("newNotification", (data) => {
      console.log("🔔 New Notification:", data);

      alert(`${data.title}\n\n${data.message}`);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute allowedRole="admin">
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/tasks"
          element={
            <ProtectedRoute allowedRole="user">
              <MyTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRole="user">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
