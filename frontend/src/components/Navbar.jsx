import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);

  const role = localStorage.getItem("role");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
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
  }, []);

  const smallTitle =
    role === "admin" ? "Admin Dashboard" : "User Dashboard";

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-md rounded-2xl px-6">
      <div className="flex h-16 items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* <button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              T
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                TaskFlow
              </h2>
              <p className="text-xs text-slate-400">
                {smallTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Notification */}
          <button className="rounded-full p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition">
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
          </button>

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

                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                >
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