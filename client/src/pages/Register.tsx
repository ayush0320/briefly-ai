import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/api/auth/register", form);
      navigate("/preferences");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="bg-white/10 backdrop-blur-md max-w-md w-full p-8 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-xl font-bold mb-6">
          Create your Briefly AI account
        </h2>
        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            required
            className="w-full rounded bg-white/10 px-3 py-2 outline-none border border-white/10"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
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
            Register
          </button>
        </form>
        <div className="text-xs text-gray-400 mt-4">
          Have an account?{" "}
          <Link
            to="/login"
            className="underline text-[color:var(--color-neon-blue)]"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
