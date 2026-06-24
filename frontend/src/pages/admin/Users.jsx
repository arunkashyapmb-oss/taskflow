import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // Get All Users
  const getUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create User
  const createUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", formData);

      alert("User Created Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      getUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);

      alert("User Deleted Successfully");

      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <div className="max-w-[1126px] mx-auto">
          <Navbar />

          <main className="p-6 space-y-6">
  {/* Hero */}
  <section className="rounded-[32px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-lg">
    <h1 className="text-4xl font-bold">
      User Management
    </h1>

    <p className="mt-3 text-indigo-100">
      Create, manage and monitor all users from one place.
    </p>
  </section>

  {/* Stats */}
  <section className="grid gap-6 md:grid-cols-3">
    <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Total Users
      </p>

      <h3 className="mt-3 text-3xl font-bold text-slate-900">
        {users.length}
      </h3>
    </div>

    <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Admins
      </p>

      <h3 className="mt-3 text-3xl font-bold text-indigo-600">
        {users.filter((u) => u.role === "admin").length}
      </h3>
    </div>

    <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Users
      </p>

      <h3 className="mt-3 text-3xl font-bold text-emerald-600">
        {users.filter((u) => u.role === "user").length}
      </h3>
    </div>
  </section>

  <section className="grid gap-6 xl:grid-cols-3">
    {/* Create User */}
    <div className="xl:col-span-1">
      <div className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Create User
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a new team member.
        </p>

        <form
          onSubmit={createUser}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>

    {/* User List */}
    <div className="xl:col-span-2">
      <div className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Team Members
            </h2>

            <p className="text-sm text-slate-500">
              All registered users.
            </p>
          </div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            {users.length} Users
          </span>
        </div>

        <div className="mt-6 grid gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {user.role}
                </span>

                <button
                  onClick={() =>
                    deleteUser(user._id)
                  }
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  </section>
</main>
        </div>
      </div>
    </div>
  );
};

export default Users;