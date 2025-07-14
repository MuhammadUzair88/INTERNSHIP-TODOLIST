import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(data.todos);
    } catch (error) {
      setMessage("❌ Failed to load todos");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch {
      alert("Failed to delete todo.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📝 Your Todos</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Todo
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {message && <p className="text-red-500">{message}</p>}

      {todos.length === 0 ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={fetchTodos}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
