import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/authcontext.jsx";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await api.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
    } catch {
      alert("Task add failed");
    }
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleTask = async (task) => {
    const res = await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });

    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-600">
            {user?.name} ({user?.email})
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <form onSubmit={addTask} className="flex mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 p-2 border rounded-l"
        />
        <button className="bg-black text-white px-4 rounded-r">
          Add
        </button>
      </form>

      {/* Search */}
      <input
        placeholder="Search tasks..."
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tasks List */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-3 mb-2 rounded flex justify-between items-center"
          >
            <span
              onClick={() => toggleTask(task)}
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
