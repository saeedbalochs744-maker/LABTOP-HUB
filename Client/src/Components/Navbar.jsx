import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

/* ============================================================
   LAPTOPHUB NAVBAR  v2  (dark only, no cart, blue accent)
   - Floating glass bar that compacts on scroll
   - Scroll progress line + cursor spotlight
   - Mega menu with featured card
   - Command-palette search (Ctrl/Cmd + K), grouped + highlighted
   - Keyboard + screen reader friendly, reduced-motion safe
   No extra packages - pure React + Tailwind.
   ============================================================ */

const BRAND = { support: "support@laptophub.com", phone: "+92 300 1234567" };

const mainLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  { name: "All Laptops", icon: "💻", desc: "Browse the full collection", path: "/service" },
  { name: "Gaming", icon: "🎮", desc: "High-performance gaming", path: "/service#gaming" },
  { name: "Business", icon: "💼", desc: "Reliable for work", path: "/service#business" },
  { name: "Student", icon: "🎓", desc: "Affordable and portable", path: "/service#student" },
  { name: "Creator", icon: "🎨", desc: "Design and editing", path: "/service#creator" },
  { name: "Ultrabook", icon: "⚡", desc: "Thin and lightweight", path: "/service#ultrabook" },
  { name: "Workstation", icon: "🖥️", desc: "Maximum power", path: "/service#workstation" },
  { name: "Premium", icon: "✦", desc: "Flagship experience", path: "/service#premium" },
];

const services = [
  { title: "Laptop Consultation", desc: "Find the right laptop for you", path: "/service#consultation" },
  { title: "Performance Guide", desc: "Understand CPU, GPU, RAM, SSD", path: "/service#performance" },
  { title: "Technical Support", desc: "Professional assistance", path: "/service#support" },
  { title: "Delivery Support", desc: "Track orders and delivery", path: "/service#delivery" },
  { title: "Warranty", desc: "Warranty coverage", path: "/service#warranty" },
  { title: "After Sales", desc: "Support after purchase", path: "/service#after-sales" },
];

const searchItems = [
  { name: "Home", description: "LaptopHub homepage", category: "Page", path: "/", keywords: "home" },
  { name: "About LaptopHub", description: "Learn about our company", category: "Page", path: "/about", keywords: "about company" },
  { name: "Laptop Services", description: "Explore our services", category: "Page", path: "/service", keywords: "service support" },
  { name: "Contact", description: "Contact our support team", category: "Page", path: "/contact", keywords: "contact email phone" },
  { name: "Gaming Laptops", description: "High-performance gaming laptops", category: "Category", path: "/service#gaming", keywords: "gaming gpu games" },
  { name: "Business Laptops", description: "Professional laptops for work", category: "Category", path: "/service#business", keywords: "business office work" },
  { name: "Student Laptops", description: "Affordable laptops for students", category: "Category", path: "/service#student", keywords: "student school university" },
  { name: "Creator Laptops", description: "Laptops for creators", category: "Category", path: "/service#creator", keywords: "creator editing design video" },
  { name: "Ultrabooks", description: "Thin and lightweight laptops", category: "Category", path: "/service#ultrabook", keywords: "thin light portable" },
  { name: "Workstations", description: "Professional workstations", category: "Category", path: "/service#workstation", keywords: "workstation engineering" },
  { name: "Technical Support", description: "Get technical help", category: "Service", path: "/service#support", keywords: "technical support help" },
  { name: "Warranty", description: "Warranty coverage details", category: "Service", path: "/service#warranty", keywords: "warranty guarantee" },
  { name: "Sign In", description: "Access your account", category: "Account", path: "/signin", keywords: "login signin account" },
  { name: "Sign Up", description: "Create an account", category: "Account", path: "/signup", keywords: "register signup" },
];

const CAT_ORDER = ["Page", "Category", "Service", "Account"];
const CAT_LABEL = { Page: "Pages", Category: "Laptop categories", Service: "Services", Account: "Account" };
const QUICK = ["Gaming", "Student", "Business", "Warranty", "Support"];

