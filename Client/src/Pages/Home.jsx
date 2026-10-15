
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "./api";

const DEMO_PRODUCTS = [
  {
    _id: "demo-1",
    name: "AERO X15",
    brand: "AERO",
    category: "Gaming",
    price: 289999,
    description: "High-performance gaming built for your next level.",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i7", ram: "16GB RAM", storage: "1TB SSD", gpu: "RTX 4060" },
    stock: 8,
    badge: "BEST SELLER",
  },
  {
    _id: "demo-2",
    name: "MACBOOK PRO 14",
    brand: "Apple",
    category: "Business",
    price: 499999,
    description: "Powerful performance for demanding creative workflows.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Apple Silicon", ram: "16GB RAM", storage: "512GB SSD", gpu: "Integrated" },
    stock: 5,
    badge: "PREMIUM",
  },
  {
    _id: "demo-3",
    name: "THINKPRO 14",
    brand: "ThinkPro",
    category: "Business",
    price: 179999,
    description: "A reliable productivity machine for work and study.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i5", ram: "16GB RAM", storage: "512GB SSD", gpu: "Integrated" },
    stock: 12,
    badge: "SMART CHOICE",
  },
  {
    _id: "demo-4",
    name: "ULTRABOOK AIR 15",
    brand: "UltraBook",
    category: "Student",
    price: 139999,
    description: "Lightweight portability for everyday adventures.",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i5", ram: "8GB RAM", storage: "512GB SSD", gpu: "Integrated" },
    stock: 15,
    badge: "LIGHTWEIGHT",
  },
  {
    _id: "demo-5",
    name: "ROG STRIKER 16",
    brand: "ROG",
    category: "Gaming",
    price: 429999,
    description: "Immersive gaming with serious graphics performance.",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i7", ram: "32GB RAM", storage: "1TB SSD", gpu: "RTX Series" },
    stock: 4,
    badge: "HIGH PERFORMANCE",
  },
  {
    _id: "demo-6",
    name: "CAMPUSBOOK 15",
    brand: "CampusBook",
    category: "Student",
    price: 109999,
    description: "Everyday performance for classes, projects, and more.",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
    specs: { cpu: "Intel Core i3", ram: "8GB RAM", storage: "256GB SSD", gpu: "Integrated" },
    stock: 10,
    badge: "STUDENT PICK",
  },
];

const CATEGORIES = ["All", "Gaming", "Business", "Student"];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="12" rx="1.5" />
      <path d="M2 20h20l-2-4H4l-2 4Z" />
    </svg>
  );
}

