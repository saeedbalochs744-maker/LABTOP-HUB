import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./api";

const CATEGORY = "Gaming";
const TITLE = "Gaming";
const ICON = "🎮";
const SUBTITLE = "High-refresh displays, dedicated graphics and serious cooling.";

const Gaming = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api(`/products?category=${CATEGORY}`);
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const list = useMemo(() => {
    const term = search.trim().toLowerCase();

    let result = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term)
    );

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, sort]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-black" />
        <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-blue-600/25 blur-[130px]" />
        <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2">
            <span>👑</span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-300">
              VIP Collection
            </span>
          </div>

          <div className="mt-6 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl shadow-lg shadow-blue-600/30">
              {ICON}
            </div>

            <h1 className="text-5xl font-black uppercase leading-none sm:text-7xl">
              {TITLE}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Laptops
              </span>
            </h1>
          </div>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
            {SUBTITLE}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        {/* CONTROLS */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {loading ? "Loading..." : `${list.length} laptops`}
          </p>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or brand..."
              className="w-full rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500 sm:w-64"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 animate-pulse rounded-3xl border border-white/10 bg-slate-900"
              />
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-red-400/30 bg-red-400/10 p-10 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-blue-600 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && list.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-14 text-center">
            <p className="text-slate-400">
              No {TITLE.toLowerCase()} laptops found.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block text-xs font-black uppercase tracking-widest text-blue-400 hover:text-blue-300"
            >
              Ask us about stock →
            </Link>
          </div>
        )}

        {/* GRID */}
        {!loading && !error && list.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-900/30"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 to-slate-900">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-60 items-center justify-center text-7xl">
                      💻
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                    {product.brand}
                  </span>

                  {product.stock > 0 ? (
                    <span className="absolute right-4 top-4 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-400 backdrop-blur">
                      In stock
                    </span>
                  ) : (
                    <span className="absolute right-4 top-4 rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-400 backdrop-blur">
                      Sold out
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-black">{product.name}</h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-black text-blue-400">
                      Rs. {Number(product.price).toLocaleString()}
                    </span>

                    <Link
                      to="/contact"
                      className="rounded-full border border-white/15 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition hover:border-blue-500 hover:bg-blue-600"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Gaming;
