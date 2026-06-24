import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);

  const getStats = async () => {
    try {
      const res = await api.get("/tasks/stats");
      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setRecentTasks(res.data.tasks.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
    getRecentTasks();
  }, []);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Navbar />

          <main className="space-y-6">
            <section className="rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Admin Dashboard</p>
                  <h1 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back, Admin</h1>
                  <p className="mt-2 text-slate-500 max-w-2xl">View the latest statistics and manage tasks with a clear overview of your team.</p>
                </div>
                <button className="inline-flex items-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                  View All Tasks
                </button>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-5">
                <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">Total Users</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
                  <p className="mt-3 text-sm text-slate-500">View all users</p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">Total Tasks</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">{stats.totalTasks}</p>
                  <p className="mt-3 text-sm text-slate-500">View all tasks</p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">Pending Tasks</p>
                  <p className="mt-4 text-3xl font-bold text-orange-500">{stats.pending}</p>
                  <p className="mt-3 text-sm text-slate-500">View pending</p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">In Progress</p>
                  <p className="mt-4 text-3xl font-bold text-sky-600">{stats.inProgress}</p>
                  <p className="mt-3 text-sm text-slate-500">View in progress</p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">Completed Tasks</p>
                  <p className="mt-4 text-3xl font-bold text-emerald-600">{stats.completed}</p>
                  <p className="mt-3 text-sm text-slate-500">View completed</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Recent Tasks</p>
                  <p className="text-sm text-slate-500">Latest task activity from your team</p>
                </div>
                <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                  View All Tasks
                </button>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-4 font-medium text-slate-900">Task Title</th>
                      <th className="py-4 font-medium text-slate-900">Assigned To</th>
                      <th className="py-4 font-medium text-slate-900">Status</th>
                      <th className="py-4 font-medium text-slate-900">Due Date</th>
                      <th className="py-4 font-medium text-slate-900">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map((task) => (
                      <tr key={task._id} className="border-b border-slate-200 last:border-0">
                        <td className="py-4">{task.title}</td>
                        <td className="py-4">{task.assignedTo?.name || "Unassigned"}</td>
                        <td className="py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : task.status === "In Progress"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-orange-100 text-orange-700"
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                        <td className="py-4">{new Date(task.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;