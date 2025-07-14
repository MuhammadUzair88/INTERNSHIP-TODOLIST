import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [text, setText] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (error) {
      alert("Error adding todo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