/* ============================================================
   ICONS
   ============================================================ */

const Svg = ({ size = "h-5 w-5", children }) => (
  <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const SearchIcon = () => (<Svg><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Svg>);
const HeartIcon = () => (<Svg><path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" /></Svg>);
const BellIcon = () => (<Svg><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z" /><path d="M10 21h4" /></Svg>);
const UserIcon = () => (<Svg><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Svg>);
const MenuIcon = () => (<Svg><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Svg>);
const CloseIcon = () => (<Svg><path d="M6 6l12 12" /><path d="M18 6 6 18" /></Svg>);
const Chevron = ({ open }) => (
  <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <Svg size="h-4 w-4"><path d="m6 9 6 6 6-6" /></Svg>
  </span>
);

/* ============================================================
   ANIMATED ZIGZAG LINES BACKGROUND (pure CSS, no glow filter = smoother)
   ============================================================ */

const ZIGS = [
  { axis: "x", rev: false, color: "#1d4ed8", step: 70, amp: 36, mid: 60, dur: 6, delay: 0 },
  { axis: "x", rev: true, color: "#6d28d9", step: 90, amp: 30, mid: 50, dur: 7.5, delay: 1.5 },
  { axis: "x", rev: false, color: "#0369a1", step: 55, amp: 42, mid: 70, dur: 8, delay: 3.5 },
  { axis: "x", rev: true, color: "#3730a3", step: 80, amp: 34, mid: 60, dur: 6.5, delay: 4.5 },
  { axis: "y", rev: false, color: "#1d4ed8", step: 20, amp: 26, mid: 200, dur: 4, delay: 0.8 },
  { axis: "y", rev: true, color: "#6d28d9", step: 20, amp: 26, mid: 480, dur: 4, delay: 2.2 },
  { axis: "y", rev: false, color: "#0369a1", step: 20, amp: 26, mid: 760, dur: 4.5, delay: 3.6 },
  { axis: "y", rev: true, color: "#3730a3", step: 20, amp: 26, mid: 1020, dur: 4.2, delay: 5 },
];

const buildZigzag = ({ axis, step, amp, mid }) => {
  if (axis === "x") {
    let d = `M0,${mid}`;
    for (let x = step, i = 1; x <= 1200 + step; x += step, i++) d += ` L${x},${mid + (i % 2 ? -amp : amp)}`;
    return d;
  }
  let d = `M${mid},0`;
  for (let y = step, i = 1; y <= 120 + step; y += step, i++) d += ` L${mid + (i % 2 ? -amp : amp)},${y}`;
  return d;
};

function LinesBackground() {
  const paths = useMemo(() => ZIGS.map((z) => ({ ...z, d: buildZigzag(z) })), []);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
      <style>{`
        @keyframes lh-zig {
          0%   { stroke-dashoffset: 0.22; opacity: 0; }
          8%   { opacity: .8; }
          62%  { opacity: .8; }
          70%  { stroke-dashoffset: -1; opacity: 0; }
          100% { stroke-dashoffset: -1; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .lh-zig { animation: none !important; opacity: .25 !important; } }
      `}</style>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
      >
        {paths.map((p, i) => (
          <g key={i} fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d={p.d} stroke={p.color} strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path
              d={p.d}
              pathLength="1"
              stroke={p.color}
              strokeWidth="1.6"
              strokeDasharray="0.22 1.3"
              vectorEffect="non-scaling-stroke"
              className="lh-zig"
              style={{ opacity: 0, animation: `lh-zig ${p.dur}s linear ${p.delay}s infinite ${p.rev ? "reverse" : "normal"}` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   HELPERS
   ============================================================ */

const Highlight = ({ text, query }) => {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent text-blue-400">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
};

const focusRing = "outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70";
const iconBtn = `relative flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white ${focusRing}`;
const dropdown =
  "lh-pop absolute top-full z-50 mt-3 rounded-2xl border border-white/10 bg-[#0a1226]/95 shadow-2xl shadow-black/80 backdrop-blur-xl";
const underline =
  "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-blue-400 after:to-transparent after:transition-transform after:duration-300";

/* ============================================================
   NAVBAR
   ============================================================ */

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileSec, setMobileSec] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMac] = useState(() => typeof navigator !== "undefined" && /mac/i.test(navigator.platform || ""));

  const searchRef = useRef(null);
  const listRef = useRef(null);
  const shellRef = useRef(null);
  const barRef = useRef(null);

  const toggle = (name) => setMenu((c) => (c === name ? null : name));
  const servicesActive = location.pathname.startsWith("/service");

  /* search results: filtered, then grouped by category */
  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q
      ? searchItems.filter((item) =>
          `${item.name} ${item.description} ${item.category} ${item.keywords}`.toLowerCase().includes(q)
        )
      : searchItems;
    return [...list].sort((a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category));
  }, [search]);

  /* close panels on route change */
  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [location.pathname, location.hash]);

  /* lock page scroll while search is open */
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  /* scroll: compact mode + progress line (rAF throttled, no re-render for progress) */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* wishlist count: persisted, and other pages can update it with
     window.dispatchEvent(new CustomEvent("laptophub:wishlist", { detail: 3 })) */
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("laptophub_wishlist_count") || 0);
      if (Number.isFinite(saved) && saved >= 0) setWishlistCount(saved);
    } catch {}
    const onWish = (e) => {
      const n = Number(e.detail);
      if (Number.isFinite(n) && n >= 0) setWishlistCount(n);
    };
    window.addEventListener("laptophub:wishlist", onWish);
    return () => window.removeEventListener("laptophub:wishlist", onWish);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("laptophub_wishlist_count", String(wishlistCount));
    } catch {}
  }, [wishlistCount]);

  const openSearch = () => {
    setSearchOpen(true);
    setSearch("");
    setSearchIndex(0);
    setOpen(false);
    setMenu(null);
    setTimeout(() => searchRef.current?.focus(), 80);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearch("");
    setSearchIndex(0);
  };

  const goTo = (path) => {
    navigate(path);
    closeSearch();
  };

  /* keyboard: Ctrl/Cmd+K, Esc, arrows, enter */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
        return;
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenu(null);
        setOpen(false);
      }
      if (searchOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSearchIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSearchIndex((i) => Math.max(i - 1, 0));
        }
        if (e.key === "Enter" && results[searchIndex]) {
          e.preventDefault();
          goTo(results[searchIndex].path);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOpen, results, searchIndex]);

  /* keep the highlighted result visible */
  useEffect(() => {
    if (!searchOpen) return;
    listRef.current?.querySelector(`[data-idx="${searchIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [searchIndex, searchOpen]);

  /* close dropdowns on outside click */
  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest("[data-menu]")) setMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* cursor spotlight (writes CSS vars, no re-render) */
  const onMove = (e) => {
    const el = shellRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const linkBase = `relative rounded-full px-4 py-2 text-sm font-semibold transition ${focusRing} ${underline}`;
  const navLink = ({ isActive }) =>
    `${linkBase} ${isActive ? "text-white after:scale-x-100" : "text-white/60 hover:text-white hover:after:scale-x-100"}`;
  const dropBtn = (active) =>
    `flex items-center gap-1 ${linkBase} ${active ? "text-white after:scale-x-100" : "text-white/60 hover:text-white hover:after:scale-x-100"}`;

  const badge =
    "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#070d1f] bg-blue-500 px-1 text-[10px] font-bold text-white";

  return (
    <>
      <style>{`
        @keyframes lh-pop { from { opacity: 0; transform: translateY(-6px) scale(.98); } to { opacity: 1; transform: none; } }
        .lh-pop { animation: lh-pop .16s ease-out; transform-origin: top; }
        @media (prefers-reduced-motion: reduce) { .lh-pop { animation: none; } }
      `}</style>

      <header className={`sticky top-0 z-[100] px-3 transition-[padding] duration-300 sm:px-5 ${scrolled ? "pt-2" : "pt-3"}`}>
        <div
          ref={shellRef}
          onMouseMove={onMove}
          className={`group relative mx-auto max-w-7xl rounded-3xl border bg-[#070d1f]/90 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 ${
            scrolled
              ? "border-blue-500/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
              : "border-white/10 shadow-2xl shadow-black/60"
          }`}
        >
          <LinesBackground />

          {/* cursor spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.10), transparent 60%)" }}
          />

          {/* top accent line */}
          <div className="pointer-events-none absolute inset-x-10 -top-px z-10 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* scroll progress */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-0 z-10 h-[2px] overflow-hidden rounded-full">
            <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" style={{ transform: "scaleX(0)" }} />
          </div>

          {/* ANNOUNCEMENT STRIP (collapses on scroll) */}
          <div className={`relative z-10 hidden grid-rows-[1fr] transition-[grid-template-rows] duration-300 md:grid ${scrolled ? "!grid-rows-[0fr]" : ""}`}>
            <div className="overflow-hidden">
              <div className="flex items-center justify-center gap-4 border-b border-white/10 px-6 py-2.5 text-xs font-semibold tracking-wide text-white/75">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span>Genuine laptops</span>
                <span className="text-blue-500">◆</span>
                <span>Free shipping on selected models</span>
                <span className="text-blue-500">◆</span>
                <span>Expert support</span>
              </div>
            </div>
          </div>

          {/* MAIN ROW */}
          <div className={`relative z-10 flex items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? "h-16" : "h-20"}`}>
            {/* LOGO */}
            <Link to="/" aria-label="LaptopHub home" className={`flex shrink-0 items-center gap-3 rounded-2xl ${focusRing}`}>
              <span
                className={`flex items-center justify-center rounded-2xl border border-blue-500/40 bg-[#030816] font-black text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 ${
                  scrolled ? "h-10 w-10 text-base" : "h-12 w-12 text-lg"
                }`}
              >
                L<span className="text-blue-500">H</span>
              </span>
              <span className="leading-none">
                <span className={`block font-black tracking-tight text-white transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"}`}>
                  LAPTOP<span className="font-semibold text-blue-500">HUB</span>
                </span>
                {!scrolled && (
                  <span className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-white/40">
                    <span className="h-px w-8 bg-white/30" />
                    Est. 2026
                  </span>
                )}
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
              <NavLink to="/" end className={navLink}>Home</NavLink>

              <div data-menu className="relative">
                <button type="button" onClick={() => toggle("laptops")} aria-expanded={menu === "laptops"} aria-haspopup="true" className={dropBtn(menu === "laptops")}>
                  Laptops <Chevron open={menu === "laptops"} />
                </button>
                {menu === "laptops" && (
                  <div className={`${dropdown} left-0 w-[720px] p-3`}>
                    <div className="flex gap-3">
                      <div className="grid flex-1 grid-cols-2 gap-1">
                        {categories.map((c) => (
                          <Link key={c.name} to={c.path} className={`flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5 ${focusRing}`}>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">{c.icon}</span>
                            <span>
                              <span className="block text-sm font-semibold text-white">{c.name}</span>
                              <span className="block text-xs text-white/40">{c.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/service#gaming"
                        className={`relative flex w-52 shrink-0 flex-col justify-end overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-600/25 via-[#0a1226] to-cyan-500/10 p-4 ${focusRing}`}
                      >
                        <span className="text-xs font-semibold text-blue-300">Featured</span>
                        <span className="mt-1 text-lg font-bold text-white">Gaming laptops</span>
                        <span className="mt-1 text-xs text-white/50">Fast GPUs and high refresh rate displays.</span>
                        <span className="mt-4 inline-flex w-fit rounded-full bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white">Shop gaming</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div data-menu className="relative">
                <button type="button" onClick={() => toggle("services")} aria-expanded={menu === "services"} aria-haspopup="true" className={dropBtn(menu === "services" || servicesActive)}>
                  Services <Chevron open={menu === "services"} />
                </button>
                {menu === "services" && (
                  <div className={`${dropdown} left-0 w-[540px] p-3`}>
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((s) => (
                        <Link key={s.title} to={s.path} className={`rounded-xl p-3 transition hover:bg-white/5 ${focusRing}`}>
                          <span className="block text-sm font-semibold text-white">{s.title}</span>
                          <span className="mt-0.5 block text-xs text-white/40">{s.desc}</span>
                        </Link>
                      ))}
                    </div>
                    <Link to="/contact" className={`mt-2 flex items-center justify-between rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20 ${focusRing}`}>
                      Need help choosing a laptop? <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>

              <NavLink to="/about" className={navLink}>About</NavLink>
              <NavLink to="/contact" className={navLink}>Contact</NavLink>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* search pill (desktop) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search"
                className={`hidden h-11 items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-4 pr-2 text-sm text-white/50 transition hover:border-white/25 hover:text-white xl:flex ${focusRing}`}
              >
                <SearchIcon />
                <span className="w-24 text-left">Search</span>
                <kbd className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[11px] text-white/50">{isMac ? "⌘ K" : "Ctrl K"}</kbd>
              </button>
              <button type="button" onClick={openSearch} aria-label="Search" className={`${iconBtn} xl:hidden`}>
                <SearchIcon />
              </button>

              <div data-menu className="relative hidden sm:block">
                <button type="button" onClick={() => toggle("wishlist")} aria-label="Wishlist" aria-expanded={menu === "wishlist"} className={iconBtn}>
                  <HeartIcon />
                  {wishlistCount > 0 && <span className={badge}>{wishlistCount}</span>}
                </button>
                {menu === "wishlist" && (
                  <div className={`${dropdown} right-0 w-72 p-5 text-center`}>
                    <p className="text-sm font-semibold text-white">Wishlist</p>
                    <p className="mt-1 text-xs text-white/40">
                      {wishlistCount === 0 ? "You have no saved laptops yet." : `${wishlistCount} saved item${wishlistCount === 1 ? "" : "s"}.`}
                    </p>
                    <Link to="/service" className={`mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15 ${focusRing}`}>
                      Browse laptops
                    </Link>
                  </div>
                )}
              </div>

              <div data-menu className="relative hidden sm:block">
                <button type="button" onClick={() => toggle("bell")} aria-label="Notifications" aria-expanded={menu === "bell"} className={iconBtn}>
                  <BellIcon />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#070d1f]" />
                </button>
                {menu === "bell" && (
                  <div className={`${dropdown} right-0 w-80 p-2`}>
                    <p className="px-3 pb-1 pt-2 text-sm font-semibold text-white">Notifications</p>
                    <Link to="/service#gaming" className={`block rounded-xl px-3 py-2.5 transition hover:bg-white/5 ${focusRing}`}>
                      <span className="block text-sm text-white/90">New gaming laptops just arrived</span>
                      <span className="block text-xs text-white/40">Tap to see the new models</span>
                    </Link>
                  </div>
                )}
              </div>

              <div data-menu className="relative hidden sm:block">
                <button type="button" onClick={() => toggle("account")} aria-label="Account" aria-expanded={menu === "account"} className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-blue-500/50 hover:bg-white/10 ${focusRing}`}>
                  <UserIcon />
                </button>
                {menu === "account" && (
                  <div className={`${dropdown} right-0 w-60 p-2`}>
                    <p className="px-3 pb-2 pt-2 text-xs text-white/40">Welcome to LaptopHub</p>
                    <Link to="/signin" className={`block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white ${focusRing}`}>Sign In</Link>
                    <Link to="/signup" className={`mt-1 block rounded-xl bg-blue-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-400 ${focusRing}`}>Join VIP</Link>
                  </div>
                )}
              </div>

              <button type="button" onClick={() => setOpen((c) => !c)} aria-label="Menu" aria-expanded={open} className={`${iconBtn} xl:hidden`}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* MOBILE PANEL */}
          {open && (
            <div className="lh-pop relative z-10 max-h-[70vh] overflow-y-auto border-t border-white/10 px-4 py-4 xl:hidden">
              <div className="space-y-1">
                {mainLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-blue-500/15 text-white" : "text-white/70 hover:bg-white/5"}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {[
                { id: "laptops", label: "Laptops" },
                { id: "services", label: "Services" },
              ].map((sec) => (
                <div key={sec.id} className="mt-2 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setMobileSec((c) => (c === sec.id ? null : sec.id))}
                    aria-expanded={mobileSec === sec.id}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white/80"
                  >
                    {sec.label} <Chevron open={mobileSec === sec.id} />
                  </button>
                  {mobileSec === sec.id && (
                    <div className="border-t border-white/10 p-2">
                      {sec.id === "laptops" ? (
                        <div className="grid grid-cols-2 gap-2">
                          {categories.map((c) => (
                            <Link key={c.name} to={c.path} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-sm text-white/80 hover:bg-white/10">
                              <span>{c.icon}</span>
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        services.map((s) => (
                          <Link key={s.title} to={s.path} className="block rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                            {s.title}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                <Link to="/signin" className="rounded-full border border-white/20 py-3 text-center text-sm font-semibold text-white">Sign In</Link>
                <Link to="/signup" className="rounded-full bg-blue-500 py-3 text-center text-sm font-semibold text-white">Join VIP</Link>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 p-4 text-xs text-white/50">
                <a href={`mailto:${BRAND.support}`} className="block font-medium text-white/80">{BRAND.support}</a>
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="mt-1 block">{BRAND.phone}</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* SEARCH MODAL (command palette) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-start justify-center bg-black/70 px-4 pt-[10vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
        >
          <div role="dialog" aria-modal="true" aria-label="Search" className="lh-pop w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a1226] shadow-2xl shadow-black">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goTo(results[searchIndex] ? results[searchIndex].path : "/service");
              }}
              className="flex items-center gap-3 border-b border-white/10 px-5"
            >
              <span className="text-white/40"><SearchIcon /></span>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchIndex(0);
                }}
                placeholder="Search laptops, categories, services..."
                className="h-14 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
              <kbd className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/40">ESC</kbd>
            </form>

            {!search && (
              <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 py-3">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setSearch(q);
                      setSearchIndex(0);
                      searchRef.current?.focus();
                    }}
                    className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:border-blue-500/50 hover:text-white ${focusRing}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-white/40">No results for "{search}". Try gaming, business, student or support.</p>
              ) : (
                results.map((item, index) => {
                  const showHead = index === 0 || results[index - 1].category !== item.category;
                  const active = index === searchIndex;
                  return (
                    <React.Fragment key={`${item.name}-${item.path}`}>
                      {showHead && <p className="px-4 pb-1 pt-3 text-xs font-semibold text-white/35">{CAT_LABEL[item.category]}</p>}
                      <button
                        type="button"
                        data-idx={index}
                        onMouseMove={() => setSearchIndex(index)}
                        onClick={() => goTo(item.path)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left transition ${active ? "bg-blue-500/15" : "hover:bg-white/5"}`}
                      >
                        <span>
                          <span className="block text-sm font-medium text-white"><Highlight text={item.name} query={search} /></span>
                          <span className="block text-xs text-white/40"><Highlight text={item.description} query={search} /></span>
                        </span>
                        {active && <kbd className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50">↵</kbd>}
                      </button>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            <div className="flex gap-4 border-t border-white/10 px-5 py-3 font-mono text-[11px] text-white/40">
              <span>↑↓ Navigate</span>
              <span>Enter Select</span>
              <span>Esc Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
