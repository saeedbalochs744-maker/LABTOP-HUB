
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./api";

const demoLaptops = [
  {
    _id: "demo-1",
    name: "AERO X15",
    brand: "NOVA",
    category: "Gaming",
    price: 289999,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85",
    description: "High-performance gaming and multitasking.",
    specs: { cpu: "Intel Core i7", ram: "16GB DDR5", storage: "1TB SSD", gpu: "RTX 4060" },
  },
  {
    _id: "demo-2",
    name: "MACBOOK PRO 14",
    brand: "APPLE",
    category: "Premium",
    price: 499999,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85",
    description: "Premium performance for creative workflows.",
    specs: { cpu: "Apple Silicon", ram: "16GB", storage: "512GB SSD", gpu: "Integrated" },
  },
  {
    _id: "demo-3",
    name: "THINKPRO 14",
    brand: "THINKPRO",
    category: "Business",
    price: 179999,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    description: "Professional productivity for your everyday work.",
    specs: { cpu: "Intel Core i5", ram: "16GB", storage: "512GB SSD", gpu: "Integrated" },
  },
  {
    _id: "demo-4",
    name: "ROG STRIKER 16",
    brand: "ROG",
    category: "Gaming",
    price: 429999,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85",
    description: "Powerful hardware for demanding games.",
    specs: { cpu: "Intel Core i9", ram: "32GB DDR5", storage: "1TB SSD", gpu: "RTX 4070" },
  },
  {
    _id: "demo-5",
    name: "ULTRABOOK AIR 15",
    brand: "ZENITH",
    category: "Student",
    price: 139999,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=85",
    description: "Portable performance for study and daily use.",
    specs: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", gpu: "Integrated" },
  },
  {
    _id: "demo-6",
    name: "CREATOR STUDIO",
    brand: "VISION",
    category: "Premium",
    price: 349999,
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85",
    description: "A versatile laptop for editing, design and development.",
    specs: { cpu: "AMD Ryzen 7", ram: "32GB", storage: "1TB SSD", gpu: "RTX Graphics" },
  },
];

const categories = ["All", "Gaming", "Business", "Student", "Premium"];

const money = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

