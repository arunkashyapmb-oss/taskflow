import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const getMyTasks = async () => {
    try {
      const res = await api.get("/tasks/my-tasks");
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Navbar />

          <main className="space-y-6">
            <section className="rounded-[1.25rem] bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">User Dashboard</p>
                  <h1 className="mt-3 text-2xl font-semibold text-slate-900">Welcome back</h1>
                  <p className="mt-2 text-slate-500 max-w-2xl">Here is a quick overview of your tasks and progress.</p>
                </div>
                <button className="inline-flex items-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                  View My Tasks
                </button>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">Pending</p>
                  <p className="mt-4 text-3xl font-bold text-orange-500">{pending}</p>
                  <p className="mt-3 text-sm text-slate-500">Tasks awaiting action</p>
                </div>

                <div className="rounded-3xl bg-slate-50 p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">In Progress</p>
                  <p className="mt-4 text-3xl font-bold text-sky-600">{inProgress}</p>
                  <p className="mt-3 text-sm text-slate-500">Tasks you're working on</p>
                </div>

                <div className="rounded-3xl bg-slate-50 p-5 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500">Completed</p>
                  <p className="mt-4 text-3xl font-bold text-emerald-600">{completed}</p>
                  <p className="mt-3 text-sm text-slate-500">Finished tasks</p>
                </div>
              </div>
            </section>

            <section className="rounded-[1.25rem] bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">My Tasks</p>
                  <p className="text-sm text-slate-500">Your recent tasks and statuses</p>
                </div>
                
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-4 font-medium text-slate-900">Task Title</th>
                      <th className="py-4 font-medium text-slate-900">Status</th>
                      <th className="py-4 font-medium text-slate-900">Due Date</th>
                      {/* <th className="py-4 font-medium text-slate-900">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task._id} className="border-b border-slate-200 last:border-0">
                        <td className="py-4 align-top font-medium text-slate-900">{task.title}</td>
                        <td className="py-4 align-top">
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
                        <td className="py-4 align-top">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
                        
                      </tr>
                    ))}
                    {tasks.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-500">No tasks found</td>
                      </tr>
                    )}
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