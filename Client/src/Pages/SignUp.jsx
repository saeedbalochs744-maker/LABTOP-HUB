import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agree, setAgree] = useState(false);
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

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (form.name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.password) {
      setError("Please create a password.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(
        "Account created successfully. Welcome to LaptopHub!"
      );

      setTimeout(() => {
        navigate("/");
      }, 1200);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/50 lg:grid-cols-2">

        {/* =====================================================
            LEFT
        ===================================================== */}

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-12 lg:flex lg:flex-col lg:justify-between">

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black shadow-lg shadow-blue-600/30">
                L
              </span>

              <span className="text-2xl font-black">
                Laptop<span className="text-cyan-300">Hub</span>
              </span>

            </Link>

            <div className="mt-24">

              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-200">
                Create Your Account
              </p>

              <h1 className="mt-5 max-w-lg text-5xl font-black leading-[1.05]">
                JOIN THE
                <br />
                NEXT
                <br />
                GENERATION.
              </h1>

              <p className="mt-7 max-w-md text-sm leading-7 text-blue-100/70">
                Create your LaptopHub account and get closer
                to the right technology for your next move.
              </p>

            </div>

          </div>

          <div className="relative z-10 space-y-3">

            {[
              "Premium laptop collection",
              "Expert buying guidance",
              "Dedicated technical support",
              "Simple and secure account",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-300">
                  ✓
                </span>

                <span className="text-xs font-semibold text-blue-100/70">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* =====================================================
            RIGHT
        ===================================================== */}

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

            {/* HEADING */}

            <div>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                New Member
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Create account.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join LaptopHub and start exploring premium
                technology.
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

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold text-slate-300"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500 focus:bg-blue-500/[0.04]"
                />

              </div>

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

                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold text-slate-300"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pr-16 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500 focus:bg-blue-500/[0.04]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-white"
                  >
                    {showPassword
                      ? "HIDE"
                      : "SHOW"}
                  </button>

                </div>

                <div className="mt-2 flex gap-1">

                  {[1, 2, 3, 4].map(
                    (item) => (
                      <span
                        key={item}
                        className={`h-1 flex-1 rounded-full ${
                          form.password.length >=
                          item * 2
                            ? "bg-blue-500"
                            : "bg-white/10"
                        }`}
                      />
                    )
                  )}

                </div>

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-bold text-slate-300"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pr-16 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500 focus:bg-blue-500/[0.04]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-white"
                  >
                    {showConfirmPassword
                      ? "HIDE"
                      : "SHOW"}
                  </button>

                </div>

              </div>

              {/* TERMS */}

              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) =>
                    setAgree(
                      e.target.checked
                    )
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
                />

                <span className="text-xs leading-5 text-slate-500">
                  I agree to the LaptopHub terms and
                  understand the account requirements.
                </span>

              </label>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <span className="flex items-center gap-3">

                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Creating Account...

                  </span>
                ) : (
                  "Create Account →"
                )}

              </button>

            </form>

            {/* SIGN IN */}

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?
              </p>

              <Link
                to="/signin"
                className="mt-3 inline-block text-sm font-black text-blue-400 transition hover:text-cyan-300"
              >
                Sign In →
              </Link>

            </div>

            {/* HOME */}

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