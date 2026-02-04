import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }

    if (!form.email.includes("@")) {
      return setError("Invalid email format");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
          Create Account
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">
            Name
          </label>
          <input
            name="name"
            placeholder="Your name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">
            Email
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
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
            placeholder="Minimum 6 characters"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
