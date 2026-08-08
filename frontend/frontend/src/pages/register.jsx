import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function register(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      await api.post("/api/auth/register", { name, email, password });
      alert("Account created successfully! Please sign in.");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4">
      {/* Container */}
      <div className="w-full max-w-sm ui-card p-6 sm:p-8 bg-zinc-900 border border-zinc-800 shadow-xl rounded-xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white text-zinc-950 font-extrabold text-lg mb-3 shadow">
            L
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-xs text-zinc-400 mt-1">Get started with Ledger Service</p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-lg border border-zinc-800 mb-5 text-xs font-medium">
          <Link to="/" className="py-1.5 text-zinc-400 hover:text-white text-center">
            Sign In
          </Link>
          <button className="py-1.5 rounded bg-zinc-800 text-white shadow-sm text-center">
            Register
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={register} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pritesh Kumar"
              className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-xs transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-xs transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-xs transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 active:bg-zinc-300 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-5 text-xs text-zinc-400">
          Already have an account?{" "}
          <Link to="/" className="text-white underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;