import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getMyTasks = async () => {
    try {
      const res = await api.get("/tasks/my-tasks");
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/status/${id}`, {
        status,
      });

      getMyTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <div className="max-w-[1400px] mx-auto">
          <Navbar />

          <main className="p-6 space-y-6">
            {/* Hero Section */}
            <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 shadow-lg">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold">
                  My Tasks
                </h1>

                <p className="mt-3 text-indigo-100">
                  Track your assigned tasks and update progress
                  efficiently.
                </p>

                <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                  <span className="text-sm">
                    Total Assigned Tasks
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-indigo-600">
                    {tasks.length}
                  </span>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid gap-6 md:grid-cols-4">
              <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">
                  Total Tasks
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  {tasks.length}
                </h3>
              </div>

              <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <h3 className="mt-3 text-3xl font-bold text-orange-500">
                  {pendingCount}
                </h3>
              </div>

              <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">
                  In Progress
                </p>

                <h3 className="mt-3 text-3xl font-bold text-sky-600">
                  {progressCount}
                </h3>
              </div>

              <div className="rounded-[28px] bg-white p-6 border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <h3 className="mt-3 text-3xl font-bold text-emerald-600">
                  {completedCount}
                </h3>
              </div>
            </section>

            {/* Tasks Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Task List
                  </h2>

                  <p className="text-slate-500">
                    Manage and update your assigned work.
                  </p>
                </div>

                <button
                  onClick={getMyTasks}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                >
                  Refresh
                </button>
              </div>

              {tasks.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      className="rounded-[28px] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          {task.title}
                        </h3>

                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : task.status === "In Progress"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600 min-h-[72px]">
                        {task.description || "No description available"}
                      </p>

                      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Due Date
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {task.dueDate
                            ? new Date(
                                task.dueDate
                              ).toLocaleDateString()
                            : "Not Available"}
                        </p>
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Update Status
                        </label>

                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateStatus(
                              task._id,
                              e.target.value
                            )
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
                          </option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[32px] bg-white border border-slate-200 p-12 text-center shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">
                    No Tasks Assigned
                  </h3>

                  <p className="mt-2 text-slate-500">
                    You don't have any assigned tasks yet.
                  </p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;