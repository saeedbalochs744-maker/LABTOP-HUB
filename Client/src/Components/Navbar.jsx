import { useMemo, useState } from "react";
import {
  Laptop, Rocket, Search, ArrowRight, Heart, ShoppingCart, UserRound,
  Menu, X, Star, ShieldCheck, Truck, Headphones, Plus, Minus, Trash2,
  Monitor, GraduationCap, BriefcaseBusiness, Gamepad2, ArrowUpRight,
  Mail, MapPin, Phone, Cpu, Zap, CheckCircle2
} from "lucide-react";

/*
  LaptopHub — single-file React + Tailwind CSS demo store.
  Install icon package: npm install lucide-react
  Use this file as src/Components/Navbar.jsx (or src/Navbar.jsx).
  In App.jsx render only: <Navbar /> (do not wrap it in another Routes layout).
*/

const PRODUCTS = [
  { id: 1, name: "ASUS ROG Zephyrus G16", brand: "ASUS", category: "Gaming", price: 429999, oldPrice: 469999, rating: 4.9, badge: "BEST SELLER", specs: "Core Ultra 9 · RTX 4070 · 16GB RAM", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85" },
  { id: 2, name: "MacBook Air 15", brand: "Apple", category: "Student", price: 349999, oldPrice: 379999, rating: 4.8, badge: "LIGHTWEIGHT", specs: "Apple M3 · 16GB memory · 512GB SSD", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85" },
  { id: 3, name: "Dell XPS 14", brand: "Dell", category: "Business", price: 389999, oldPrice: null, rating: 4.7, badge: "PREMIUM", specs: "Core Ultra 7 · 16GB RAM · 1TB SSD", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85" },
  { id: 4, name: "Lenovo Legion Pro 5", brand: "Lenovo", category: "Gaming", price: 319999, oldPrice: 344999, rating: 4.8, badge: "GAMING", specs: "Ryzen 7 · RTX 4060 · 16GB RAM", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85" },
  { id: 5, name: "HP Pavilion Plus 14", brand: "HP", category: "Student", price: 189999, oldPrice: 209999, rating: 4.6, badge: "STUDENT PICK", specs: "Core Ultra 5 · 16GB RAM · 512GB SSD", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85" },
  { id: 6, name: "Acer Swift Go 14", brand: "Acer", category: "Business", price: 219999, oldPrice: null, rating: 4.5, badge: "EVERYDAY POWER", specs: "Core Ultra 7 · 16GB RAM · 1TB SSD", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85" },
];

const money = (n) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 })
    .format(n).replace("PKR", "Rs.");

const NAV_LINKS = [
  { label: "Home", page: "Home" },
  { label: "Products", page: "Products" },
  { label: "Categories", page: "Categories" },
  { label: "About", page: "About" },
  { label: "Contact", page: "Contact" },
];

export default function Navbar() {
  const [page, setPage] = useState("Home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = useMemo(() => PRODUCTS.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const text = submittedSearch.trim().toLowerCase();
    const matchesSearch = !text || [product.name, product.brand, product.category, product.specs]
      .some((value) => value.toLowerCase().includes(text));
    return matchesCategory && matchesSearch;
  }), [category, submittedSearch]);

  const goTo = (nextPage) => {
    setPage(nextPage);
    setMobileOpen(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const runSearch = (event) => {
    event.preventDefault();
    setSubmittedSearch(search);
    setCategory("All");
    goTo("Products");
  };

  const addToCart = (product) => {
    setCart((current) => current.some((item) => item.id === product.id)
      ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      : [...current, { ...product, qty: 1 }]);
    setNotice(`${product.name} added to your cart.`);
  };

  const changeQty = (id, delta) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0));
  };

  const toggleWishlist = (product) => {
    const saved = wishlist.some((item) => item.id === product.id);
    setWishlist((current) => saved ? current.filter((item) => item.id !== product.id) : [...current, product]);
    setNotice(saved ? "Removed from wishlist." : "Added to wishlist.");
  };

  const ProductCard = ({ product }) => {
    const saved = wishlist.some((item) => item.id === product.id);
    return (
      <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1022] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_15px_50px_#06b6d415]">
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-3">
          <span className="absolute left-5 top-5 z-10 rounded-full border border-cyan-300/20 bg-[#050816]/90 px-3 py-1 text-[9px] font-bold tracking-widest text-cyan-200">{product.badge}</span>
          <button onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist" className={`absolute right-5 top-5 z-10 rounded-full bg-[#050816]/90 p-2 transition hover:scale-110 ${saved ? "text-fuchsia-300" : "text-slate-300"}`}>
            <Heart size={17} fill={saved ? "currentColor" : "none"} />
          </button>
          <img src={product.image} alt={product.name} loading="lazy" className="h-48 w-full rounded-xl object-cover transition duration-500 group-hover:scale-[1.04]" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>{product.brand} · {product.category}</span>
            <span className="flex items-center gap-1 text-amber-300"><Star size={12} fill="currentColor" />{product.rating}</span>
          </div>
          <h3 className="mt-3 min-h-12 font-bold leading-6">{product.name}</h3>
          <p className="mt-1 min-h-10 text-xs leading-5 text-slate-400">{product.specs}</p>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div><p className="font-extrabold">{money(product.price)}</p>{product.oldPrice && <p className="mt-1 text-xs text-slate-500 line-through">{money(product.oldPrice)}</p>}</div>
            <button onClick={() => addToCart(product)} className="flex items-center gap-2 rounded-xl bg-cyan-300 px-3 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-cyan-200"><ShoppingCart size={14} /> Add to cart</button>
          </div>
        </div>
      </article>
    );
  };

  const SectionHeading = ({ eyebrow, title, description }) => (
    <div className="mb-8">
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-cyan-300">{eyebrow}</p>}
      <h2 className="text-3xl font-black sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>}
    </div>
  );

  const categories = [
    { name: "Gaming", detail: "High-performance machines", icon: Gamepad2 },
    { name: "Student", detail: "Study, create, achieve", icon: GraduationCap },
    { name: "Business", detail: "Work without limits", icon: BriefcaseBusiness },
  ];

  return (
    <div className="laptophub-neon min-h-screen bg-[#03051d] text-white">
      <style>{`
        .laptophub-neon {
          --neon-cyan: #00d9ff;
          --neon-blue: #246bff;
          --neon-purple: #a100ff;
          --neon-pink: #ed27ff;
          background: radial-gradient(ellipse at 12% 15%, rgba(0,80,255,.16), transparent 38%),
                      radial-gradient(ellipse at 88% 30%, rgba(126,0,255,.13), transparent 38%),
                      linear-gradient(135deg,#02051c 0%,#030726 48%,#08002d 100%);
          isolation: isolate;
        }
        .laptophub-neon header {
          background: linear-gradient(100deg,rgba(2,5,28,.97),rgba(4,4,43,.96) 55%,rgba(17,0,48,.96)) !important;
          box-shadow: 0 8px 36px rgba(0,0,0,.35), 0 1px 0 rgba(0,217,255,.22);
        }
        .laptophub-neon header > div:first-child {
          background: linear-gradient(100deg,#02072b,#08053d 45%,#16002e) !important;
          border-bottom: 1px solid transparent !important;
          border-image: linear-gradient(90deg,#075bff,#00e5ff,#7d2bff,#ef20ff) 1;
          position: relative;
        }
        .laptophub-neon header > div:first-child:after {
          content: ''; position:absolute; left:0; right:0; bottom:-1px; height:1px;
          background:linear-gradient(90deg,transparent,#087bff,#00eaff,#a100ff,#ff22ee,transparent);
          box-shadow:0 0 12px #5c38ff;
        }
        .laptophub-neon .neon-grid {
          opacity:.62;
          background-image: radial-gradient(circle,rgba(0,132,255,.5) 1px,transparent 1.5px);
          background-size: 14px 14px;
          mask-image: linear-gradient(90deg,black,transparent 38%,transparent 65%,black);
        }
        .laptophub-neon .neon-line {
          position:absolute; display:block; width:2px; height:190px; opacity:.95;
          transform:rotate(42deg); filter:blur(.2px);
          box-shadow:0 0 7px currentColor,0 0 18px currentColor,0 0 32px currentColor;
          animation: neonDrift 7s ease-in-out infinite alternate;
        }
        .laptophub-neon .neon-line:nth-child(2n) { animation-delay:-3s; }
        .laptophub-neon header .neon-line { color:#00d9ff; }
        .laptophub-neon header .neon-line.bg-violet-400 { color:#a855f7; }
        .laptophub-neon header .neon-line.bg-fuchsia-400 { color:#ed27ff; }
        .laptophub-neon main > section:first-child { position:relative; }
        .laptophub-neon main > section:first-child:before {
          content:''; pointer-events:none; position:absolute; z-index:-1; top:0; left:-3%; right:-3%; height:145px;
          border-bottom:2px solid #143dff; border-radius:0 0 50% 45% / 0 0 42% 35%;
          box-shadow:0 4px 12px rgba(0,119,255,.65),0 8px 24px rgba(140,0,255,.24);
          transform:translateY(-78px) rotate(-1deg);
        }
        .laptophub-neon main > section:first-child:after {
          content:''; pointer-events:none; position:absolute; z-index:-1; top:32px; left:-4%; right:-4%; height:90px;
          border-bottom:2px solid #00d9ff; border-radius:0 0 50% 42% / 0 0 60% 45%;
          filter:drop-shadow(0 0 7px #00d9ff); opacity:.7; transform:rotate(1deg);
        }
        .laptophub-neon button { transition: border-color .22s ease, box-shadow .22s ease, color .22s ease, transform .22s ease; }
        .laptophub-neon header nav button:hover,
        .laptophub-neon header nav button.text-cyan-300 { color:#c45cff !important; text-shadow:0 0 12px rgba(174,55,255,.7); }
        .laptophub-neon header nav button span { background:linear-gradient(90deg,#00d9ff,#335dff,#d527ff) !important; box-shadow:0 0 12px rgba(0,217,255,.85); }
        .laptophub-neon header form { border-color:#3925c9 !important; background:rgba(8,9,43,.85) !important; box-shadow:inset 0 0 14px rgba(50,30,255,.1); }
        .laptophub-neon header form:focus-within { border-color:#00d9ff !important; box-shadow:0 0 18px rgba(0,217,255,.18); }
        .laptophub-neon header button.rounded-full { border-color:rgba(34,113,255,.6); }
        .laptophub-neon header button.rounded-full:hover { box-shadow:0 0 18px rgba(40,112,255,.32); }
        .laptophub-neon .bg-cyan-300 { background:linear-gradient(110deg,#00d9ff,#2b7cff 55%,#b329ff) !important; }
        .laptophub-neon .bg-cyan-300:hover { filter:brightness(1.13); box-shadow:0 0 22px rgba(76,74,255,.4); }
        .laptophub-neon .text-cyan-300 { color:#42ddff; }
        .laptophub-neon .border-cyan-300\/40 { border-color:rgba(67,100,255,.65); }
        .laptophub-neon .float-slow { animation: laptopFloat 6s ease-in-out infinite; }
        @keyframes neonDrift { from { transform:translateY(-10px) rotate(42deg); } to { transform:translateY(16px) rotate(42deg); } }
        @keyframes laptopFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
        @media (prefers-reduced-motion: reduce) { .laptophub-neon * { animation:none !important; scroll-behavior:auto !important; } }
      `}</style>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-2xl">
        <div className="border-b border-white/[.06] bg-[#080d23] px-3 py-2 text-center text-xs text-slate-300">
          <span className="inline-flex items-center gap-2"><Rocket size={14} className="text-cyan-300" /> Your next upgrade starts here <span className="hidden sm:inline text-slate-600">·</span><span className="hidden sm:inline">Explore the LaptopHub collection</span></span>
        </div>
        <div className="relative mx-auto flex max-w-7xl items-center gap-3 overflow-hidden px-4 py-4 sm:px-6 lg:gap-7 lg:px-8">
          <div className="neon-grid pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <i className="neon-line left-[18%] top-[-80px] bg-cyan-300" />
            <i className="neon-line left-[45%] top-[-70px] bg-blue-500" />
            <i className="neon-line right-[24%] top-[-90px] bg-violet-400" />
            <i className="neon-line right-[5%] top-[-75px] bg-fuchsia-400" />
          </div>
          <button onClick={() => goTo("Home")} className="relative flex shrink-0 items-center gap-2 text-left">
            <span className="rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-3 text-cyan-300 shadow-[0_0_25px_#06b6d415]"><Laptop size={25} /></span>
            <span className="text-xl font-black sm:text-2xl">Laptop<span className="text-cyan-300">Hub</span><small className="hidden text-[9px] tracking-[.22em] text-slate-500 sm:block">YOUR TECH PARTNER</small></span>
          </button>

          <nav className="relative ml-auto hidden items-center gap-5 xl:flex">
            {NAV_LINKS.map((link) => <button key={link.page} onClick={() => goTo(link.page)} className={`text-sm transition ${page === link.page ? "font-semibold text-cyan-300" : "text-slate-300 hover:text-white"}`}>{link.label}{page === link.page && <span className="mt-2 block h-0.5 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" />}</button>)}
          </nav>

          <form onSubmit={runSearch} className="relative ml-auto hidden h-10 max-w-[220px] flex-1 items-center rounded-full border border-white/10 bg-white/[.04] px-3 focus-within:border-cyan-300/60 md:flex xl:ml-0">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search laptops..." aria-label="Search laptops" className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none placeholder:text-slate-500" />
            <button type="submit" aria-label="Search"><ArrowRight size={16} className="text-cyan-300" /></button>
          </form>

          <div className="relative flex items-center gap-2">
            <button onClick={() => goTo("Wishlist")} aria-label="Wishlist" className="relative rounded-full border border-white/10 p-2.5 transition hover:border-fuchsia-300/50 hover:text-fuchsia-300"><Heart size={18} />{wishlist.length > 0 && <b className="absolute -right-1 -top-1 rounded-full bg-fuchsia-500 px-1.5 text-[9px]">{wishlist.length}</b>}</button>
            <button onClick={() => goTo("Cart")} aria-label="Cart" className="relative rounded-full border border-white/10 p-2.5 transition hover:border-cyan-300/50 hover:text-cyan-300"><ShoppingCart size={18} />{cartCount > 0 && <b className="absolute -right-1 -top-1 rounded-full bg-cyan-300 px-1.5 text-[9px] text-slate-950">{cartCount}</b>}</button>
            <button onClick={() => goTo("Account")} aria-label="Account" className="hidden rounded-full border border-white/10 p-2.5 transition hover:text-cyan-300 sm:block"><UserRound size={18} /></button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen} className="rounded-full border border-white/10 p-2.5 xl:hidden">{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>

        {mobileOpen && <div className="border-t border-white/10 bg-[#080d23] p-4 xl:hidden">
          <form onSubmit={runSearch} className="mb-3 flex h-11 items-center rounded-xl border border-white/10 px-3 md:hidden"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search laptops..." className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" /><button aria-label="Search"><ArrowRight size={16} /></button></form>
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3">{NAV_LINKS.map((link) => <button key={link.page} onClick={() => goTo(link.page)} className={`rounded-xl px-4 py-3 text-left text-sm ${page === link.page ? "bg-cyan-300/10 text-cyan-300" : "text-slate-300 hover:bg-white/5"}`}>{link.label}</button>)}</nav>
          <button onClick={() => goTo("Account")} className="mt-2 w-full rounded-xl px-4 py-3 text-left text-sm text-slate-300 hover:bg-white/5">Login / Register</button>
        </div>}
      </header>

      {notice && <div role="status" className="fixed right-4 top-28 z-[60] flex max-w-sm items-center gap-2 rounded-xl border border-cyan-300/30 bg-[#0b1022] px-4 py-3 text-sm shadow-2xl"><CheckCircle2 size={17} className="shrink-0 text-cyan-300" />{notice}<button onClick={() => setNotice("")} className="ml-2 text-slate-400"><X size={15} /></button></div>}

      <main>
        {page === "Home" && <>
          <section className="relative isolate overflow-hidden">
            <div className="neon-grid pointer-events-none absolute inset-0 -z-10" />
            <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-96 w-96 rounded-full bg-blue-600/15 blur-[100px]" />
            <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[100px]" />
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-4 py-2 text-xs font-semibold text-cyan-200"><Zap size={14} /> TECHNOLOGY, YOUR WAY</p>
                <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Find your next <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">power move.</span></h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">Discover laptops built for big ideas — from your first class to your next level in gaming and business.</p>
                <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => { setCategory("All"); setSubmittedSearch(""); goTo("Products"); }} className="flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-200">Explore laptops <ArrowRight size={17} /></button><button onClick={() => goTo("Categories")} className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold transition hover:border-cyan-300/50">Browse categories</button></div>
                <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"><div><p className="text-2xl font-black">6<span className="text-cyan-300">+</span></p><p className="mt-1 text-xs text-slate-500">Featured models</p></div><div><p className="text-2xl font-black">3</p><p className="mt-1 text-xs text-slate-500">Laptop categories</p></div><div><p className="text-2xl font-black">24/7</p><p className="mt-1 text-xs text-slate-500">Browse online</p></div></div>
              </div>
              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.015] p-4 shadow-[0_30px_100px_#0008] sm:p-6">
                  <div className="mb-4 flex items-center justify-between"><span className="text-xs font-bold tracking-[.2em] text-slate-400">LAPTOPHUB / COLLECTION 01</span><span className="flex items-center gap-1.5 text-xs text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> FEATURED</span></div>
                  <img src={PRODUCTS[0].image} alt="Featured laptop" className="float-slow h-64 w-full rounded-2xl object-cover sm:h-80" />
                  <div className="flex flex-wrap items-center justify-between gap-4 p-3"><div><p className="text-xs text-slate-400">POWER MEETS PRECISION</p><h2 className="mt-1 text-xl font-black">ASUS ROG Zephyrus G16</h2></div><button onClick={() => { setSubmittedSearch(""); setCategory("All"); goTo("Products"); }} className="rounded-full border border-cyan-300/40 p-3 text-cyan-300 hover:bg-cyan-300 hover:text-slate-950"><ArrowUpRight size={20} /></button></div>
                </div>
                <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/10 bg-[#0b1022] p-4 shadow-xl sm:-left-8"><p className="text-xs text-slate-400">Selected for you</p><p className="mt-1 font-bold"><span className="text-cyan-300">✦</span> Performance collection</p></div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="SHOP YOUR STYLE" title="Find your kind of power" description="The right laptop for every goal, from gaming marathons to classroom projects." />
            <div className="grid gap-4 md:grid-cols-3">{categories.map(({ name, detail, icon: Icon }) => <button key={name} onClick={() => { setCategory(name); setSubmittedSearch(""); goTo("Products"); }} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0b1022] p-5 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/[.04]"><span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-300"><Icon size={25} /></span><span className="flex-1"><b className="block text-lg">{name}</b><small className="mt-1 block text-slate-400">{detail}</small></span><ArrowUpRight className="text-slate-500 transition group-hover:text-cyan-300" /></button>)}</div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="THE SHORTLIST" title="Featured laptops" description="A few favourites to help you get started." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{PRODUCTS.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div>
            <div className="mt-8 text-center"><button onClick={() => { setCategory("All"); setSubmittedSearch(""); goTo("Products"); }} className="rounded-xl border border-white/15 px-6 py-3 text-sm font-bold hover:border-cyan-300/50">View all laptops <ArrowRight className="ml-2 inline" size={16} /></button></div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-3">{[{icon:Truck,title:"Convenient shopping",text:"Browse the collection from wherever you are."},{icon:ShieldCheck,title:"Clear product details",text:"Compare specifications and prices before choosing."},{icon:Headphones,title:"Here to help",text:"Contact us if you need help choosing a model."}].map(({icon:Icon,title,text})=><div key={title} className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><Icon className="text-cyan-300" size={24}/><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}</div></section>
        </>}

        {page === "Products" && <section className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><SectionHeading eyebrow="THE COLLECTION" title="Explore laptops" description="Compare popular options for gaming, studying, and business." /><div className="mb-7 flex flex-wrap items-center gap-2">{["All", "Gaming", "Student", "Business"].map((name) => <button key={name} onClick={() => setCategory(name)} className={`rounded-full border px-4 py-2 text-sm transition ${category === name ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 text-slate-300 hover:border-cyan-300/50"}`}>{name}</button>)}<span className="ml-auto text-xs text-slate-500">{filteredProducts.length} models</span></div>{submittedSearch && <div className="mb-5 flex items-center gap-2 text-sm text-slate-400">Search results for <b className="text-white">“{submittedSearch}”</b><button onClick={() => { setSearch(""); setSubmittedSearch(""); }} className="text-cyan-300 underline">Clear</button></div>}{filteredProducts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl border border-white/10 p-12 text-center"><Search className="mx-auto text-slate-500" size={30}/><h3 className="mt-4 text-xl font-bold">No laptops found</h3><p className="mt-2 text-sm text-slate-400">Try another search or category.</p><button onClick={() => { setSearch(""); setSubmittedSearch(""); setCategory("All"); }} className="mt-5 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950">Reset filters</button></div>}</section>}

        {page === "Categories" && <section className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><SectionHeading eyebrow="MADE FOR YOUR MISSION" title="Shop by category" description="Choose the kind of laptop that fits what you want to do next."/><div className="grid gap-5 md:grid-cols-3">{categories.map(({name,detail,icon:Icon},index)=><button key={name} onClick={()=>{setCategory(name);setSubmittedSearch("");goTo("Products");}} className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1830] to-[#0b1022] p-7 text-left transition hover:border-cyan-300/40"><span className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-300"><Icon size={30}/></span><p className="mt-8 text-xs tracking-widest text-slate-500">CATEGORY 0{index+1}</p><h2 className="mt-2 text-2xl font-black">{name}</h2><p className="mt-3 text-sm text-slate-400">{detail}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">Explore collection <ArrowRight size={16}/></span></button>)}</div></section>}

        {page === "About" && <section className="mx-auto min-h-[65vh] max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">A little about us</p><h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">Good technology should move <span className="text-cyan-300">you forward.</span></h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">LaptopHub is a laptop-shopping demo built to make exploring technology feel simple. We bring gaming, student, and business laptop options together in one place, with easy-to-read specifications and a straightforward shopping experience.</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{[{n:"01",t:"Explore",d:"Discover options for your needs."},{n:"02",t:"Compare",d:"Review specs and sample prices."},{n:"03",t:"Choose",d:"Save favourites or add to your cart."}].map(x=><div key={x.n} className="rounded-2xl border border-white/10 bg-[#0b1022] p-6"><span className="text-sm font-bold text-cyan-300">{x.n}</span><h2 className="mt-4 text-xl font-bold">{x.t}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{x.d}</p></div>)}</div><p className="mt-8 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4 text-sm leading-6 text-amber-100/80">Demo notice: product listings, ratings, and prices are sample content for this website template. Confirm real availability and pricing before making a purchase.</p></section>}

        {page === "Contact" && <section className="mx-auto min-h-[65vh] max-w-6xl px-4 py-14 sm:px-6 lg:px-8"><SectionHeading eyebrow="LET'S TALK TECH" title="Contact LaptopHub" description="Have a question about a laptop? Send a message using the demo form."/><div className="grid gap-8 md:grid-cols-[.8fr_1.2fr]"><div className="space-y-4"><div className="rounded-2xl border border-white/10 bg-[#0b1022] p-5"><Mail className="text-cyan-300"/><h3 className="mt-3 font-bold">Email</h3><p className="mt-1 text-sm text-slate-400">hello@laptophub.example</p></div><div className="rounded-2xl border border-white/10 bg-[#0b1022] p-5"><Phone className="text-cyan-300"/><h3 className="mt-3 font-bold">Phone</h3><p className="mt-1 text-sm text-slate-400">Add your business phone number here</p></div><div className="rounded-2xl border border-white/10 bg-[#0b1022] p-5"><MapPin className="text-cyan-300"/><h3 className="mt-3 font-bold">Location</h3><p className="mt-1 text-sm text-slate-400">Pakistan</p></div></div><form onSubmit={(e)=>{e.preventDefault();setNotice("Thanks! This demo form does not send messages to a server.");setForm({name:"",email:"",message:""});}} className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1022] p-6"><label className="block text-sm font-semibold">Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="Enter your name"/></label><label className="block text-sm font-semibold">Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="you@example.com"/></label><label className="block text-sm font-semibold">Message<textarea required rows="5" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#050816] px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="How can we help?"/></label><button className="w-full rounded-xl bg-cyan-300 px-5 py-3 font-extrabold text-slate-950 hover:bg-cyan-200">Send message <ArrowRight className="ml-2 inline" size={16}/></button></form></div></section>}

        {page === "Cart" && <section className="mx-auto min-h-[65vh] max-w-5xl px-4 py-14 sm:px-6"><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">YOUR BAG</p><h1 className="mt-3 text-4xl font-black">Shopping cart</h1>{!cart.length ? <div className="mt-8 rounded-3xl border border-white/10 bg-white/[.025] px-6 py-16 text-center"><ShoppingCart className="mx-auto text-slate-500" size={32}/><h2 className="mt-4 text-xl font-bold">Your cart is empty</h2><p className="mt-2 text-sm text-slate-400">Browse laptops and add a favourite.</p><button onClick={()=>goTo("Products")} className="mt-6 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950">Browse laptops</button></div> : <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]"><div className="space-y-3">{cart.map(item=><div key={item.id} className="flex gap-4 rounded-2xl border border-white/10 bg-[#0b1022] p-4"><img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover"/><div className="flex-1"><b>{item.name}</b><p className="mt-2 text-sm text-cyan-300">{money(item.price)}</p><div className="mt-3 flex items-center gap-4"><button onClick={()=>changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={14}/></button></div></div><button onClick={()=>setCart(c=>c.filter(x=>x.id!==item.id))} aria-label="Remove item" className="text-slate-500 hover:text-rose-300"><Trash2 size={17}/></button></div>)}</div><aside className="h-fit rounded-2xl border border-white/10 bg-[#0b1022] p-5"><h2 className="font-bold">Order summary</h2><p className="mt-5 flex justify-between text-sm text-slate-400"><span>Subtotal</span><span>{money(cartTotal)}</span></p><div className="my-4 border-t border-white/10"/><p className="flex justify-between font-extrabold"><span>Total</span><span>{money(cartTotal)}</span></p><button onClick={()=>setNotice("Demo checkout only. No payment is collected.")} className="mt-5 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-extrabold text-slate-950">Checkout demo</button><p className="mt-3 text-xs leading-5 text-slate-500">This demo does not collect payment.</p></aside></div>}</section>}

        {page === "Wishlist" && <section className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><SectionHeading eyebrow="SAVED FOR LATER" title="Your wishlist" description="Your favourite laptops in one place." />{wishlist.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map(product=><ProductCard key={product.id} product={product}/>)}</div> : <div className="rounded-3xl border border-white/10 px-6 py-16 text-center"><Heart className="mx-auto text-slate-500" size={32}/><h2 className="mt-4 text-xl font-bold">No saved laptops yet</h2><p className="mt-2 text-sm text-slate-400">Tap the heart on any laptop you like.</p><button onClick={()=>goTo("Products")} className="mt-6 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950">Browse laptops</button></div>}</section>}

        {page === "Account" && <section className="mx-auto flex min-h-[65vh] max-w-xl items-center px-4 py-14"><div className="w-full rounded-3xl border border-white/10 bg-[#0b1022] p-7 sm:p-9"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-300"><UserRound size={26}/></div><h1 className="mt-5 text-center text-3xl font-black">Welcome to LaptopHub</h1><p className="mt-2 text-center text-sm text-slate-400">This is a front-end demo account screen.</p><form onSubmit={e=>{e.preventDefault();setNotice("Demo sign-in only. Authentication is not connected.");}} className="mt-7 space-y-4"><label className="block text-sm font-semibold">Email address<input type="email" required placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 outline-none focus:border-cyan-300/60"/></label><label className="block text-sm font-semibold">Password<input type="password" required minLength="4" placeholder="Enter a demo password" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 outline-none focus:border-cyan-300/60"/></label><button className="w-full rounded-xl bg-cyan-300 px-5 py-3 font-extrabold text-slate-950">Sign in (demo)</button></form><p className="mt-4 text-center text-xs text-slate-500">No account details are saved or sent.</p></div></section>}
      </main>

      <footer className="border-t border-white/10 bg-[#030510]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div><button onClick={()=>goTo("Home")} className="text-left text-xl font-black">Laptop<span className="text-cyan-300">Hub</span></button><p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">Thoughtful technology for students, creators, gamers, and the next big idea.</p></div>
          <div><h3 className="mb-3 font-bold">Explore</h3>{[["All laptops","Products"],["Categories","Categories"],["About us","About"]].map(([label,target])=><button key={target} onClick={()=>goTo(target)} className="mb-2 block text-sm text-slate-400 hover:text-cyan-300">{label}</button>)}</div>
          <div><h3 className="mb-3 font-bold">Your account</h3>{[["Wishlist","Wishlist"],["Shopping cart","Cart"],["Login / Register","Account"]].map(([label,target])=><button key={target} onClick={()=>goTo(target)} className="mb-2 block text-sm text-slate-400 hover:text-cyan-300">{label}</button>)}</div>
          <div><h3 className="mb-3 font-bold">The LaptopHub promise</h3><p className="flex items-center gap-2 text-sm text-slate-400"><Truck size={16} className="text-cyan-300"/> Convenient browsing</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-400"><ShieldCheck size={16} className="text-cyan-300"/> Clear product details</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-400"><Headphones size={16} className="text-cyan-300"/> Helpful support</p></div>
        </div>
        <div className="border-t border-white/[.06] py-4 text-center text-xs text-slate-600">© {new Date().getFullYear()} LaptopHub · Demo store, sample products and prices</div>
      </footer>
    </div>
  );
}
