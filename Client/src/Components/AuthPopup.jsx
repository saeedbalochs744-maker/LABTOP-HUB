import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AuthPopup() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const onAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  const close = useCallback(() => {
    setOpen(false);
    sessionStorage.setItem("authPopupSeen", "true"); // don't show again this visit
  }, []);

  // open automatically when the site loads (only if not logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const alreadySeen = sessionStorage.getItem("authPopupSeen");

    if (!token && !alreadySeen) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // close with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || onAuthPage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-blue-500/30 bg-slate-900 p-8 text-center text-white shadow-2xl shadow-blue-900/40"
      >
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-600/30 blur-3xl" />

        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-3 text-2xl text-gray-400 hover:text-white"
        >
          ×
        </button>

        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl shadow-lg shadow-blue-600/30">
            👑
          </div>

          <h2 className="mt-5 text-2xl font-black">
            Welcome to <span className="text-blue-500">LaptopHub</span>
          </h2>

          <p className="mb-6 mt-2 text-sm text-gray-400">
            Join the VIP club or sign in to get started.
          </p>

          <Link
            to="/signin"
            onClick={close}
            className="mb-3 block rounded-xl bg-blue-600 py-3 text-sm font-bold transition hover:bg-blue-500"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            onClick={close}
            className="block rounded-xl border border-blue-500/50 py-3 text-sm font-bold transition hover:bg-blue-500/10"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
