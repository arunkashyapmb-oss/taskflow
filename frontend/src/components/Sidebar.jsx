import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logoutHandler = async () => {
  await logout();
  navigate("/");
};

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white">
            T
          </div>
          <div>
            <div className="text-lg font-bold leading-5 text-white">TaskFlow</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {role === "admin" ? (
          <>
            <NavLink to="/admin/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/users" className={navClass}>
              Users
            </NavLink>
            <NavLink to="/admin/tasks" className={navClass}>
              Tasks
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/user/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/user/tasks" className={navClass}>
              My Tasks
            </NavLink>
            <NavLink to="/user/profile" className={navClass}>
              Profile
            </NavLink>
          </>
        )}
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          onClick={logoutHandler}
          className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;