import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

/* ============================================================
   LAPTOPHUB NAVBAR  (dark only, no cart, animated lines bg)
   No download needed - the animation is pure CSS.
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
  { name: "Sign In", description: "Access your account", category: "Account", path: "/signin", keywords: "login signin account" },
  { name: "Sign Up", description: "Create an account", category: "Account", path: "/signup", keywords: "register signup" },
  { name: "Gaming Laptops", description: "High-performance gaming laptops", category: "Category", path: "/service#gaming", keywords: "gaming gpu games" },
  { name: "Business Laptops", description: "Professional laptops for work", category: "Category", path: "/service#business", keywords: "business office work" },
  { name: "Student Laptops", description: "Affordable laptops for students", category: "Category", path: "/service#student", keywords: "student school university" },
  { name: "Creator Laptops", description: "Laptops for creators", category: "Category", path: "/service#creator", keywords: "creator editing design video" },
  { name: "Ultrabooks", description: "Thin and lightweight laptops", category: "Category", path: "/service#ultrabook", keywords: "thin light portable" },
  { name: "Workstations", description: "Professional workstations", category: "Category", path: "/service#workstation", keywords: "workstation engineering" },
  { name: "Technical Support", description: "Get technical help", category: "Service", path: "/service#support", keywords: "technical support help" },
  { name: "Warranty", description: "Warranty coverage details", category: "Service", path: "/service#warranty", keywords: "warranty guarantee" },
];

/* ============================================================
   ICONS
   ============================================================ */

