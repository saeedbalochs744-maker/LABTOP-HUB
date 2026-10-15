import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", to: "/", end: true },
  { label: "Laptops", to: "/laptops" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const CATEGORIES = [
  {
    name: "Gaming",
    description: "High refresh rate screens and dedicated GPUs for competitive play.",
    chips: ["RTX graphics", "144Hz+", "Liquid cooling"],
    icon: "gamepad",
  },
  {
    name: "Business",
    description: "Light, secure and built to last through a full workday.",
    chips: ["All-day battery", "Fingerprint", "Under 1.5 kg"],
    icon: "briefcase",
  },
  {
    name: "Student",
    description: "Affordable machines for classes, coding and streaming.",
    chips: ["Budget friendly", "Portable", "Fast SSD"],
    icon: "book",
  },
  {
    name: "Premium",
    description: "Top-tier displays and power for creators and engineers.",
    chips: ["OLED / mini-LED", "32GB+ RAM", "Aluminium body"],
    icon: "bolt",
  },
];

const BUDGETS = [
  { label: "Under $1,000", value: "under-1000" },
  { label: "$1,000 – $1,500", value: "1000-1500" },
  { label: "$1,500 and up", value: "1500-plus" },
];

const PAGES = [
  { title: "Home", subtitle: "Main page", to: "/", group: "Pages", icon: "home" },
  { title: "All laptops", subtitle: "Browse the full collection", to: "/laptops", group: "Pages", icon: "laptop" },
  { title: "About LaptopHub", subtitle: "Who we are", to: "/about", group: "Pages", icon: "info" },
  { title: "Contact", subtitle: "Talk to our team", to: "/contact", group: "Pages", icon: "mail" },
  { title: "Sign in", subtitle: "Access your account", to: "/signin", group: "Account", icon: "user" },
  { title: "Create account", subtitle: "Join LaptopHub", to: "/signup", group: "Account", icon: "plus" },
];

const SEARCH_ITEMS = [
  ...PAGES.filter((p) => p.group === "Pages"),
  ...CATEGORIES.map((c) => ({
    title: `${c.name} laptops`,
    subtitle: c.description,
    to: `/laptops?category=${encodeURIComponent(c.name)}`,
    group: "Categories",
    icon: c.icon,
  })),
  ...BUDGETS.map((b) => ({
    title: `Gaming ${b.label.toLowerCase()}`,
    subtitle: "Quick budget filter",
    to: `/laptops?category=Gaming&budget=${b.value}`,
    group: "Quick filters",
    icon: "tag",
  })),
  ...PAGES.filter((p) => p.group === "Account"),
];

const ANNOUNCEMENTS = [
  "Free delivery on orders over $999",
  "2-year warranty on every gaming laptop",
  "Need help choosing? support@laptophub.com",
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></>,
    arrow: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
    diagonal: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
    laptop: <><rect x="5" y="4" width="14" height="12" rx="1.5" /><path d="M2.5 19h19l-2-3H4.5z" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6" /></>,
    cart: <><path d="M3 4h2.5l2.2 10.5h9.6L19.5 8H6.5" /><circle cx="9.5" cy="19" r="1.3" /><circle cx="16.5" cy="19" r="1.3" /></>,
    heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
    gamepad: <><path d="M7 8h10a4 4 0 0 1 4 4.2l-.5 3.3a2.3 2.3 0 0 1-4 1.2L15 15H9l-1.5 1.7a2.3 2.3 0 0 1-4-1.2L3 12.200A4 4 0 0 1 7 8z" /><path d="M8 10.500v3M6.500 12h3" /><circle cx="15.500" cy="11.500" r=".6" /><circle cx="17.200" cy="13" r=".6" /></>,
    briefcase: <><rect x="3.500" y="7.500" width="17" height="12" rx="1.500" /><path d="M9 7.500V6a1.500 1.500 0 0 1 1.500-1.500h3A1.500 1.500 0 0 1 15 6v1.500M3.500 13h17" /></>,
    book: <><path d="M5 4.500h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h10" /></>,
    bolt: <path d="M13 3 5 13.500h6L10 21l8-10.500h-6z" />,
    home: <><path d="M4 11 12 4l8 7" /><path d="M6 10v9.500h12V10" /></>,
    info: <><circle cx="12" cy="12" r="8.500" /><path d="M12 11v5M12 8v.1" /></>,
    mail: <><rect x="3.500" y="5.500" width="17" height="13" rx="1.500" /><path d="m4 7 8 6 8-6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    tag: <><path d="M3.500 12.500 12 4h7.500V11.500L11 20z" /><circle cx="15.500" cy="8.500" r="1" /></>,
    corner: <><path d="M9 10 4 15l5 5" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [compact, setCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  const [announceIndex, setAnnounceIndex] = useState(0);

  const searchInput = useRef(null);
  const megaWrap = useRef(null);
  const hoverTimer = useRef(null);
  const resultsRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const activeCategory =
    location.pathname === "/laptops"
      ? new URLSearchParams(location.search).get("category")
      : null;
  const laptopsActive = location.pathname === "/laptops" && !activeCategory;

  /* Close everything on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileCatsOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [location.pathname, location.search]);

  /* Scroll: compact state + progress line */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setCompact(y > 35);
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Rotating announcement */
  useEffect(() => {
    const id = window.setInterval(
      () => setAnnounceIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      4500
    );
    return () => window.clearInterval(id);
  }, []);

  /* Lock page scroll while the drawer or search is open */
  useEffect(() => {
    const lock = mobileOpen || searchOpen;
    const previous = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen, searchOpen]);

  /* Close the mega menu when clicking outside it */
  useEffect(() => {
    if (!megaOpen) return undefined;
    const onDown = (event) => {
      if (megaWrap.current && !megaWrap.current.contains(event.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [megaOpen]);

  /* Search results, grouped in display order */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS;
    return SEARCH_ITEMS.filter((item) =>
      `${item.title} ${item.subtitle} ${item.group}`.toLowerCase().includes(q)
    );
  }, [query]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMegaOpen(false);
    setMobileOpen(false);
    setSelected(0);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);

  const choose = useCallback(
    (item) => {
      if (!item) return;
      navigate(item.to);
      closeSearch();
    },
    [navigate, closeSearch]
  );

  /* Global shortcuts. Arrow keys work while the search box is focused. */
  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const typingElsewhere =
        target instanceof HTMLElement &&
        target !== searchInput.current &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchOpen ? closeSearch() : openSearch();
        return;
      }

      if (event.key === "/" && !searchOpen && !typingElsewhere) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
        if (searchOpen) closeSearch();
        return;
      }

      if (!searchOpen || typingElsewhere) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((i) => Math.min(i + 1, results.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((i) => Math.max(i - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        choose(results[selected]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, results, selected, openSearch, closeSearch, choose]);

  /* Focus the input when the palette opens */
  useEffect(() => {
    if (!searchOpen) return undefined;
    const id = window.setTimeout(() => searchInput.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [searchOpen]);

  /* Keep the highlighted result in view */
  useEffect(() => {
    const node = resultsRef.current?.querySelector('[data-selected="true"]');
    node?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  /* Hover intent for the mega menu (mouse only) */
  const hoverOpen = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(true), 120);
  };
  const hoverClose = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 220);
  };
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  /* Build grouped search list while keeping flat indexes for keyboard nav */
  let flatIndex = -1;
  const groups = results.reduce((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {});

  return (
    <>
      <style>{CSS}</style>

      <header className={`lhx ${compact ? "is-compact" : ""}`}>
        {/* Announcement bar */}
        <div className="lhx-announce">
          <div className="lhx-wrap lhx-announce-row">
            <p key={announceIndex} className="lhx-announce-text" aria-live="polite">
              {ANNOUNCEMENTS[announceIndex]}
            </p>
            <Link to="/contact" className="lhx-announce-link">
              Talk to an expert
            </Link>
          </div>
        </div>

        {/* Main bar */}
        <div className="lhx-wrap lhx-main">
          <Link to="/" className="lhx-brand" aria-label="LaptopHub home">
            <span className="lhx-logo" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22">
                <path d="M6 5h6v16h14v6H6z" fill="currentColor" />
              </svg>
            </span>
            <span className="lhx-brand-copy">
              <span className="lhx-brand-name">
                Laptop<b>Hub</b>
              </span>
              <span className="lhx-brand-sub">Performance laptops</span>
            </span>
          </Link>

          <nav className="lhx-links" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => `lhx-link ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <Link to="/laptops" className={`lhx-link ${laptopsActive ? "active" : ""}`}>
              Laptops
            </Link>

            <span className="lhx-divider" aria-hidden="true" />

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/laptops?category=${encodeURIComponent(cat.name)}`}
                className={`lhx-link ${activeCategory === cat.name ? "active" : ""}`}
              >
                <Icon name={cat.icon} size={15} />
                {cat.name}
              </Link>
            ))}

            <span className="lhx-divider" aria-hidden="true" />

            <NavLink to="/about" className={({ isActive }) => `lhx-link ${isActive ? "active" : ""}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `lhx-link ${isActive ? "active" : ""}`}>
              Contact
            </NavLink>
          </nav>

          <div className="lhx-actions">
            <button
              type="button"
              className="lhx-search"
              onClick={openSearch}
              aria-label="Search the site (Ctrl K)"
            >
              <Icon name="search" size={17} />
              <span className="lhx-search-text">Search laptops and pages</span>
              <kbd>Ctrl K</kbd>
            </button>

            <Link to="/wishlist" className="lhx-icon-btn lhx-hide-sm" aria-label={`Wishlist, ${wishlistCount} items`}>
              <Icon name="heart" size={18} />
              {wishlistCount > 0 && <span className="lhx-badge">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="lhx-icon-btn" aria-label={`Cart, ${cartCount} items`}>
              <Icon name="cart" size={18} />
              {cartCount > 0 && <span className="lhx-badge">{cartCount}</span>}
            </Link>

            <Link to="/signin" className="lhx-signin">
              <Icon name="user" size={16} /> Sign in
            </Link>

            <Link to="/signup" className="lhx-join">
              Join LaptopHub
            </Link>

            <button
              type="button"
              className="lhx-burger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((o) => !o);
                setMegaOpen(false);
              }}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={21} />
            </button>
          </div>
        </div>

        <div className="lhx-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lhx-drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setMobileOpen(false)}>
          <aside className="lhx-drawer" aria-label="Mobile menu">
            <div className="lhx-drawer-head">
              <span className="lhx-brand-name">
                Laptop<b>Hub</b>
              </span>
              <button type="button" className="lhx-icon-btn" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <Icon name="close" size={19} />
              </button>
            </div>

            <button type="button" className="lhx-drawer-search" onClick={openSearch}>
              <Icon name="search" size={17} /> Search laptops and pages
            </button>

            <nav className="lhx-drawer-links">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.label}
                  <Icon name="arrow" size={16} />
                </NavLink>
              ))}

              <div className="lhx-drawer-label">Categories</div>
              <div className="lhx-drawer-sub">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/laptops?category=${encodeURIComponent(cat.name)}`}
                    className={activeCategory === cat.name ? "active" : ""}
                  >
                    <Icon name={cat.icon} size={17} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="lhx-drawer-foot">
              <Link to="/signin" className="lhx-signin">
                <Icon name="user" size={16} /> Sign in
              </Link>
              <Link to="/signup" className="lhx-join">
                Join LaptopHub
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Command palette */}
      {searchOpen && (
        <div className="lhx-cmd-backdrop" onMouseDown={(e) => e.target === e.currentTarget && closeSearch()}>
          <section className="lhx-cmd" role="dialog" aria-modal="true" aria-label="Site search">
            <div className="lhx-cmd-top">
              <Icon name="search" size={19} />
              <input
                ref={searchInput}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder="Search a category, budget or page"
                aria-label="Search"
                autoComplete="off"
              />
              <button type="button" onClick={closeSearch} aria-label="Close search">
                <kbd>Esc</kbd>
              </button>
            </div>

            <div className="lhx-cmd-results" ref={resultsRef}>
              {results.length === 0 ? (
                <div className="lhx-cmd-empty">
                  <strong>No results for “{query}”</strong>
                  <span>Try “gaming”, “student” or “contact”.</span>
                </div>
              ) : (
                Object.entries(groups).map(([group, items]) => (
                  <div key={group} className="lhx-cmd-group">
                    <div className="lhx-cmd-label">{group}</div>
                    {items.map((item) => {
                      flatIndex += 1;
                      const index = flatIndex;
                      const active = index === selected;
                      return (
                        <button
                          key={item.to + item.title}
                          type="button"
                          data-selected={active}
                          className={`lhx-cmd-item ${active ? "selected" : ""}`}
                          onMouseMove={() => setSelected(index)}
                          onClick={() => choose(item)}
                        >
                          <span className="lhx-cmd-ico">
                            <Icon name={item.icon} size={17} />
                          </span>
                          <span className="lhx-cmd-copy">
                            <strong>{item.title}</strong>
                            <small>{item.subtitle}</small>
                          </span>
                          {active && <Icon name="corner" size={15} />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="lhx-cmd-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> Move</span>
              <span><kbd>Enter</kbd> Open</span>
              <span><kbd>/</kbd> Open search from anywhere</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap");

.lhx, .lhx *, .lhx-cmd-backdrop, .lhx-cmd-backdrop *, .lhx-drawer-backdrop, .lhx-drawer-backdrop * { box-sizing: border-box; }

.lhx, .lhx-cmd-backdrop, .lhx-drawer-backdrop {
  --bg: #0d0f12;
  --panel: #151a22;
  --panel-2: #1b212b;
  --line: #262d39;
  --text: #eef2f6;
  --muted: #98a2b3;
  --ember: #ff5b1f;
  --ember-hover: #ff7340;
  --ice: #7fd8ff;
  font-family: "Sora", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--text);
}

.lhx {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: rgba(13, 15, 18, .94);
  backdrop-filter: saturate(1.4) blur(14px);
  border-bottom: 1px solid var(--line);
}
.lhx a { color: inherit; text-decoration: none; }
.lhx button, .lhx-cmd-backdrop button, .lhx-drawer-backdrop button { font: inherit; color: inherit; }
.lhx :focus-visible, .lhx-cmd-backdrop :focus-visible, .lhx-drawer-backdrop :focus-visible {
  outline: 2px solid var(--ice);
  outline-offset: 2px;
}

.lhx-wrap { width: min(1400px, calc(100% - 56px)); margin: 0 auto; }

/* Announcement */
.lhx-announce { background: var(--ember); color: #1a0a03; font-size: 12px; font-weight: 600; transition: margin .25s ease, opacity .25s ease; }
.lhx-announce-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 34px; }
.lhx-announce-text { margin: 0; animation: lhx-swap .4s ease both; }
.lhx-announce-link { text-decoration: underline !important; text-underline-offset: 3px; white-space: nowrap; }
.lhx.is-compact .lhx-announce { margin-top: -34px; opacity: 0; pointer-events: none; }

/* Main bar */
.lhx-main { display: flex; align-items: center; justify-content: space-between; gap: 24px; min-height: 80px; transition: min-height .25s ease; }
.lhx.is-compact .lhx-main { min-height: 64px; }

.lhx-brand { display: inline-flex; align-items: center; gap: 12px; flex: 0 0 auto; }
.lhx-logo { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 10px; background: var(--ember); color: #1a0a03; }
.lhx-brand-copy { display: flex; flex-direction: column; gap: 3px; }
.lhx-brand-name { font-size: 19px; font-weight: 800; letter-spacing: -.04em; line-height: 1; }
.lhx-brand-name b { color: var(--ember); font-weight: 800; }
.lhx-brand-sub { font-size: 11px; color: var(--muted); font-weight: 500; }

.lhx-links { display: flex; align-items: center; gap: 2px; }
.lhx-link {
  position: relative; display: inline-flex; align-items: center; gap: 6px; min-height: 42px; padding: 0 14px;
  color: var(--muted) !important; background: transparent; border: 0; border-radius: 10px; cursor: pointer;
  font-size: 13.5px; font-weight: 600; transition: color .2s ease, background .2s ease;
}
.lhx-link:hover, .lhx-link.open { color: var(--text) !important; background: var(--panel); }
.lhx-link.active { color: var(--text) !important; }
.lhx-link.active::after {
  content: ""; position: absolute; left: 14px; right: 14px; bottom: 3px; height: 2px; border-radius: 2px; background: var(--ember);
}
.lhx-divider { width: 1px; height: 20px; margin: 0 6px; background: var(--line); }
.lhx-link svg { color: var(--ember); flex: 0 0 auto; }
.lhx-cat-btn svg { transition: transform .2s ease; }
.lhx-cat-btn.open svg { transform: rotate(180deg); }

/* Mega menu */
.lhx-cats { position: relative; }
.lhx-mega {
  position: absolute; top: calc(100% + 14px); left: 50%; transform: translateX(-42%);
  display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 0;
  width: min(900px, calc(100vw - 48px)); overflow: hidden;
  background: var(--panel); border: 1px solid var(--line); border-radius: 18px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, .55); animation: lhx-pop .18s ease both;
}
.lhx-mega::before { content: ""; position: absolute; top: -16px; left: 0; right: 0; height: 16px; }
.lhx-mega-list { display: grid; gap: 4px; padding: 14px; }
.lhx-cat-row {
  display: grid; grid-template-columns: 44px minmax(0, 1fr) 28px; gap: 14px; align-items: start;
  padding: 14px; border-radius: 12px; border: 1px solid transparent; transition: background .2s ease, border-color .2s ease;
}
.lhx-cat-row:hover, .lhx-cat-row:focus-visible { background: var(--panel-2); border-color: var(--line); }
.lhx-cat-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 12px; background: #0d0f12; color: var(--ember); border: 1px solid var(--line); }
.lhx-cat-body { display: grid; gap: 5px; }
.lhx-cat-body strong { font-size: 14px; font-weight: 700; }
.lhx-cat-body > span { font-size: 12px; color: var(--muted); line-height: 1.55; }
.lhx-chips { display: flex !important; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.lhx-chips em { font-style: normal; font-size: 11px; font-weight: 600; color: var(--ice); padding: 3px 8px; border-radius: 999px; background: rgba(127, 216, 255, .08); border: 1px solid rgba(127, 216, 255, .18); }
.lhx-cat-go { color: var(--muted); opacity: 0; transform: translate(-4px, 4px); transition: opacity .2s ease, transform .2s ease; }
.lhx-cat-row:hover .lhx-cat-go, .lhx-cat-row:focus-visible .lhx-cat-go { opacity: 1; transform: none; color: var(--ember); }

.lhx-mega-side { padding: 28px 26px; background: #10141b; border-left: 1px solid var(--line); display: flex; flex-direction: column; }
.lhx-mega-side h3 { margin: 0; font-size: 18px; letter-spacing: -.03em; }
.lhx-mega-side p { margin: 8px 0 18px; font-size: 12.5px; line-height: 1.65; color: var(--muted); }
.lhx-budget { display: grid; gap: 8px; }
.lhx-budget a {
  display: flex; align-items: center; justify-content: space-between; padding: 13px 14px; border-radius: 10px;
  background: var(--panel); border: 1px solid var(--line); font-size: 13px; font-weight: 600; transition: border-color .2s ease, color .2s ease;
}
.lhx-budget a:hover { border-color: var(--ember); color: var(--ember); }
.lhx-mega-all { margin-top: auto; padding-top: 18px; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--ember); }

/* Actions */
.lhx-actions { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.lhx-search {
  display: inline-flex; align-items: center; gap: 10px; min-height: 42px; padding: 0 10px 0 13px; border-radius: 10px;
  background: var(--panel); border: 1px solid var(--line); color: var(--muted); cursor: pointer; transition: border-color .2s ease, color .2s ease;
}
.lhx-search:hover { border-color: #3a4558; color: var(--text); }
.lhx-search-text { font-size: 12.5px; font-weight: 500; min-width: 150px; text-align: left; }
.lhx kbd, .lhx-cmd-backdrop kbd {
  font: 600 10.5px "Sora", system-ui, sans-serif; padding: 3px 6px; border-radius: 6px; color: #c3cad6; background: #0d0f12; border: 1px solid var(--line);
}

.lhx-icon-btn {
  position: relative; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 10px; cursor: pointer;
  background: var(--panel); border: 1px solid var(--line); color: var(--text) !important; transition: border-color .2s ease;
}
.lhx-icon-btn:hover { border-color: #3a4558; }
.lhx-badge {
  position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 999px;
  display: grid; place-items: center; background: var(--ember); color: #1a0a03; font-size: 10.5px; font-weight: 800;
}

.lhx-signin {
  display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 14px; border-radius: 10px;
  border: 1px solid var(--line); font-size: 13px; font-weight: 600; transition: background .2s ease, border-color .2s ease;
}
.lhx-signin:hover { background: var(--panel); border-color: #3a4558; }
.lhx-join {
  display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 18px; border-radius: 10px;
  background: var(--ember); color: #1a0a03 !important; font-size: 13px; font-weight: 700; white-space: nowrap; transition: background .2s ease, transform .2s ease;
}
.lhx-join:hover { background: var(--ember-hover); transform: translateY(-1px); }

.lhx-burger { display: none; place-items: center; width: 42px; height: 42px; border-radius: 10px; cursor: pointer; background: var(--panel); border: 1px solid var(--line); }

/* Scroll progress */
.lhx-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; pointer-events: none; }
.lhx-progress span { display: block; height: 100%; background: var(--ember); transform-origin: left; transition: transform .1s linear; }

/* Drawer */
.lhx-drawer-backdrop { position: fixed; inset: 0; z-index: 1500; background: rgba(5, 6, 8, .72); backdrop-filter: blur(4px); animation: lhx-fade .18s ease both; }
.lhx-drawer {
  position: absolute; top: 0; right: 0; bottom: 0; width: min(380px, 92vw); display: flex; flex-direction: column; gap: 16px;
  padding: 18px; overflow-y: auto; background: var(--bg); border-left: 1px solid var(--line); animation: lhx-slide .22s ease both;
}
.lhx-drawer a { color: inherit; text-decoration: none; }
.lhx-drawer-head { display: flex; align-items: center; justify-content: space-between; }
.lhx-drawer-search {
  display: flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 14px; border-radius: 12px; cursor: pointer;
  background: var(--panel); border: 1px solid var(--line); color: var(--muted); font-size: 13px;
}
.lhx-drawer-links { display: grid; gap: 6px; }
.lhx-drawer-links > a, .lhx-drawer-cat-btn {
  display: flex; align-items: center; justify-content: space-between; min-height: 52px; padding: 0 16px; border-radius: 12px; cursor: pointer;
  background: var(--panel); border: 1px solid var(--line); font-size: 14px; font-weight: 600; width: 100%; text-align: left;
}
.lhx-drawer-links > a.active { border-color: var(--ember); }
.lhx-drawer-cat-btn .flip { display: inline-flex; transform: rotate(180deg); }
.lhx-drawer-label { margin: 8px 2px 0; color: #7d8799; font-size: 12px; font-weight: 600; }
.lhx-drawer-sub { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.lhx-drawer-sub a.active { border: 1px solid var(--ember); }
.lhx-drawer-sub a { display: flex; align-items: center; gap: 12px; min-height: 46px; padding: 0 14px; border-radius: 10px; background: #10141b; color: #c3cad6; font-size: 13px; }
.lhx-drawer-sub a svg { color: var(--ember); }
.lhx-drawer-foot { display: grid; gap: 8px; margin-top: auto; }
.lhx-drawer-foot a { width: 100%; }

/* Command palette */
.lhx-cmd-backdrop {
  position: fixed; inset: 0; z-index: 2000; display: flex; align-items: flex-start; justify-content: center;
  padding: min(14vh, 110px) 16px 24px; background: rgba(5, 6, 8, .78); backdrop-filter: blur(8px); animation: lhx-fade .15s ease both;
}
.lhx-cmd { width: min(600px, 100%); overflow: hidden; border-radius: 16px; background: var(--panel); border: 1px solid #323b4a; box-shadow: 0 30px 100px rgba(0, 0, 0, .6); animation: lhx-pop .18s ease both; }
.lhx-cmd-top { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--line); color: var(--ember); }
.lhx-cmd-top input { flex: 1; min-width: 0; border: 0; outline: none; background: transparent; color: var(--text); font: 500 14.5px "Sora", system-ui, sans-serif; }
.lhx-cmd-top input::placeholder { color: #6b7587; }
.lhx-cmd-top button { background: transparent; border: 0; cursor: pointer; }
.lhx-cmd-results { max-height: min(400px, 52vh); overflow-y: auto; padding: 8px; }
.lhx-cmd-label { padding: 12px 12px 6px; color: #7d8799; font-size: 11.5px; font-weight: 600; }
.lhx-cmd-item {
  display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 12px; text-align: left; cursor: pointer;
  background: transparent; border: 1px solid transparent; border-radius: 10px; color: var(--text);
}
.lhx-cmd-item.selected { background: var(--panel-2); border-color: #333d4e; }
.lhx-cmd-ico { display: grid; place-items: center; flex: 0 0 auto; width: 34px; height: 34px; border-radius: 9px; background: #0d0f12; border: 1px solid var(--line); color: var(--ember); }
.lhx-cmd-copy { display: grid; gap: 2px; flex: 1; min-width: 0; }
.lhx-cmd-copy strong { font-size: 13px; font-weight: 600; }
.lhx-cmd-copy small { color: var(--muted); font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lhx-cmd-item > svg { color: var(--muted); flex: 0 0 auto; }
.lhx-cmd-empty { display: grid; gap: 6px; padding: 34px 16px; text-align: center; font-size: 13px; }
.lhx-cmd-empty span { color: var(--muted); font-size: 12px; }
.lhx-cmd-foot { display: flex; flex-wrap: wrap; gap: 8px 18px; padding: 12px 18px; background: #10141b; border-top: 1px solid var(--line); color: #7d8799; font-size: 11px; }
.lhx-cmd-foot kbd { margin-right: 4px; }

@keyframes lhx-pop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
.lhx-mega { animation-name: lhx-pop-mega; }
@keyframes lhx-pop-mega { from { opacity: 0; transform: translate(-42%, -6px); } to { opacity: 1; transform: translate(-42%, 0); } }
@keyframes lhx-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes lhx-slide { from { transform: translateX(24px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes lhx-swap { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

/* Responsive */
@media (max-width: 1240px) {
  .lhx-search-text, .lhx-search kbd { display: none; }
  .lhx-search { padding: 0 12px; }
  .lhx-search-text { min-width: 0; }
}
@media (max-width: 1100px) {
  .lhx-wrap { width: calc(100% - 36px); }
  .lhx-link { padding: 0 10px; }
  .lhx-signin { display: none; }
}
@media (max-width: 1080px) {
  .lhx-links, .lhx-join, .lhx-search { display: none; }
  .lhx-burger { display: grid; }
  .lhx-main { min-height: 68px; }
  .lhx.is-compact .lhx-main { min-height: 60px; }
  .lhx-announce-link { display: none; }
  .lhx-announce-row { justify-content: center; text-align: center; }
  /* keep a search button reachable on mobile */
  .lhx-actions::before {
    content: ""; display: none;
  }
}
@media (max-width: 520px) {
  .lhx-wrap { width: calc(100% - 24px); }
  .lhx-brand-sub { display: none; }
  .lhx-hide-sm { display: none; }
  .lhx-announce { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .lhx *, .lhx-cmd-backdrop *, .lhx-drawer-backdrop *,
  .lhx-cmd, .lhx-drawer, .lhx-mega { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;
