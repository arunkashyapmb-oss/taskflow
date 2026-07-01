import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../socket";

const Navbar = () => {
  const navigate = useNavigate();

  const notificationRef = useRef();

  const [name, setName] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const role = localStorage.getItem("role");

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      setNotifications(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setName(res.data.user?.name || null);
      } catch (err) {
        setName(null);
      }
    };

    const token = localStorage.getItem("token");
    if (token) fetchProfile();
    if (token) fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [
        {
          title: notification.title,
          message: notification.message,
          isRead: false,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const smallTitle = role === "admin" ? "Admin Dashboard" : "User Dashboard";

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-md rounded-2xl px-6">
      <div className="flex h-16 items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
         

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              T
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">TaskFlow</h2>
              <p className="text-xs text-slate-400">{smallTitle}</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h2 className="font-semibold text-slate-800">
                    Notifications
                  </h2>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xl text-gray-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-5 text-center text-gray-500">
                      No Notifications
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => markAsRead(item._id)}
                        className={`border-b px-4 py-3 cursor-pointer hover:bg-slate-100
  ${!item.isRead ? "bg-blue-50" : "bg-white"}`}
                      >
                        <h3 className="font-semibold text-slate-800">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-600 mt-1">
                          {item.message}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21a2 2 0 01-3.46 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileMenu(!profileMenu)}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
            </button>

            {profileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-lg bg-white shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-slate-900">
                    {name || "Guest User"}
                  </p>
                  <p className="text-sm text-slate-500 capitalize">
                    {role || "visitor"}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                >
                  Your Profile
                </button>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                  Settings
                </button>

                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
