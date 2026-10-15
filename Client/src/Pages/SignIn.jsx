import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "./api";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const data = await api("/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      localStorage.setItem("token", data.token);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl sm:p-10"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5">
            <span className="text-xs">👑</span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300">
              VIP Club
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-black uppercase">
            Sign <span className="text-blue-500">In</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Welcome back. Enter your details to continue.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-5 py-4 pr-20 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-slate-500 hover:text-blue-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          No account?{" "}
          <Link to="/signup" className="font-bold text-blue-400 hover:text-blue-300">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