function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  const specs = product.specs || {};
  const image = product.image || product.imageUrl;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1120] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-950/20">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#101827] p-5 sm:h-60">
        {!imageFailed && image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-blue-300">
            <LaptopIcon />
            <span className="text-xs text-slate-500">Laptop image unavailable</span>
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-md border border-blue-300/20 bg-[#070b14]/90 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.14em] text-blue-200">
          {product.badge || product.category || "LAPTOP"}
        </div>

        {Number(product.stock) > 0 && Number(product.stock) <= 5 && (
          <div className="absolute bottom-3 right-3 rounded-md bg-amber-400/10 px-2 py-1 text-[10px] font-semibold text-amber-300">
            Limited stock
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
            {product.brand || "LaptopHub"}
          </span>
          <span className="text-[10px] text-slate-500">
            {product.category || "Technology"}
          </span>
        </div>

        <h3 className="text-lg font-bold tracking-tight text-white">
          {product.name}
        </h3>

        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">
          {product.description || "Discover dependable performance for your everyday needs."}
        </p>

        <div className="my-4 grid grid-cols-2 gap-2">
          {[
            ["CPU", specs.cpu],
            ["MEMORY", specs.ram],
            ["STORAGE", specs.storage],
            ["GRAPHICS", specs.gpu],
          ]
            .filter((item) => item[1])
            .map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2"
              >
                <p className="text-[9px] font-bold tracking-[0.12em] text-slate-600">
                  {label}
                </p>
                <p className="mt-1 truncate text-xs font-medium text-slate-300">
                  {value}
                </p>
              </div>
            ))}
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-white/[0.07] pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Price
            </p>
            <p className="mt-1 text-lg font-extrabold text-white">
              {formatPrice(product.price)}
            </p>
          </div>

          <Link
            to={product._id?.startsWith("demo-") ? "/contact" : `/laptops/${product._id}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-400"
          >
            {product._id?.startsWith("demo-") ? "Enquire" : "View details"}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);
  const [search, setSearch] = useState("");

  const selectedCategory = searchParams.get("category") || "All";

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
          setApiFailed(false);
        } else if (active) {
          setProducts(DEMO_PRODUCTS);
        }
      } catch (error) {
        if (active) {
          setProducts(DEMO_PRODUCTS);
          setApiFailed(true);
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

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        String(product.category || "").toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch = [
        product.name,
        product.brand,
        product.category,
        product.description,
        product.specs?.cpu,
        product.specs?.gpu,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  const changeCategory = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const featuredProducts = filteredProducts.slice(0, 6);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      {/* Hero */}
      <section className="relative isolate border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 72% 35%, rgba(37,99,235,0.17), transparent 42%), radial-gradient(ellipse at 15% 85%, rgba(14,165,233,0.08), transparent 35%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.13) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Your technology destination
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[88px]">
              POWER YOUR
              <span className="mt-2 block text-blue-400">NEXT MOVE.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Discover gaming machines, productivity powerhouses, and everyday
              laptops. Find the technology that matches your ambitions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#featured"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
              >
                Explore laptops
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                to="/about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400/30 hover:bg-white/[0.05]"
              >
                Discover LaptopHub
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              {[
                ["01", "Gaming"],
                ["02", "Business"],
                ["03", "Student"],
              ].map(([number, label]) => (
                <div key={label}>
                  <p className="text-xs font-bold text-blue-300">{number}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-8 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1424] p-3 shadow-2xl shadow-blue-950/20">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Performance series
                  </span>
                </div>
                <span className="text-[10px] text-slate-600">LH / 001</span>
              </div>

              <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden sm:min-h-[350px]">
                <div className="absolute h-52 w-52 rounded-full border border-blue-400/10 sm:h-72 sm:w-72" />
                <div className="absolute h-40 w-40 rounded-full border border-blue-400/[0.08] sm:h-56 sm:w-56" />

                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=90"
                  alt="Laptop showcasing modern computer design"
                  className="relative z-10 max-h-[300px] w-full object-contain drop-shadow-2xl sm:max-h-[390px]"
                />

                <div className="absolute bottom-4 left-3 rounded-xl border border-white/10 bg-[#070b14]/90 px-3 py-2.5 backdrop-blur sm:bottom-6 sm:left-5">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">
                    Designed for
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    Performance
                  </p>
                </div>

                <div className="absolute right-3 top-4 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-3 py-2.5 sm:right-5 sm:top-6">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-blue-300">
                    Discover
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    Your next laptop
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-white/[0.07] p-3">
                {[
                  ["01", "Performance"],
                  ["02", "Productivity"],
                  ["03", "Portability"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="rounded-lg bg-white/[0.025] px-2 py-3 text-center"
                  >
                    <p className="text-[9px] font-bold text-blue-300">{number}</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-300 sm:text-xs">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / features */}
      <section className="border-b border-white/[0.06] bg-[#090e19]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-px px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["01", "Performance first", "Explore laptops for your workload."],
            ["02", "Choices that fit", "Compare options for different needs."],
            ["03", "Support when needed", "Contact us for product assistance."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="flex items-start gap-4 border-b border-white/[0.05] py-5 sm:border-b-0 sm:px-5 sm:py-7"
            >
              <span className="pt-0.5 text-xs font-bold text-blue-300">
                {number}
              </span>
              <div>
                <h2 className="text-sm font-bold text-white">{title}</h2>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product collection */}
      <section id="featured" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300 sm:text-xs">
              The LaptopHub collection
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Find your next machine<span className="text-blue-400">.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Explore options for gaming, work, and everyday productivity.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-300 transition hover:text-blue-200 md:self-auto"
          >
            Need help choosing?
            <ArrowIcon />
          </Link>
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => changeCategory(category)}
                className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  active
                    ? "border-blue-400/30 bg-blue-500 text-white"
                    : "border-white/[0.08] bg-white/[0.025] text-slate-400 hover:border-blue-400/25 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search products */}
        <div className="mt-5 flex max-w-md items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0b1120] px-4">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
            className="shrink-0 text-slate-500"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search laptops, brands, specs..."
            aria-label="Search laptops"
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
        </div>

        {apiFailed && (
          <p className="mt-4 rounded-xl border border-amber-300/10 bg-amber-300/[0.04] px-4 py-3 text-xs leading-5 text-amber-200/80">
            Showing sample products because the live API could not be reached.
            Check that your backend is running to load database products.
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.025]"
              />
            ))}
          </div>
        ) : featuredProducts.length ? (
          <div className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id || product.name} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0b1120] px-5 py-14 text-center">
            <LaptopIcon />
            <h3 className="mt-4 text-lg font-bold text-white">
              No laptops found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different category or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                changeCategory("All");
              }}
              className="mt-5 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
            >
              Show all laptops
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0b1120] p-5 sm:flex-row sm:p-6">
          <div>
            <p className="text-sm font-bold text-white">
              Looking for something specific?
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Contact our team for help finding the right laptop.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-5 py-3 text-sm font-bold text-blue-200 transition hover:bg-blue-500/[0.15]"
          >
            Contact us <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-[1376px] overflow-hidden rounded-3xl border border-blue-400/15 bg-[#0b1425] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300 sm:text-xs">
                Ready for your next upgrade?
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                Better technology.
                <span className="block text-blue-400">Bigger possibilities.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                Explore the collection and find a machine that fits your next move.
              </p>
            </div>

            <Link
              to="/laptops"
              className="group inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-400 md:self-auto"
            >
              Browse laptops
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
