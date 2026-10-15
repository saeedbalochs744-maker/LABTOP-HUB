
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

const BRAND = {
  name: "LAPTOPHUB",
  support: "support@laptophub.com",
};

const categories = [
  { name: "Gaming", description: "Power without limits", icon: "◈" },
  { name: "Business", description: "Built for productivity", icon: "▤" },
  { name: "Student", description: "Your everyday companion", icon: "⌘" },
  { name: "Premium", description: "Premium performance", icon: "✦" },
  { name: "Creator", description: "Create without limits", icon: "◇" },
];

const mainLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const quickLinks = [
  { name: "Home", path: "/", description: "Discover LaptopHub" },
  { name: "All Laptops", path: "/laptops", description: "Explore the collection" },
  { name: "About Us", path: "/about", description: "Meet LaptopHub" },
  { name: "Contact", path: "/contact", description: "Get support" },
  { name: "Sign In", path: "/signin", description: "Access your account" },
  { name: "Sign Up", path: "/signup", description: "Create an account" },
];

function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    chevron: <><path d="m7 10 5 5 5-5" /></>,
    laptop: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="1.5" />
        <path d="M2 20h20l-2-4H4l-2 4Z" />
      </>
    ),
    command: (
      <>
        <path d="M9 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        <path d="M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        <path d="M15 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
        <path d="M15 18a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
        <path d="M9 6h6M9 18h6M7 8v8M17 8v8" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.laptop}</svg>;
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchInputRef = useRef(null);
  const categoryRef = useRef(null);

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setCategoryOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    closeMenus();
    setSearchOpen(true);
    setSearchTerm("");
  }, [closeMenus]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchTerm("");
  }, []);

  useEffect(() => {
    closeMenus();
    closeSearch();
  }, [location.pathname, location.search, closeMenus, closeSearch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        openSearch();
      }

      if (event.key === "Escape") {
        closeMenus();
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch, closeMenus, closeSearch]);

  useEffect(() => {
    if (!categoryOpen) return;

    const handleOutsideClick = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [categoryOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [searchOpen]);

  const filteredLinks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const allLinks = [
      ...quickLinks,
      ...categories.map((category) => ({
        name: `${category.name} Laptops`,
        path: `/laptops?category=${encodeURIComponent(category.name)}`,
        description: category.description,
      })),
    ];

    if (!query) return allLinks;

    return allLinks.filter((item) =>
      `${item.name} ${item.description}`.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  const goTo = (path) => {
    closeMenus();
    closeSearch();
    navigate(path);
  };

  const navLinkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-500/10 text-blue-300"
        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#070b14]/95 text-white backdrop-blur-2xl">
        {/* Slim status strip */}
        <div className="border-b border-white/[0.05] bg-[#050810]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              <span className="truncate">Your next-level tech starts here</span>
            </div>
            <a
              href={`mailto:${BRAND.support}`}
              className="hidden shrink-0 transition hover:text-blue-300 sm:inline"
            >
              Need help? Contact support
            </a>
            <span className="shrink-0 sm:hidden">Gaming • Work • Create</span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center justify-between gap-4">
            {/* Brand */}
            <Link
              to="/"
              onClick={closeMenus}
              aria-label="LaptopHub home"
              className="group flex shrink-0 items-center gap-3"
            >
              <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-blue-400/25 bg-blue-500/[0.09] text-blue-300 transition duration-300 group-hover:border-blue-300/60 group-hover:bg-blue-500/[0.16]">
                <Icon name="laptop" size={23} />
              </span>

              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-black tracking-[0.12em] sm:text-[19px]">
                  LAPTOP<span className="text-blue-400">HUB</span>
                </span>
                <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Gear up. Level up.
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {mainLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={navLinkClass}
                >
                  {item.name}
                </NavLink>
              ))}

              <div ref={categoryRef} className="relative">
                <button
                  type="button"
                  aria-expanded={categoryOpen}
                  aria-haspopup="true"
                  onClick={() => setCategoryOpen((open) => !open)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    categoryOpen
                      ? "bg-blue-500/10 text-blue-300"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  Explore
                  <Icon
                    name="chevron"
                    size={15}
                    className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {categoryOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-4 w-[390px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220] p-3 shadow-2xl shadow-black/50">
                    <div className="flex items-center justify-between px-3 pb-3 pt-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                          Find your machine
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Choose your performance class
                        </p>
                      </div>
                      <Icon name="command" size={22} className="text-slate-500" />
                    </div>

                    <div className="grid gap-1">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          type="button"
                          onClick={() =>
                            goTo(
                              `/laptops?category=${encodeURIComponent(category.name)}`
                            )
                          }
                          className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-blue-500/[0.09]"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-lg text-blue-300 transition group-hover:border-blue-400/30 group-hover:bg-blue-500/10">
                            {category.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-slate-100">
                              {category.name} Laptops
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                              {category.description}
                            </span>
                          </span>
                          <Icon
                            name="arrow"
                            size={16}
                            className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-300"
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => goTo("/laptops")}
                      className="mt-2 flex w-full items-center justify-between rounded-xl border border-blue-400/15 bg-blue-500/[0.06] px-4 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/[0.12]"
                    >
                      Explore all laptops
                      <Icon name="arrow" size={17} />
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Search + account */}
            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search LaptopHub"
                className="group flex h-10 items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.03] px-3 text-slate-400 transition hover:border-blue-400/30 hover:bg-white/[0.06] hover:text-white"
              >
                <Icon name="search" size={17} />
                <span className="hidden text-xs xl:inline">Search anything</span>
                <kbd className="hidden rounded border border-white/10 bg-black/20 px-1.5 py-1 text-[10px] text-slate-500 xl:inline">
                  Ctrl K
                </kbd>
              </button>

              <Link
                to="/signin"
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:border-blue-300 hover:bg-blue-400"
              >
                Get started
                <Icon
                  name="arrow"
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Tablet/mobile actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-blue-400/30 hover:text-blue-300"
              >
                <Icon name="search" size={19} />
              </button>
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((open) => !open)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:border-blue-400/30 hover:text-blue-300"
              >
                <Icon name={mobileOpen ? "close" : "menu"} size={21} />
              </button>
            </div>
          </div>

          {/* Compact category shortcuts */}
          <div className="hidden items-center gap-2 overflow-x-auto border-t border-white/[0.05] py-2.5 md:flex">
            <span className="mr-1 shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Discover
            </span>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/laptops?category=${encodeURIComponent(category.name)}`}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-blue-500/[0.08] hover:text-blue-200"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/laptops"
              className="ml-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-300 transition hover:text-blue-200"
            >
              All laptops <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="border-t border-white/[0.08] bg-[#080d18] px-4 pb-5 pt-3 md:hidden">
            <nav aria-label="Mobile navigation" className="space-y-1">
              {mainLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-500/10 text-blue-300"
                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="px-4 pb-1 pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Browse categories
              </div>

              <div className="grid grid-cols-2 gap-2 px-1">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      goTo(
                        `/laptops?category=${encodeURIComponent(category.name)}`
                      )
                    }
                    className="flex min-h-[70px] items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
                  >
                    <span className="text-lg text-blue-300">
                      {category.icon}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4">
                <Link
                  to="/signin"
                  onClick={closeMenus}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:bg-white/[0.05]"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenus}
                  className="rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-400"
                >
                  Get started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Command palette */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 px-4 pt-[12vh] backdrop-blur-sm sm:pt-[16vh]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Search LaptopHub"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              <Icon name="search" size={21} className="shrink-0 text-blue-300" />
              <input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filteredLinks[0]) {
                    goTo(filteredLinks[0].path);
                  }
                }}
                placeholder="Search pages, categories, laptops..."
                aria-label="Search pages and categories"
                className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-bold text-slate-400 transition hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-3">
              <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {searchTerm ? "Search results" : "Quick navigation"}
              </p>

              {filteredLinks.length ? (
                <div className="space-y-1">
                  {filteredLinks.map((item) => (
                    <button
                      key={`${item.name}-${item.path}`}
                      type="button"
                      onClick={() => goTo(item.path)}
                      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-blue-500/[0.09]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-blue-300">
                        <Icon name="laptop" size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-200">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {item.description}
                        </span>
                      </span>
                      <Icon
                        name="arrow"
                        size={16}
                        className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-300"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-10 text-center">
                  <Icon
                    name="search"
                    size={28}
                    className="mx-auto text-slate-600"
                  />
                  <p className="mt-3 text-sm font-semibold text-slate-300">
                    No matching results
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try another page or category name.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 text-[10px] text-slate-500">
              <span>LAPTOPHUB · GEAR UP. LEVEL UP.</span>
              <span>ENTER TO OPEN</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
