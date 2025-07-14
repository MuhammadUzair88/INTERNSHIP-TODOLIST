import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const { token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/${todo._id}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditing(false);
      onUpdate();
    } catch {
      alert("Failed to update todo.");
    }
  };

  return (
    <div className="flex justify-between items-center border p-3 rounded-lg bg-white shadow">
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border px-2 py-1 rounded w-full mr-4"
        />
      ) : (
        <p className="flex-1">{todo.text}</p>
      )}

      <div className="flex gap-2 ml-4">
        {editing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
