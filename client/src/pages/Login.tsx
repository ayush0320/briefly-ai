import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/api/auth/login", form);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="bg-white/10 backdrop-blur-md max-w-md w-full p-8 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-xl font-bold mb-6">Sign in to Briefly AI</h2>
        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            className="w-full rounded bg-white/10 px-3 py-2 outline-none border border-white/10"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            required
            className="w-full rounded bg-white/10 px-3 py-2 outline-none border border-white/10"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="rounded-full bg-[color:var(--color-neon-blue)] text-white shadow px-8 py-2 mt-2 w-full"
          >
            Log in
          </button>
        </form>
        <div className="text-xs text-gray-400 mt-4">
          New here?{" "}
          <Link
            to="/register"
            className="underline text-[color:var(--color-neon-blue)]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
