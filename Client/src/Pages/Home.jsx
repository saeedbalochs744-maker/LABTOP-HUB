
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./api";

const C = {
  bg: "#07090f",
  panel: "#0d111b",
  blue: "#4c8dff",
  cyan: "#57e7ff",
  muted: "#8c96aa",
};

const demoProducts = [
  {
    _id: "demo-1",
    name: "AERO X15",
    brand: "NOVA",
    category: "Gaming",
    price: 289999,
    oldPrice: 319999,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i7", ram: "16GB DDR5", storage: "1TB SSD", gpu: "RTX 4060" },
    description: "Built for high-FPS gaming and serious multitasking.",
    badge: "BEST SELLER",
  },
  {
    _id: "demo-2",
    name: "MACBOOK PRO 14",
    brand: "APPLE",
    category: "Premium",
    price: 499999,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Apple Silicon", ram: "16GB", storage: "512GB SSD", gpu: "Integrated" },
    description: "A powerful creative workstation with a premium finish.",
    badge: "CREATOR PICK",
  },
  {
    _id: "demo-3",
    name: "THINKPRO 14",
    brand: "THINKPRO",
    category: "Business",
    price: 179999,
    oldPrice: 199999,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i5", ram: "16GB", storage: "512GB SSD", gpu: "Integrated" },
    description: "Reliable performance for work, meetings and productivity.",
    badge: "WORK READY",
  },
  {
    _id: "demo-4",
    name: "ULTRABOOK AIR 15",
    brand: "ZENITH",
    category: "Student",
    price: 139999,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", gpu: "Integrated" },
    description: "Lightweight portability for classes and everyday projects.",
    badge: "LIGHTWEIGHT",
  },
  {
    _id: "demo-5",
    name: "ROG STRIKER 16",
    brand: "ROG",
    category: "Gaming",
    price: 429999,
    oldPrice: 459999,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i9", ram: "32GB DDR5", storage: "1TB SSD", gpu: "RTX 4070" },
    description: "Performance-focused hardware for demanding games.",
    badge: "EXTREME POWER",
  },
  {
    _id: "demo-6",
    name: "CREATOR STUDIO",
    brand: "VISION",
    category: "Premium",
    price: 349999,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "AMD Ryzen 7", ram: "32GB", storage: "1TB SSD", gpu: "RTX Graphics" },
    description: "A versatile machine for editing, design and development.",
    badge: "CREATOR SERIES",
  },
];