const Svg = ({ size = "h-5 w-5", children }) => (
  <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
   ANIMATED LINES BACKGROUND
   Dark zigzag lines travel across the navbar from all 4 directions, then fade out.
   ============================================================ */

/* axis "x" = travels left/right, axis "y" = travels up/down
   rev  false = right / down,  true = left / up                */
const ZIGS = [
  // left <-> right
  { axis: "x", rev: false, color: "#1d4ed8", step: 70, amp: 36, mid: 60, dur: 6, delay: 0 },
  { axis: "x", rev: true, color: "#6d28d9", step: 90, amp: 30, mid: 50, dur: 7.5, delay: 1.5 },
  { axis: "x", rev: false, color: "#0369a1", step: 55, amp: 42, mid: 70, dur: 8, delay: 3.5 },
  { axis: "x", rev: true, color: "#3730a3", step: 80, amp: 34, mid: 60, dur: 6.5, delay: 4.5 },
  // top <-> bottom
  { axis: "y", rev: false, color: "#1d4ed8", step: 20, amp: 26, mid: 200, dur: 4, delay: 0.8 },
  { axis: "y", rev: true, color: "#6d28d9", step: 20, amp: 26, mid: 480, dur: 4, delay: 2.2 },
  { axis: "y", rev: false, color: "#0369a1", step: 20, amp: 26, mid: 760, dur: 4.5, delay: 3.6 },
  { axis: "y", rev: true, color: "#3730a3", step: 20, amp: 26, mid: 1020, dur: 4.2, delay: 5 },
];

const buildZigzag = ({ axis, step, amp, mid }) => {
  if (axis === "x") {
    let d = `M0,${mid}`;
    for (let x = step, i = 1; x <= 1200 + step; x += step, i++) {
      d += ` L${x},${mid + (i % 2 ? -amp : amp)}`;
    }
    return d;
  }
  let d = `M${mid},0`;
  for (let y = step, i = 1; y <= 120 + step; y += step, i++) {
    d += ` L${mid + (i % 2 ? -amp : amp)},${y}`;
  }
  return d;
};

function LinesBackground() {
  const paths = useMemo(() => ZIGS.map((z) => ({ ...z, d: buildZigzag(z) })), []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
      <style>{`
        @keyframes lh-zig {
          0%   { stroke-dashoffset: 0.22; opacity: 0; }
          8%   { opacity: 1; }
          62%  { opacity: 1; }
          70%  { stroke-dashoffset: -1; opacity: 0; }
          100% { stroke-dashoffset: -1; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lh-zig { animation: none !important; opacity: .35; }
        }
      `}</style>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        {paths.map((p, i) => (
          <g key={i} fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d={p.d} stroke={p.color} strokeOpacity="0.15" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path
              d={p.d}
              pathLength="1"
              stroke={p.color}
              strokeWidth="2"
              strokeDasharray="0.22 1.3"
              vectorEffect="non-scaling-stroke"
              className="lh-zig"
              style={{
                opacity: 0,
                filter: `drop-shadow(0 0 3px ${p.color})`,
                animation: `lh-zig ${p.dur}s linear ${p.delay}s infinite ${p.rev ? "reverse" : "normal"}`,
              }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
    </div>
  );
}

/* ============================================================
   SHARED STYLES
   ============================================================ */

const iconBtn =
  "relative flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white";
const dropdown =
  "absolute top-full z-50 mt-3 rounded-2xl border border-white/10 bg-[#0a1226] shadow-2xl shadow-black/80";

/* ============================================================
   NAVBAR
   ============================================================ */

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const searchRef = useRef(null);

  const toggle = (name) => setMenu((c) => (c === name ? null : name));
  const servicesActive = location.pathname.startsWith("/service");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return searchItems;
    return searchItems.filter((item) =>
      `${item.name} ${item.description} ${item.category} ${item.keywords}`.toLowerCase().includes(q)
    );
  }, [search]);

  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("laptophub_wishlist_count") || 0);
      if (Number.isFinite(saved) && saved >= 0) setWishlistCount(saved);
    } catch {}
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

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
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

  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest("[data-menu]")) setMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const navLink = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
    }`;

  const badge =
    "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#070d1f] bg-blue-500 px-1 text-[10px] font-bold text-white";

  const dropBtn = (active) =>
    `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
      active ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
    }`;

  return (
    <>
      <header className="sticky top-0 z-[100] px-3 pt-3 sm:px-5">
        <div className="relative mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#070d1f]/95 shadow-2xl shadow-black/60 backdrop-blur-xl">
          {/* ANIMATED LINES (behind everything) */}
          <LinesBackground />

          {/* top blue glow */}
          <div className="pointer-events-none absolute inset-x-10 -top-px z-10 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* ANNOUNCEMENT STRIP */}
          <div className="relative z-10 hidden items-center justify-center gap-4 border-b border-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
            <span>Genuine laptops</span>
            <span className="text-blue-500">◆</span>
            <span>Free shipping on selected models</span>
            <span className="text-blue-500">◆</span>
            <span>Expert support</span>
          </div>

          {/* MAIN ROW */}
          <div className="relative z-10 flex h-20 items-center justify-between gap-4 px-4 sm:px-6">
            {/* LOGO */}
            <Link to="/" className="flex shrink-0 items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/40 bg-[#030816] text-lg font-black text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                L<span className="text-blue-500">H</span>
              </span>
              <span className="leading-none">
                <span className="block text-2xl font-black tracking-tight text-white">
                  LAPTOP<span className="font-semibold text-blue-500">HUB</span>
                </span>
                <span className="mt-1.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                  <span className="h-px w-8 bg-white/30" />
                  Est. 2026
                </span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-1 xl:flex">
              <NavLink to="/" end className={navLink}>Home</NavLink>

              <div data-menu className="relative">
                <button type="button" onClick={() => toggle("laptops")} className={dropBtn(menu === "laptops")}>
                  Laptops <Chevron open={menu === "laptops"} />
                </button>
                {menu === "laptops" && (
                  <div className={`${dropdown} left-0 w-[540px] p-3`}>
                    <div className="grid grid-cols-2 gap-1">
                      {categories.map((c) => (
                        <Link key={c.name} to={c.path} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">{c.icon}</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">{c.name}</span>
                            <span className="block text-xs text-white/40">{c.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div data-menu className="relative">
                <button type="button" onClick={() => toggle("services")} className={dropBtn(menu === "services" || servicesActive)}>
                  Services <Chevron open={menu === "services"} />
                </button>
                {menu === "services" && (
                  <div className={`${dropdown} left-0 w-[540px] p-3`}>
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((s) => (
                        <Link key={s.title} to={s.path} className="rounded-xl p-3 transition hover:bg-white/5">
                          <span className="block text-sm font-semibold text-white">{s.title}</span>
                          <span className="mt-0.5 block text-xs text-white/40">{s.desc}</span>
                        </Link>
                      ))}
                    </div>
                    <Link to="/contact" className="mt-2 flex items-center justify-between rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20">
                      Need help choosing a laptop? <span>→</span>
                    </Link>
                  </div>
                )}
              </div>

              <NavLink to="/about" className={navLink}>About</NavLink>
              <NavLink to="/contact" className={navLink}>Contact</NavLink>
            </nav>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button type="button" onClick={openSearch} aria-label="Search" className={iconBtn}>
                <SearchIcon />
              </button>

              <div data-menu className="relative hidden sm:block">
                <button type="button" onClick={() => toggle("wishlist")} aria-label="Wishlist" className={iconBtn}>
                  <HeartIcon />
                  {wishlistCount > 0 && <span className={badge}>{wishlistCount}</span>}
                </button>
                {menu === "wishlist" && (
                  <div className={`${dropdown} right-0 w-72 p-5 text-center`}>
                    <p className="text-sm font-semibold text-white">Wishlist</p>
                    <p className="mt-1 text-xs text-white/40">
                      {wishlistCount === 0
                        ? "You have no saved laptops yet."
                        : `${wishlistCount} saved item${wishlistCount === 1 ? "" : "s"}.`}
                    </p>
                  </div>
                )}
              </div>

              <div data-menu className="relative hidden sm:block">
                <button type="button" onClick={() => toggle("bell")} aria-label="Notifications" className={iconBtn}>
                  <BellIcon />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#070d1f]" />
                </button>
                {menu === "bell" && (
                  <div className={`${dropdown} right-0 w-72 p-5`}>
                    <p className="text-sm font-semibold text-white">Notifications</p>
                    <p className="mt-2 text-xs text-white/50">🔥 New gaming laptops just arrived.</p>
                  </div>
                )}
              </div>

              <div data-menu className="relative hidden sm:block">
                <button type="button" onClick={() => toggle("account")} aria-label="Account" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10">
                  <UserIcon />
                </button>
                {menu === "account" && (
                  <div className={`${dropdown} right-0 w-56 p-2`}>
                    <Link to="/signin" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white">Sign In</Link>
                    <Link to="/signup" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white">Create Account</Link>
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
            <div className="relative z-10 max-h-[70vh] overflow-y-auto border-t border-white/10 px-4 py-4 xl:hidden">
              <div className="space-y-1">
                {mainLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive ? "bg-blue-500/15 text-white" : "text-white/70 hover:bg-white/5"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <p className="mt-5 px-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">Laptops</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link key={c.name} to={c.path} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-white/80 hover:bg-white/5">
                    <span>{c.icon}</span>
                    {c.name}
                  </Link>
                ))}
              </div>

              <p className="mt-5 px-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">Services</p>
              <div className="mt-2 space-y-1">
                {services.map((s) => (
                  <Link key={s.title} to={s.path} className="block rounded-xl px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    {s.title}
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
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

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-start justify-center bg-black/70 px-4 pt-[10vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a1226] shadow-2xl">
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
              <kbd className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-white/40">ESC</kbd>
            </form>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-white/40">No results. Try gaming, business, student or services.</p>
              ) : (
                results.map((item, index) => (
                  <button
                    key={`${item.name}-${item.path}`}
                    type="button"
                    onClick={() => goTo(item.path)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                      index === searchIndex ? "bg-blue-500/15" : "hover:bg-white/5"
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-medium text-white">{item.name}</span>
                      <span className="block text-xs text-white/40">{item.description}</span>
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase text-white/50">{item.category}</span>
                  </button>
                ))
              )}
            </div>

            <div className="flex gap-4 border-t border-white/10 px-5 py-3 text-[11px] text-white/40">
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
