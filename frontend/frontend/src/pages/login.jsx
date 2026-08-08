import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function login(e) {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token || "demo-token");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Invalid email or password.");
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
          <h1 className="text-xl font-bold text-white tracking-tight">Sign in to Ledger</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage your ledger accounts and transfers</p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-lg border border-zinc-800 mb-5 text-xs font-medium">
          <button className="py-1.5 rounded bg-zinc-800 text-white shadow-sm text-center">
            Sign In
          </button>
          <Link to="/register" className="py-1.5 text-zinc-400 hover:text-white text-center">
            Register
          </Link>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={login} className="space-y-4">
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
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-zinc-300">Password</label>
            </div>
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
          <button
            onClick={() => {
              setEmail("pkppwe23@gmail.com");
              setPassword("demo123");
            }}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Fill Demo Credentials
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-[11px] text-zinc-500 text-center font-mono">
        Protected by 256-bit AES Encryption
      </div>
    </div>
  );
}

export default Login;