const categories = [
  { name: "All", subtitle: "The full collection", symbol: "✳" },
  { name: "Gaming", subtitle: "Maximum performance", symbol: "⌘" },
  { name: "Business", subtitle: "Built for productivity", symbol: "▤" },
  { name: "Student", subtitle: "Ready to learn", symbol: "◈" },
  { name: "Premium", subtitle: "The finest machines", symbol: "✦" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M7 7h10v10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 12h15m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ProductCard({ product, index }) {
  const id = product._id || product.id;
  const image =
    product.image ||
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85";

  const specs = product.specs || {};
  const description =
    product.description || "Discover dependable performance for your everyday work.";

  return (
    <article
      className="lh-product group"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="lh-product-image">
        <img
          src={image}
          alt={product.name || "Laptop"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85";
          }}
        />

        <span className="lh-product-badge">
          {product.badge || product.category || "FEATURED"}
        </span>

        <span className="lh-image-index">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="lh-product-overlay">
          <Link to={id?.startsWith("demo-") ? "/contact" : `/laptops/${id}`}>
            Explore laptop <ArrowIcon diagonal />
          </Link>
        </div>
      </div>

      <div className="lh-product-info">
        <div className="lh-product-brand">
          {product.brand || "LAPTOPHUB"}
        </div>

        <div className="lh-product-title-row">
          <h3>{product.name || "Performance Laptop"}</h3>
          <span className="lh-product-category">
            {product.category || "Technology"}
          </span>
        </div>

        <p className="lh-product-description">{description}</p>

        <div className="lh-spec-grid">
          {[
            ["CPU", specs.cpu || "High performance"],
            ["RAM", specs.ram || "See specifications"],
            ["SSD", specs.storage || "See specifications"],
            ["GPU", specs.gpu || "See specifications"],
          ].map(([label, value]) => (
            <div className="lh-spec" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="lh-product-bottom">
          <div>
            <span className="lh-price-label">STARTING AT</span>
            <div className="lh-price">{formatPrice(product.price)}</div>
            {product.oldPrice > product.price && (
              <div className="lh-old-price">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>

          <Link
            className="lh-buy-link"
            to={id?.startsWith("demo-") ? "/contact" : `/laptops/${id}`}
            aria-label={`Explore ${product.name || "laptop"}`}
          >
            <ArrowIcon diagonal />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [products, setProducts] = useState(demoProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState("loading");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const result = await api("/products");
        const list = Array.isArray(result)
          ? result
          : result.products || result.data?.products || result.data || [];

        if (active && Array.isArray(list) && list.length > 0) {
          setProducts(list);
          setApiStatus("connected");
        } else if (active) {
          setProducts(demoProducts);
          setApiStatus("demo");
        }
      } catch {
        if (active) {
          setProducts(demoProducts);
          setApiStatus("demo");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(
        (product) =>
          String(product.category || "").toLowerCase() ===
          activeCategory.toLowerCase()
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        [
          product.name,
          product.brand,
          product.category,
          product.description,
          product.specs?.cpu,
          product.specs?.gpu,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, activeCategory, search, sortBy]);

  const gamingCount = products.filter(
    (product) => product.category?.toLowerCase() === "gaming"
  ).length;

  return (
    <main className="lh-home">
      <style>{`
        .lh-home {
          --lh-bg: ${C.bg};
          --lh-panel: ${C.panel};
          --lh-blue: ${C.blue};
          --lh-cyan: ${C.cyan};
          --lh-muted: ${C.muted};
          min-height: 100vh;
          background: var(--lh-bg);
          color: #f5f7ff;
          overflow: hidden;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .lh-home * { box-sizing: border-box; }
        .lh-home a { color: inherit; text-decoration: none; }
        .lh-container { width: min(1240px, calc(100% - 48px)); margin: 0 auto; }
        .lh-eyebrow { display: flex; align-items: center; gap: 10px; color: var(--lh-cyan); font-size: 10px; font-weight: 800; letter-spacing: .24em; text-transform: uppercase; }
        .lh-eyebrow:before { content: ""; width: 25px; height: 1px; background: var(--lh-cyan); }
        .lh-hero { position: relative; isolation: isolate; min-height: 690px; display: flex; align-items: center; padding: 76px 0 100px; }
        .lh-hero:before { content: ""; position: absolute; inset: 0; z-index: -2; background: radial-gradient(ellipse at 75% 45%, rgba(39,105,255,.19), transparent 42%), radial-gradient(ellipse at 10% 80%, rgba(30,80,170,.09), transparent 36%); }
        .lh-grid-bg { position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: .22; background-image: linear-gradient(rgba(135,164,220,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(135,164,220,.07) 1px, transparent 1px); background-size: 55px 55px; mask-image: linear-gradient(to bottom, black, transparent 95%); }
        .lh-hero-layout { display: grid; grid-template-columns: 1.03fr .97fr; align-items: center; gap: 30px; }
        .lh-hero-copy { position: relative; z-index: 2; animation: lh-rise .7s ease both; }
        .lh-hero h1 { max-width: 730px; margin: 24px 0 25px; font-size: clamp(54px, 7.2vw, 100px); line-height: .88; letter-spacing: -.085em; font-weight: 950; }
        .lh-hero h1 span { display: block; }
        .lh-hero h1 .lh-outline { color: transparent; -webkit-text-stroke: 1px rgba(220,232,255,.78); }
        .lh-hero h1 .lh-blue { color: var(--lh-blue); text-shadow: 0 0 50px rgba(76,141,255,.18); }
        .lh-hero-description { max-width: 470px; color: #a2acc0; font-size: 15px; line-height: 1.9; }
        .lh-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
        .lh-btn { display: inline-flex; align-items: center; justify-content: center; gap: 13px; min-height: 50px; padding: 0 20px; border: 1px solid #29364d; background: rgba(15,21,34,.8); color: white; font-size: 12px; font-weight: 800; transition: .25s ease; }
        .lh-btn-primary { background: var(--lh-blue); border-color: var(--lh-blue); color: white; }
        .lh-btn:hover { transform: translateY(-3px); border-color: var(--lh-cyan); }
        .lh-btn-primary:hover { background: #3779f5; box-shadow: 0 10px 35px rgba(76,141,255,.2); }
        .lh-trust-row { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 34px; color: #a2acc0; font-size: 10px; letter-spacing: .05em; }
        .lh-trust-row span { display: inline-flex; align-items: center; gap: 8px; }
        .lh-check { display: inline-grid; place-items: center; width: 17px; height: 17px; border: 1px solid #335f90; border-radius: 50%; color: var(--lh-cyan); font-size: 10px; }
        .lh-hero-visual { min-width: 0; position: relative; animation: lh-rise .9s ease both; }
        .lh-hero-image-frame { position: relative; padding: 15px; border: 1px solid rgba(115,152,218,.25); background: linear-gradient(140deg, rgba(31,46,75,.7), rgba(10,13,22,.45)); transform: rotate(1.5deg); }
        .lh-hero-image-frame:before { content: ""; position: absolute; inset: 8px; border: 1px solid rgba(255,255,255,.05); pointer-events: none; z-index: 1; }
        .lh-hero-image { display: block; width: 100%; aspect-ratio: 1.06 / 1; object-fit: cover; filter: saturate(.84) contrast(1.06); }
        .lh-visual-label { position: absolute; left: -17px; bottom: 42px; z-index: 2; padding: 17px 20px; background: #0b101c; border: 1px solid #2c4365; box-shadow: 0 20px 55px rgba(0,0,0,.35); }
        .lh-visual-label small { display: block; color: var(--lh-cyan); font-size: 9px; letter-spacing: .2em; font-weight: 800; }
        .lh-visual-label strong { display: block; margin-top: 7px; font-size: 17px; letter-spacing: -.04em; }
        .lh-visual-number { position: absolute; top: 26px; right: -16px; z-index: 2; background: var(--lh-blue); padding: 13px 16px; color: white; font-size: 10px; font-weight: 900; letter-spacing: .12em; }
        .lh-orbit { position: absolute; z-index: -1; width: 220px; height: 220px; right: -60px; top: -65px; border: 1px solid rgba(87,231,255,.16); border-radius: 50%; box-shadow: 0 0 0 25px rgba(87,231,255,.025), 0 0 0 55px rgba(87,231,255,.018); }
        .lh-ticker { border-top: 1px solid #1b2435; border-bottom: 1px solid #1b2435; background: #0b0f18; }
        .lh-ticker-inner { display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 70px; flex-wrap: wrap; }
        .lh-ticker strong { font-size: 11px; letter-spacing: .13em; text-transform: uppercase; }
        .lh-ticker span { color: #758198; font-size: 10px; letter-spacing: .15em; text-transform: uppercase; }
        .lh-section { padding: 100px 0; }
        .lh-section-header { display: flex; align-items: end; justify-content: space-between; gap: 25px; margin-bottom: 36px; }
        .lh-section-title { margin: 13px 0 0; font-size: clamp(32px, 4.4vw, 53px); line-height: .98; letter-spacing: -.065em; font-weight: 900; }
        .lh-section-title span { color: var(--lh-blue); }
        .lh-section-copy { max-width: 360px; color: #8994aa; font-size: 13px; line-height: 1.8; }
        .lh-category-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
        .lh-category { min-height: 150px; padding: 20px; text-align: left; background: linear-gradient(145deg, #101726, #0b0e16); border: 1px solid #202b3f; color: white; cursor: pointer; transition: .25s ease; }
        .lh-category:hover, .lh-category.active { border-color: var(--lh-blue); background: linear-gradient(145deg, rgba(35,70,130,.35), #0c111d); transform: translateY(-4px); }
        .lh-category-symbol { display: grid; place-items: center; width: 35px; height: 35px; margin-bottom: 22px; color: var(--lh-cyan); border: 1px solid #2d4568; background: #101c30; font-size: 17px; }
        .lh-category strong { display: block; font-size: 14px; }
        .lh-category small { display: block; margin-top: 6px; color: #7f8ba2; font-size: 10px; }
        .lh-catalog { padding-top: 20px; }
        .lh-catalog-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 28px; }
        .lh-search-wrap { display: flex; flex: 1; min-width: 220px; align-items: center; gap: 10px; padding: 0 15px; min-height: 48px; border: 1px solid #253047; background: #0c101a; color: #9ba7bd; }
        .lh-search-wrap input { width: 100%; outline: none; border: 0; background: transparent; color: white; font-size: 12px; }
        .lh-search-wrap input::placeholder { color: #6e7b91; }
        .lh-select { min-height: 48px; padding: 0 15px; color: #c7d0df; background: #0c101a; border: 1px solid #253047; outline: none; font-size: 11px; }
        .lh-product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .lh-product { min-width: 0; border: 1px solid #202a3b; background: linear-gradient(160deg, #101521, #0a0d14); animation: lh-rise .45s ease both; transition: border-color .25s ease, transform .25s ease; }
        .lh-product:hover { transform: translateY(-5px); border-color: #3d6399; }
        .lh-product-image { position: relative; overflow: hidden; background: #101522; }
        .lh-product-image:after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(5,7,12,.05), transparent 45%, rgba(5,7,12,.5)); pointer-events: none; }
        .lh-product-image img { display: block; width: 100%; aspect-ratio: 1.32 / 1; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .lh-product:hover .lh-product-image img { transform: scale(1.06); }
        .lh-product-badge, .lh-image-index { position: absolute; z-index: 2; top: 13px; padding: 7px 9px; font-size: 8px; font-weight: 900; letter-spacing: .12em; }
        .lh-product-badge { left: 13px; color: #d9e8ff; background: rgba(8,13,23,.88); border: 1px solid #2b3e5a; }
        .lh-image-index { right: 13px; color: white; background: var(--lh-blue); }
        .lh-product-overlay { position: absolute; z-index: 3; inset: auto 0 0; padding: 13px; opacity: 0; transform: translateY(8px); transition: .25s ease; }
        .lh-product-overlay a { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(7,10,17,.94); border: 1px solid #304d78; font-size: 11px; font-weight: 800; }
        .lh-product:hover .lh-product-overlay { opacity: 1; transform: translateY(0); }
        .lh-product-info { padding: 21px; }
        .lh-product-brand { color: var(--lh-cyan); font-size: 9px; font-weight: 900; letter-spacing: .2em; }
        .lh-product-title-row { display: flex; align-items: start; justify-content: space-between; gap: 12px; margin-top: 9px; }
        .lh-product-title-row h3 { margin: 0; font-size: 19px; letter-spacing: -.045em; font-weight: 850; }
        .lh-product-category { color: #8793a9; font-size: 9px; text-align: right; }
        .lh-product-description { min-height: 37px; margin: 11px 0 18px; color: #8994a9; font-size: 11px; line-height: 1.7; }
        .lh-spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
        .lh-spec { padding: 10px; min-width: 0; background: #0b0f18; border: 1px solid #1b2537; }
        .lh-spec span { display: block; color: #738097; font-size: 8px; font-weight: 900; letter-spacing: .13em; }
        .lh-spec strong { display: block; margin-top: 6px; overflow-wrap: anywhere; color: #dfe7f5; font-size: 10px; font-weight: 700; }
        .lh-product-bottom { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding-top: 18px; margin-top: 18px; border-top: 1px solid #202a3a; }
        .lh-price-label { color: #748198; font-size: 8px; font-weight: 900; letter-spacing: .14em; }
        .lh-price { margin-top: 4px; font-size: 18px; font-weight: 900; letter-spacing: -.04em; }
        .lh-old-price { margin-top: 3px; color: #7d8798; font-size: 10px; text-decoration: line-through; }
        .lh-buy-link { display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid #344c70; background: #101c30; color: var(--lh-cyan); transition: .2s; }
        .lh-buy-link:hover { color: white; background: var(--lh-blue); border-color: var(--lh-blue); }
        .lh-empty { padding: 60px 20px; text-align: center; border: 1px dashed #28364b; color: #a2acc0; }
        .lh-empty strong { display: block; margin-bottom: 8px; color: white; font-size: 20px; }
        .lh-loading { color: #93a0b7; padding: 24px 0; font-size: 12px; }
        .lh-show-more { display: flex; justify-content: center; margin-top: 35px; }
        .lh-feature { position: relative; overflow: hidden; border: 1px solid #253750; background: radial-gradient(ellipse at 100% 0%, rgba(53,114,225,.23), transparent 44%), linear-gradient(120deg, #101827, #090d15); }
        .lh-feature-layout { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 30px; padding: 65px; }
        .lh-feature h2 { margin: 18px 0; font-size: clamp(35px, 4.8vw, 61px); line-height: .94; letter-spacing: -.075em; font-weight: 950; }
        .lh-feature h2 span { color: var(--lh-cyan); }
        .lh-feature p { max-width: 420px; color: #9aa6ba; font-size: 13px; line-height: 1.9; }
        .lh-feature-visual { position: relative; }
        .lh-feature-visual img { display: block; width: 100%; aspect-ratio: 1.35 / 1; object-fit: cover; border: 1px solid #344866; }
        .lh-feature-tag { position: absolute; right: -12px; bottom: -13px; padding: 13px 17px; background: var(--lh-blue); color: white; font-size: 10px; font-weight: 900; letter-spacing: .13em; }
        .lh-benefits { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid #202a3b; border-bottom: 1px solid #202a3b; }
        .lh-benefit { padding: 26px 22px; border-right: 1px solid #202a3b; }
        .lh-benefit:last-child { border-right: 0; }
        .lh-benefit-symbol { color: var(--lh-cyan); font-size: 20px; }
        .lh-benefit strong { display: block; margin-top: 14px; font-size: 12px; }
        .lh-benefit p { margin: 7px 0 0; color: #7f8ba1; font-size: 10px; line-height: 1.7; }
        .lh-final-cta { position: relative; padding: 90px 25px; text-align: center; border-top: 1px solid #1b2536; background: radial-gradient(ellipse at 50% 100%, rgba(54,109,223,.16), transparent 65%); }
        .lh-final-cta h2 { max-width: 780px; margin: 17px auto; font-size: clamp(38px, 6.5vw, 78px); line-height: .94; letter-spacing: -.075em; font-weight: 950; }
        .lh-final-cta h2 span { color: var(--lh-blue); }
        .lh-final-cta p { max-width: 480px; margin: 0 auto; color: #919db2; font-size: 13px; line-height: 1.9; }
        .lh-final-cta .lh-hero-actions { justify-content: center; }
        .lh-status { margin-top: 15px; color: #687790; font-size: 10px; }
        @keyframes lh-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .lh-home *, .lh-home *:before, .lh-home *:after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }
        @media (max-width: 1000px) {
          .lh-hero { min-height: auto; padding: 70px 0 85px; }
          .lh-hero-layout { grid-template-columns: 1fr 1fr; gap: 22px; }
          .lh-hero h1 { font-size: clamp(52px, 8vw, 78px); }
          .lh-category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lh-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .lh-feature-layout { padding: 35px; }
        }
        @media (max-width: 680px) {
          .lh-container { width: calc(100% - 30px); }
          .lh-hero { padding: 55px 0 65px; }
          .lh-hero-layout { grid-template-columns: 1fr; gap: 40px; }
          .lh-hero h1 { font-size: clamp(58px, 15vw, 86px); }
          .lh-hero-description { font-size: 13px; }
          .lh-hero-visual { margin: 0 10px; }
          .lh-visual-label { left: -8px; bottom: 25px; }
          .lh-visual-number { right: -8px; }
          .lh-ticker-inner { justify-content: center; padding: 18px 0; }
          .lh-ticker-inner span { font-size: 9px; }
          .lh-section { padding: 65px 0; }
          .lh-section-header { display: block; }
          .lh-section-copy { margin-top: 17px; }
          .lh-category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .lh-category { min-height: 130px; padding: 15px; }
          .lh-product-grid { grid-template-columns: 1fr; }
          .lh-product-image img { aspect-ratio: 1.5 / 1; }
          .lh-product-overlay { opacity: 1; transform: none; }
          .lh-feature-layout { grid-template-columns: 1fr; padding: 25px 20px; }
          .lh-benefits { grid-template-columns: 1fr 1fr; }
          .lh-benefit:nth-child(2) { border-right: 0; }
          .lh-benefit:nth-child(-n+2) { border-bottom: 1px solid #202a3b; }
          .lh-final-cta { padding: 70px 18px; }
        }
      `}</style>

      {/* HERO */}
      <section className="lh-hero">
        <div className="lh-grid-bg" />

        <div className="lh-container lh-hero-layout">
          <div className="lh-hero-copy">
            <div className="lh-eyebrow">The next level of computing</div>

            <h1>
              <span>POWER</span>
              <span className="lh-outline">YOUR</span>
              <span className="lh-blue">FUTURE.</span>
            </h1>

            <p className="lh-hero-description">
              Not just another laptop store. Discover performance machines
              engineered for gaming, ambitious work, creativity and everything
              you want to build next.
            </p>

            <div className="lh-hero-actions">
              <a href="#collection" className="lh-btn lh-btn-primary">
                EXPLORE COLLECTION <ArrowIcon />
              </a>
              <Link to="/about" className="lh-btn">
                OUR STORY <ArrowIcon diagonal />
              </Link>
            </div>

            <div className="lh-trust-row">
              <span><i className="lh-check">✓</i> Performance-focused picks</span>
              <span><i className="lh-check">✓</i> Support when you need it</span>
            </div>
          </div>

          <div className="lh-hero-visual">
            <div className="lh-orbit" />
            <div className="lh-hero-image-frame">
              <img
                className="lh-hero-image"
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1300&q=90"
                alt="Gaming laptop in a dark modern setup"
              />
            </div>

            <div className="lh-visual-number">LH / 001</div>

            <div className="lh-visual-label">
              <small>PERFORMANCE WITHOUT LIMITS</small>
              <strong>Find your machine.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <div className="lh-ticker">
        <div className="lh-container lh-ticker-inner">
          <strong>ENGINEERED FOR YOUR NEXT MOVE</strong>
          <span>Gaming</span>
          <span>Creation</span>
          <span>Business</span>
          <span>Everyday performance</span>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="lh-section">
        <div className="lh-container">
          <div className="lh-section-header">
            <div>
              <div className="lh-eyebrow">Choose your mission</div>
              <h2 className="lh-section-title">
                YOUR WORLD. <span>YOUR MACHINE.</span>
              </h2>
            </div>
            <p className="lh-section-copy">
              Different goals demand different hardware. Start with what you
              want to do, then find the laptop that fits.
            </p>
          </div>

          <div className="lh-category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`lh-category ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  document.getElementById("collection")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                aria-pressed={activeCategory === category.name}
              >
                <span className="lh-category-symbol">{category.symbol}</span>
                <strong>{category.name}</strong>
                <small>{category.subtitle}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section className="lh-section lh-catalog" id="collection">
        <div className="lh-container">
          <div className="lh-section-header">
            <div>
              <div className="lh-eyebrow">The LaptopHub selection</div>
              <h2 className="lh-section-title">
                BUILT TO <span>PERFORM.</span>
              </h2>
            </div>
            <p className="lh-section-copy">
              Explore machines for your next game, your next project or your
              next big idea.
            </p>
          </div>

          <div className="lh-catalog-controls">
            <label className="lh-search-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search laptops, brands, GPU..."
                aria-label="Search laptops"
              />
            </label>

            <select
              className="lh-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort laptops"
            >
              <option value="featured">Featured selection</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>

          {loading && <div className="lh-loading">Loading collection...</div>}

          {!loading && visibleProducts.length > 0 && (
            <div className="lh-product-grid">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product._id || product.id || product.name}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}

          {!loading && visibleProducts.length === 0 && (
            <div className="lh-empty">
              <strong>No matching machines found.</strong>
              Try another search or select a different category.
              <div className="lh-hero-actions" style={{ justifyContent: "center" }}>
                <button
                  className="lh-btn"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  RESET FILTERS <ArrowIcon />
                </button>
              </div>
            </div>
          )}

          <div className="lh-show-more">
            <Link to="/laptops" className="lh-btn">
              VIEW FULL COLLECTION <ArrowIcon />
            </Link>
          </div>

          {!loading && apiStatus === "demo" && (
            <p className="lh-status">
              Preview collection shown. Connect your product API to display
              your saved inventory.
            </p>
          )}
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="lh-section">
        <div className="lh-container">
          <div className="lh-feature">
            <div className="lh-feature-layout">
              <div>
                <div className="lh-eyebrow">Performance meets purpose</div>
                <h2>
                  YOUR SETUP.
                  <br />
                  YOUR <span>RULES.</span>
                </h2>
                <p>
                  From competitive gaming to demanding creative work, the right
                  machine makes more possible. Compare specifications, explore
                  your options and choose with confidence.
                </p>

                <div className="lh-hero-actions">
                  <Link to="/laptops" className="lh-btn lh-btn-primary">
                    FIND YOUR LAPTOP <ArrowIcon />
                  </Link>
                  <Link to="/contact" className="lh-btn">
                    TALK TO US <ArrowIcon diagonal />
                  </Link>
                </div>
              </div>

              <div className="lh-feature-visual">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1100&q=85"
                  alt="Laptop ready for work and gaming"
                  loading="lazy"
                />
                <span className="lh-feature-tag">UPGRADE YOUR GAME</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="lh-section" style={{ paddingTop: 15 }}>
        <div className="lh-container">
          <div className="lh-section-header">
            <div>
              <div className="lh-eyebrow">The LaptopHub approach</div>
              <h2 className="lh-section-title">
                TECH THAT <span>MAKES SENSE.</span>
              </h2>
            </div>
          </div>

          <div className="lh-benefits">
            {[
              {
                icon: "◈",
                title: "CHOICE THAT MATTERS",
                text: "Explore different categories and specifications for your needs.",
              },
              {
                icon: "⌘",
                title: "PERFORMANCE FIRST",
                text: "Focus on the hardware and features that matter to your work.",
              },
              {
                icon: "↗",
                title: "A CLEAR EXPERIENCE",
                text: "Find product information without unnecessary clutter.",
              },
              {
                icon: "✳",
                title: "HUMAN SUPPORT",
                text: "Have a question? Reach out to discuss your requirements.",
              },
            ].map((item) => (
              <div className="lh-benefit" key={item.title}>
                <span className="lh-benefit-symbol">{item.icon}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lh-final-cta">
        <div className="lh-eyebrow" style={{ justifyContent: "center" }}>
          Your next move starts here
        </div>

        <h2>
          READY FOR
          <br />
          <span>WHAT'S NEXT?</span>
        </h2>

        <p>
          Explore the collection, compare your options and discover the
          technology that fits your ambition.
        </p>

        <div className="lh-hero-actions">
          <Link to="/laptops" className="lh-btn lh-btn-primary">
            EXPLORE LAPTOPS <ArrowIcon />
          </Link>
          <Link to="/contact" className="lh-btn">
            CONTACT LAPTOPHUB <ArrowIcon diagonal />
          </Link>
        </div>
      </section>
    </main>
  );
}
