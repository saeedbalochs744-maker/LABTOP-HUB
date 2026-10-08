import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#020617] text-white">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />

      {/* TOP CTA */}
      <section className="relative border-b border-slate-800/80">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900/70 to-slate-950 p-8 sm:p-10 lg:p-14">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-blue-500/10" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-blue-500/10" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

              <div className="max-w-2xl">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                  <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />
                  Upgrade Your Setup
                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  READY FOR YOUR
                  <span className="block text-blue-500">
                    NEXT LAPTOP?
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Explore powerful laptops built for gaming, business,
                  studying, creativity and everything in between.
                </p>

              </div>

              <Link
                to="/laptops"
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/30"
              >
                EXPLORE LAPTOPS

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* MAIN FOOTER */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link to="/" className="inline-flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">

                <svg
                  className="h-7 w-7 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="13"
                    rx="2"
                  />
                  <path d="M2 20h20" />
                  <path d="M8 20v1h8v-1" />
                </svg>

              </div>

              <div>
                <div className="text-2xl font-black tracking-tight">
                  LAPTOP
                  <span className="text-blue-500">HUB</span>
                </div>

                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  Next Generation Computing
                </div>
              </div>

            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Your destination for powerful laptops, modern technology
              and reliable computing solutions. Find the perfect machine
              for your next move.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-7 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
              >
                ▶
              </a>

            </div>

          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/service"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Services
                </Link>
              </li>

            </ul>
          </div>

          {/* LAPTOPS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Laptops
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  to="/laptops"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  All Laptops
                </Link>
              </li>

              <li>
                <Link
                  to="/laptops"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Gaming
                </Link>
              </li>

              <li>
                <Link
                  to="/laptops"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Business
                </Link>
              </li>

              <li>
                <Link
                  to="/laptops"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Student
                </Link>
              </li>

            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Support
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Order Support
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Delivery Info
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* NEWSLETTER */}
        <div className="mt-14 border-t border-slate-800 pt-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h3 className="text-lg font-bold">
                Stay in the loop.
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Get the latest laptop deals and technology updates.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md gap-2"
            >

              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                JOIN
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800/80 bg-[#01040d]">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p className="text-xs text-slate-500">
            © {year} LaptopHub. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-blue-400"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-blue-400"
            >
              Terms & Conditions
            </a>

            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-blue-400"
            >
              Warranty
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;