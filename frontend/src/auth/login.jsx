import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "./authcontext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email and password required");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      const token =
        res.data?.token ||
        res.data?.accessToken ||
        res.data?.data?.token;

      const user =
        res.data?.user ||
        res.data?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response");
      }

      login(user, token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">
            Email
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
