import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 👉 Update local state on each keystroke
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 👉 Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // server returns { user, message }
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/user/signup`,
        formData
      );

      // put user in context + localStorage
      login(data.user);

      // happy‑path feedback
      setMessage("🎉 Account created! Redirecting to homepage …");

      // small delay so the user sees the confirmation
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      // graceful error
      setMessage(
        err.response?.data?.message ||
          "❌ Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-2">
          Join Us Today 🚀
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Create a new account in seconds
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-slate-600">Name</label>
            <input
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* feedback message */}
        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}

        {/* link to login */}
        <p className="text-sm mt-6 text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
