import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Sign in successful. Welcome back to LaptopHub!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/50 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-black text-blue-700">
                L
              </span>

              <span className="text-2xl font-black">
                Laptop<span className="text-cyan-300">Hub</span>
              </span>
            </Link>

            <div className="mt-24">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-200">
                Welcome Back
              </p>

              <h1 className="mt-5 max-w-md text-5xl font-black leading-[1.05]">
                TECHNOLOGY
                <br />
                FOR YOUR
                <br />
                NEXT MOVE.
              </h1>

              <p className="mt-7 max-w-md text-sm leading-7 text-blue-100/70">
                Sign in to your LaptopHub account and continue
                exploring premium laptops, technology and support.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3">
            {[
              ["100+", "Laptops"],
              ["20+", "Brands"],
              ["24/7", "Support"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-xl font-black">{number}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-blue-200/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="p-6 sm:p-10 lg:p-14">

          <div className="mx-auto max-w-md">

            {/* MOBILE LOGO */}
            <Link
              to="/"
              className="mb-10 flex items-center gap-3 lg:hidden"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black">
                L
              </span>

              <span className="text-xl font-black">
                Laptop<span className="text-blue-400">Hub</span>
              </span>
            </Link>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                Account Access
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to continue to your LaptopHub account.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold text-slate-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500 focus:bg-blue-500/[0.04]"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[11px] font-bold text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pr-16 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500 focus:bg-blue-500/[0.04]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-white"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>

                </div>
              </div>

              {/* REMEMBER */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                  className="h-4 w-4 accent-blue-600"
                />

                <span className="text-xs text-slate-500">
                  Remember me on this device
                </span>
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </span>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-widest text-slate-700">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* CREATE ACCOUNT */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">

              <p className="text-sm text-slate-500">
                Don't have a LaptopHub account?
              </p>

              <Link
                to="/signup"
                className="mt-3 inline-block text-sm font-black text-blue-400 transition hover:text-cyan-300"
              >
                Create Account →
              </Link>

            </div>

            {/* BACK HOME */}
            <Link
              to="/"
              className="mt-7 block text-center text-xs font-bold text-slate-600 transition hover:text-white"
            >
              ← Back to LaptopHub
            </Link>

          </div>

        </section>
      </div>
    </main>
  );
}