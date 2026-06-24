import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  // Get All Tasks
  const getTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  // Get All Users
  const getUsers = async () => {
    try {
      const res = await api.get("/users");

      const onlyUsers = res.data.users.filter(
        (user) => user.role === "user"
      );

      setUsers(onlyUsers);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create Task
  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", formData);

      alert("Task Created Successfully");

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
      });

      getTasks();
    } catch (error) {
      console.log(error);
      alert("Failed To Create Task");
    }
  };

  // Edit Task
  const editTask = (task) => {
    setEditId(task._id);

    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo?._id,
      dueDate: task.dueDate?.split("T")[0],
    });
  };

  // Update Task
  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/tasks/${editId}`,
        formData
      );

      alert("Task Updated Successfully");

      setEditId(null);

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
      });

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      alert("Task Deleted Successfully");

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Navbar />

          <main className="space-y-6">
            <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-900">Tasks Management</h1>
                  <p className="mt-2 text-slate-500">Create, assign, edit, and manage team tasks from one place.</p>
                </div>
                <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-500">Tasks found</span>
                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">{tasks.length}</span>
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
              <form
                onSubmit={editId ? updateTask : createTask}
                className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200 space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-slate-700">Task Title</label>
                  <input
                    className="mt-2 w-full border rounded-3xl px-4 py-3 text-sm text-slate-900"
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    className="mt-2 w-full border rounded-3xl px-4 py-3 text-sm text-slate-900 h-32"
                    name="description"
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Assign To</label>
                    <select
                      className="mt-2 w-full border rounded-3xl px-4 py-3 text-sm text-slate-900"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Due Date</label>
                    <input
                      className="mt-2 w-full border rounded-3xl px-4 py-3 text-sm text-slate-900"
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  className="w-full rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  type="submit"
                >
                  {editId ? "Update Task" : "Create Task"}
                </button>
              </form>

              <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">All Tasks</h2>
                    <p className="mt-1 text-sm text-slate-500">Review and manage current tasks.</p>
                  </div>
                  <button
                    onClick={getTasks}
                    className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                  >
                    Refresh
                  </button>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="px-4 py-4 text-left font-semibold">Title</th>
                        <th className="px-4 py-4 text-left font-semibold">Assigned User</th>
                        <th className="px-4 py-4 text-left font-semibold">Status</th>
                        <th className="px-4 py-4 text-left font-semibold">Due Date</th>
                        <th className="px-4 py-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {tasks.map((task) => (
                        <tr key={task._id} className="hover:bg-slate-50">
                          <td className="px-4 py-4 font-medium text-slate-900">{task.title}</td>
                          <td className="px-4 py-4">{task.assignedTo?.name || "Unassigned"}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                task.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : task.status === "In Progress"
                                  ? "bg-sky-100 text-sky-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                          <td className="px-4 py-4 space-x-2">
                            <button
                              onClick={() => editTask(task)}
                              className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="rounded-2xl bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Tasks;