function LaptopCard({ laptop, index }) {
  const id = laptop._id || laptop.id;
  const specs = laptop.specs || {};
  const image =
    laptop.image ||
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85";

  const detailsLink = id?.startsWith("demo-")
    ? "/contact"
    : `/laptops/${id}`;

  return (
    <article
      className="lp-card"
      style={{ animationDelay: `${index * 65}ms` }}
    >
      <div className="lp-card-image">
        <img
          src={image}
          alt={laptop.name || "Laptop"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85";
          }}
        />

        <span className="lp-card-category">
          {laptop.category || "Technology"}
        </span>

        <span className="lp-card-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="lp-card-content">
        <span className="lp-card-brand">
          {laptop.brand || "LAPTOPHUB"}
        </span>

        <h3>{laptop.name || "Performance Laptop"}</h3>

        <p className="lp-card-description">
          {laptop.description || "Explore specifications and performance."}
        </p>

        <div className="lp-specs">
          {[
            ["PROCESSOR", specs.cpu || "Not specified"],
            ["MEMORY", specs.ram || "Not specified"],
            ["STORAGE", specs.storage || "Not specified"],
            ["GRAPHICS", specs.gpu || "Not specified"],
          ].map(([label, value]) => (
            <div className="lp-spec" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="lp-card-footer">
          <div>
            <span className="lp-price-label">PRICE</span>
            <div className="lp-price">{money(laptop.price)}</div>
          </div>

          <Link
            to={detailsLink}
            className="lp-details-link"
            aria-label={`View ${laptop.name || "laptop"}`}
          >
            ↗
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Laptops() {
  const [laptops, setLaptops] = useState(demoLaptops);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("demo");

  useEffect(() => {
    let active = true;

    async function fetchLaptops() {
      try {
        const response = await api("/products");

        const list = Array.isArray(response)
          ? response
          : response.products ||
            response.data?.products ||
            response.data ||
            [];

        if (active && Array.isArray(list) && list.length) {
          setLaptops(list);
          setSource("api");
        } else if (active) {
          setLaptops(demoLaptops);
          setSource("demo");
        }
      } catch {
        if (active) {
          setLaptops(demoLaptops);
          setSource("demo");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchLaptops();

    return () => {
      active = false;
    };
  }, []);

  const filteredLaptops = useMemo(() => {
    let result = [...laptops];

    if (category !== "All") {
      result = result.filter(
        (item) =>
          String(item.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (query.trim()) {
      const search = query.toLowerCase().trim();

      result = result.filter((item) =>
        [
          item.name,
          item.brand,
          item.category,
          item.description,
          item.specs?.cpu,
          item.specs?.gpu,
          item.specs?.ram,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(search))
      );
    }

    if (sort === "low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""))
      );
    }

    return result;
  }, [laptops, category, query, sort]);

  return (
    <main className="lp-page">
      <style>{`
        .lp-page {
          min-height: 100vh;
          padding-bottom: 90px;
          background: #07090f;
          color: #f4f7ff;
          font-family: Inter, system-ui, sans-serif;
        }
        .lp-page * { box-sizing: border-box; }
        .lp-page a { text-decoration: none; color: inherit; }
        .lp-container { width: min(1240px, calc(100% - 42px)); margin: auto; }

        .lp-hero {
          position: relative;
          overflow: hidden;
          padding: 86px 0 65px;
          border-bottom: 1px solid #20283a;
          background:
            radial-gradient(ellipse at 85% 20%, rgba(49,111,238,.2), transparent 42%),
            linear-gradient(130deg, #0d1320, #07090f 70%);
        }
        .lp-hero:after {
          content: "LH / COLLECTION";
          position: absolute;
          right: -25px;
          bottom: 3px;
          color: rgba(133,165,222,.045);
          font-size: clamp(48px, 10vw, 130px);
          font-weight: 950;
          letter-spacing: -.08em;
          pointer-events: none;
          white-space: nowrap;
        }
        .lp-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #58e5ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
        }
        .lp-eyebrow:before {
          content: "";
          width: 25px;
          height: 1px;
          background: #58e5ff;
        }
        .lp-hero h1 {
          position: relative;
          z-index: 1;
          max-width: 950px;
          margin: 24px 0 20px;
          font-size: clamp(48px, 8.5vw, 100px);
          font-weight: 950;
          letter-spacing: -.085em;
          line-height: .9;
        }
        .lp-hero h1 span { color: #4c8dff; }
        .lp-hero-copy {
          max-width: 570px;
          color: #9ba7bc;
          font-size: 14px;
          line-height: 1.9;
        }
        .lp-hero-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 40px;
        }
        .lp-hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 26px;
        }
        .lp-hero-stat strong {
          display: block;
          font-size: 20px;
          letter-spacing: -.04em;
        }
        .lp-hero-stat span {
          display: block;
          margin-top: 5px;
          color: #8190a7;
          font-size: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .lp-scroll-note {
          color: #8997ad;
          font-size: 10px;
          letter-spacing: .12em;
        }
        .lp-catalog { padding-top: 45px; }
        .lp-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .lp-search {
          display: flex;
          flex: 1;
          min-width: 220px;
          align-items: center;
          gap: 10px;
          min-height: 49px;
          padding: 0 15px;
          background: #0c111b;
          border: 1px solid #26334a;
          color: #9ba9bf;
        }
        .lp-search input {
          width: 100%;
          min-width: 0;
          outline: none;
          border: 0;
          background: transparent;
          color: white;
          font-size: 12px;
        }
        .lp-search input::placeholder { color: #718097; }
        .lp-sort {
          min-height: 49px;
          padding: 0 14px;
          background: #0c111b;
          color: #d8e1f0;
          border: 1px solid #26334a;
          outline: none;
          font-size: 11px;
        }
        .lp-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 30px;
        }
        .lp-category-button {
          min-height: 39px;
          padding: 0 17px;
          background: #0d121d;
          color: #a3aec0;
          border: 1px solid #252f42;
          cursor: pointer;
          font-size: 10px;
          font-weight: 850;
          transition: .2s ease;
        }
        .lp-category-button:hover,
        .lp-category-button.active {
          color: white;
          background: #152542;
          border-color: #4c8dff;
        }
        .lp-results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 19px;
          padding-bottom: 15px;
          border-bottom: 1px solid #1d2738;
        }
        .lp-results-bar strong {
          font-size: 13px;
          letter-spacing: -.02em;
        }
        .lp-results-bar span {
          color: #8492a9;
          font-size: 10px;
        }
        .lp-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .lp-card {
          min-width: 0;
          overflow: hidden;
          background: linear-gradient(155deg, #101623, #0a0d14);
          border: 1px solid #202b3d;
          animation: lp-enter .45s ease both;
          transition: border-color .25s, transform .25s;
        }
        .lp-card:hover {
          transform: translateY(-5px);
          border-color: #41669e;
        }
        .lp-card-image {
          position: relative;
          overflow: hidden;
          background: #111724;
        }
        .lp-card-image img {
          display: block;
          width: 100%;
          aspect-ratio: 1.4 / 1;
          object-fit: cover;
          transition: transform .5s ease;
        }
        .lp-card:hover .lp-card-image img { transform: scale(1.05); }
        .lp-card-category,
        .lp-card-number {
          position: absolute;
          top: 13px;
          padding: 8px 10px;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .13em;
        }
        .lp-card-category {
          left: 13px;
          color: #dbe8ff;
          background: rgba(7,11,18,.9);
          border: 1px solid #334563;
        }
        .lp-card-number {
          right: 13px;
          color: white;
          background: #4c8dff;
        }
        .lp-card-content { padding: 21px; }
        .lp-card-brand {
          color: #58e5ff;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .2em;
        }
        .lp-card h3 {
          margin: 9px 0 0;
          font-size: 21px;
          font-weight: 900;
          letter-spacing: -.05em;
        }
        .lp-card-description {
          min-height: 36px;
          margin: 10px 0 18px;
          color: #8d99ae;
          font-size: 11px;
          line-height: 1.7;
        }
        .lp-specs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .lp-spec {
          min-width: 0;
          padding: 11px;
          background: #0b1018;
          border: 1px solid #1d293a;
        }
        .lp-spec span {
          display: block;
          color: #76849b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .12em;
        }
        .lp-spec strong {
          display: block;
          margin-top: 6px;
          color: #e0e8f6;
          font-size: 10px;
          overflow-wrap: anywhere;
        }
        .lp-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          padding-top: 17px;
          border-top: 1px solid #202a3b;
        }
        .lp-price-label {
          color: #7b889e;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .14em;
        }
        .lp-price {
          margin-top: 5px;
          font-size: 19px;
          font-weight: 950;
          letter-spacing: -.045em;
        }
        .lp-details-link {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          color: #58e5ff !important;
          background: #101d31;
          border: 1px solid #30486b;
          font-size: 20px;
          transition: .2s;
        }
        .lp-details-link:hover {
          background: #4c8dff;
          border-color: #4c8dff;
          color: white !important;
        }
        .lp-empty {
          padding: 65px 20px;
          text-align: center;
          background: #0c111b;
          border: 1px dashed #2b3a52;
        }
        .lp-empty h3 {
          margin: 0 0 10px;
          font-size: 21px;
        }
        .lp-empty p {
          color: #8997ad;
          font-size: 12px;
        }
        .lp-reset {
          margin-top: 12px;
          padding: 12px 17px;
          color: white;
          background: #172746;
          border: 1px solid #426bb0;
          cursor: pointer;
          font-size: 11px;
        }
        .lp-footnote {
          margin-top: 20px;
          color: #75839a;
          font-size: 10px;
          line-height: 1.7;
        }
        .lp-cta {
          margin-top: 70px;
          padding: 48px 30px;
          text-align: center;
          background:
            radial-gradient(ellipse at 50% 100%, rgba(76,141,255,.19), transparent 65%),
            #0c111b;
          border: 1px solid #26364e;
        }
        .lp-cta h2 {
          margin: 15px 0;
          font-size: clamp(32px, 5vw, 55px);
          font-weight: 950;
          letter-spacing: -.07em;
        }
        .lp-cta h2 span { color: #4c8dff; }
        .lp-cta p {
          max-width: 480px;
          margin: auto;
          color: #929eb3;
          font-size: 12px;
          line-height: 1.8;
        }
        .lp-cta a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 23px;
          padding: 14px 20px;
          color: white;
          background: #4c8dff;
          font-size: 11px;
          font-weight: 900;
        }
        @keyframes lp-enter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 980px) {
          .lp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 620px) {
          .lp-container { width: calc(100% - 28px); }
          .lp-hero { padding: 65px 0 45px; }
          .lp-hero h1 { font-size: clamp(45px, 13vw, 70px); }
          .lp-hero-copy { font-size: 12px; }
          .lp-hero-bottom { align-items: start; }
          .lp-hero-stats { gap: 19px; }
          .lp-hero-stat strong { font-size: 17px; }
          .lp-catalog { padding-top: 30px; }
          .lp-toolbar { display: grid; grid-template-columns: 1fr; }
          .lp-grid { grid-template-columns: 1fr; }
          .lp-card-image img { aspect-ratio: 1.55 / 1; }
          .lp-card-content { padding: 18px; }
          .lp-cta { padding: 35px 17px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-page *, .lp-page *:before, .lp-page *:after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <section className="lp-hero">
        <div className="lp-container">
          <div className="lp-eyebrow">LaptopHub / Product division</div>

          <h1>
            THE LAPTOP
            <br />
            <span>COLLECTION.</span>
          </h1>

          <p className="lp-hero-copy">
            Discover machines for competitive gaming, demanding workloads,
            creative projects and everyday productivity. Your next upgrade
            starts with the right hardware.
          </p>

          <div className="lp-hero-bottom">
            <div className="lp-hero-stats">
              <div className="lp-hero-stat">
                <strong>{laptops.length.toString().padStart(2, "0")}+</strong>
                <span>Collection entries</span>
              </div>
              <div className="lp-hero-stat">
                <strong>04</strong>
                <span>Main categories</span>
              </div>
              <div className="lp-hero-stat">
                <strong>01</strong>
                <span>Your next machine</span>
              </div>
            </div>

            <span className="lp-scroll-note">↓ EXPLORE THE COLLECTION</span>
          </div>
        </div>
      </section>

      <section className="lp-container lp-catalog">
        <div className="lp-toolbar">
          <label className="lp-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, brand, processor or GPU..."
              aria-label="Search laptops"
            />
          </label>

          <select
            className="lp-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort collection"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <div className="lp-categories" aria-label="Filter laptop category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`lp-category-button ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="lp-results-bar">
          <strong>Available machines</strong>
          <span>
            {loading
              ? "Loading collection..."
              : `${filteredLaptops.length} matching results`}
          </span>
        </div>

        {loading ? (
          <div className="lp-empty">
            <h3>Preparing your collection</h3>
            <p>Loading laptop information...</p>
          </div>
        ) : filteredLaptops.length ? (
          <div className="lp-grid">
            {filteredLaptops.map((laptop, index) => (
              <LaptopCard
                key={laptop._id || laptop.id || laptop.name}
                laptop={laptop}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="lp-empty">
            <h3>No laptops found</h3>
            <p>Try a different search term or category.</p>
            <button
              className="lp-reset"
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSort("featured");
              }}
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {source === "demo" && !loading && (
          <p className="lp-footnote">
            Demo products are being shown because no products were returned by
            the API. Add products to your backend to display your real inventory.
          </p>
        )}

        <div className="lp-cta">
          <div className="lp-eyebrow" style={{ justifyContent: "center" }}>
            Need help choosing?
          </div>
          <h2>
            FIND YOUR <span>PERFECT MACHINE.</span>
          </h2>
          <p>
            Tell us what you need your laptop for, and get in touch with
            LaptopHub to discuss your requirements.
          </p>
          <Link to="/contact">CONTACT LAPTOPHUB ↗</Link>
        </div>
      </section>
    </main>
  );
}
