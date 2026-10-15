import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const linkClass = "block text-sm text-slate-500 transition hover:text-blue-400";

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Link to="/" className="text-2xl font-black">
            LAPTOP<span className="text-blue-500">HUB</span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
            Premium laptops and VIP service for gamers, students,
            professionals and creators.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2">
            <span className="text-xs">👑</span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300">
              VIP Experience
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">
            Collections
          </h3>
          <div className="mt-5 space-y-3">
            <Link to="/gaming" className={linkClass}>Gaming Laptops</Link>
            <Link to="/student" className={linkClass}>Student Laptops</Link>
            <Link to="/business" className={linkClass}>Business Laptops</Link>
            <Link to="/service" className={linkClass}>Services</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">
            Company
          </h3>
          <div className="mt-5 space-y-3">
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/about" className={linkClass}>About</Link>
            <Link to="/contact" className={linkClass}>Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">
            VIP Club
          </h3>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            Member pricing, priority support and early access.
          </p>

          {isLoggedIn ? (
            <p className="mt-5 text-sm font-bold text-blue-400">
              You're a VIP member ✓
            </p>
          ) : (
            <Link
              to="/signup"
              className="mt-5 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-[11px] font-black uppercase tracking-widest transition hover:scale-105"
            >
              Join Free
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} LaptopHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
