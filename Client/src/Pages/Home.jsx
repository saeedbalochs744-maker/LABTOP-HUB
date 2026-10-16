
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  Laptop,
  ShieldCheck,
  Truck,
  Headphones,
  Cpu,
  HardDrive,
  MemoryStick,
  SlidersHorizontal,
  X,
  Zap,
  ChevronRight,
} from "lucide-react";

const LAPTOPS = [
  {
    id: 1,
    name: "AERO X15 Gaming",
    brand: "ASUS",
    category: "Gaming",
    processor: "Intel Core i7",
    ram: "16GB DDR5",
    storage: "1TB SSD",
    price: 289999,
    oldPrice: 319999,
    badge: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "MacBook Pro 14",
    brand: "Apple",
    category: "Premium",
    processor: "Apple M-series",
    ram: "16GB",
    storage: "512GB SSD",
    price: 499999,
    badge: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "ThinkPro Business 14",
    brand: "Lenovo",
    category: "Business",
    processor: "Intel Core i5",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    price: 179999,
    badge: "BUSINESS",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "UltraBook Air 15",
    brand: "UltraBook",
    category: "Student",
    processor: "Intel Core i5",
    ram: "8GB DDR4",
    storage: "512GB SSD",
    price: 139999,
    badge: "STUDENT PICK",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "ROG Striker 16",
    brand: "ROG",
    category: "Gaming",
    processor: "Intel Core i9",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    price: 429999,
    oldPrice: 459999,
    badge: "HIGH PERFORMANCE",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    name: "Creator Studio 16",
    brand: "Creator",
    category: "Creator",
    processor: "AMD Ryzen 7",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    price: 329999,
    badge: "CREATOR EDITION",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85",
  },
];

const CATEGORIES = [
  "All",
  "Gaming",
  "Business",
  "Student",
  "Creator",
  "Premium",
];

const formatPrice = (price) =>
  `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function LaptopCard({ laptop }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-950/30">
      <div className="relative h-56 overflow-hidden bg-slate-800">
        <img
          src={
            imageFailed
              ? "https://placehold.co/900x600/0a1020/67e8f9?text=LaptopHub"
              : laptop.image
          }
          alt={laptop.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/10" />

        <span className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-slate-950/85 px-3 py-1.5 text-[10px] font-bold tracking-widest text-cyan-300">
          {laptop.badge}
        </span>

        <span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs text-white">
          {laptop.brand}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            {laptop.category}
          </span>
          <Zap size={15} className="text-cyan-400" />
        </div>

        <h3 className="text-xl font-bold text-white">{laptop.name}</h3>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-slate-950/70 p-3">
            <Cpu size={17} className="mb-2 text-cyan-400" />
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Processor
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-200">
              {laptop.processor}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-950/70 p-3">
            <MemoryStick size={17} className="mb-2 text-cyan-400" />
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Memory
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-200">
              {laptop.ram}
            </p>
          </div>

          <div className="col-span-2 flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/70 p-3">
            <HardDrive size={17} className="text-cyan-400" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Storage
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-200">
                {laptop.storage}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-5">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="mt-1 text-lg font-black text-white">
              {formatPrice(laptop.price)}
            </p>
            {laptop.oldPrice && (
              <p className="mt-1 text-xs text-slate-500 line-through">
                {formatPrice(laptop.oldPrice)}
              </p>
            )}
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-black text-slate-950 transition hover:bg-cyan-300"
          >
            Enquire <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("featured");

  const filteredLaptops = useMemo(() => {
    let result = LAPTOPS.filter((laptop) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        [
          laptop.name,
          laptop.brand,
          laptop.category,
          laptop.processor,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        category === "All" || laptop.category === category;

      const matchesBudget =
        budget === "All" ||
        (budget === "under150" && laptop.price < 150000) ||
        (budget === "150to300" &&
          laptop.price >= 150000 &&
          laptop.price <= 300000) ||
        (budget === "over300" && laptop.price > 300000);

      return matchesSearch && matchesCategory && matchesBudget;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, category, budget, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSort("featured");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-white">
      {/* Announcement bar */}
      <div className="border-b border-cyan-400/10 bg-cyan-400/[0.06] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300 sm:text-xs sm:tracking-[0.25em]">
        <Zap size={14} className="mr-2 inline" />
        Your next-level laptop experience starts here
      </div>

      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(8,145,178,0.17),transparent_45%),radial-gradient(ellipse_at_10%_80%,rgba(37,99,235,0.13),transparent_40%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Welcome to LaptopHub
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              POWER YOUR
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                NEXT MOVE.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Discover gaming machines, business laptops, student essentials
              and premium performance systems built for your ambitions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#laptops"
                className="inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Laptops <ArrowUpRight size={18} />
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-xl border border-white/15 px-6 py-4 text-sm font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/5"
              >
                Discover LaptopHub <ChevronRight size={18} />
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {[
                ["100+", "Laptop options"],
                ["20+", "Brand choices"],
                ["24/7", "Support focus"],
              ].map(([number, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white sm:text-3xl">
                    {number}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-cyan-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-900 p-3 shadow-2xl shadow-cyan-950/30">
              <img
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1400&q=90"
                alt="Laptop setup"
                className="h-[300px] w-full rounded-2xl object-cover sm:h-[430px]"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-b-2xl bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-6 pt-20">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                  Performance without limits
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  FIND YOUR POWER.
                </h2>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 backdrop-blur">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  LaptopHub
                </p>
                <p className="mt-1 text-sm font-black text-cyan-300">
                  NEXT GEN TECH
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <SectionTitle
          eyebrow="Choose your direction"
          title="BUILT FOR YOUR WORLD."
          description="Find the right machine for the way you work, play, create and study."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.filter((item) => item !== "All").map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                document.getElementById("laptops")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                category === item
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:bg-slate-900"
              }`}
            >
              <Laptop
                size={22}
                className={category === item ? "text-cyan-300" : "text-slate-500"}
              />
              <p className="mt-5 font-bold text-white">{item}</p>
              <p className="mt-1 text-xs text-slate-500">Explore range</p>
            </button>
          ))}
        </div>
      </section>

      {/* Laptop catalogue */}
      <section id="laptops" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 lg:px-10">
        <SectionTitle
          eyebrow="The LaptopHub collection"
          title="FIND YOUR MACHINE."
          description="Search the collection, select a category, and sort by your budget."
        />

        <div className="mb-8 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search laptops, brands, processors..."
                className="w-full rounded-xl border border-white/10 bg-slate-950 py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950 py-4 pl-11 pr-4 text-sm text-white outline-none focus:border-cyan-400/60"
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All categories" : item}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400/60"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-slate-500">Budget:</span>
            {[
              ["All", "All prices"],
              ["under150", "Under Rs. 150k"],
              ["150to300", "Rs. 150k–300k"],
              ["over300", "Over Rs. 300k"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setBudget(value)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  budget === value
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}

            {(search || category !== "All" || budget !== "All" || sort !== "featured") && (
              <button
                onClick={resetFilters}
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white"
              >
                <X size={14} /> Reset filters
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-bold text-white">{filteredLaptops.length}</span>{" "}
            laptop{filteredLaptops.length === 1 ? "" : "s"}
          </p>
          <span className="text-xs uppercase tracking-widest text-slate-600">
            LaptopHub / Collection
          </span>
        </div>

        {filteredLaptops.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredLaptops.map((laptop) => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-16 text-center">
            <Search size={32} className="mx-auto text-slate-600" />
            <h3 className="mt-4 text-xl font-bold text-white">
              No laptops found
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Try another search or change your filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              Show all laptops
            </button>
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
          {[
            {
              icon: ShieldCheck,
              title: "Quality Focus",
              text: "Choose specifications that fit your needs.",
            },
            {
              icon: Truck,
              title: "Delivery Support",
              text: "Contact us to discuss delivery arrangements.",
            },
            {
              icon: Headphones,
              title: "Helpful Support",
              text: "Get help choosing your next laptop.",
            },
            {
              icon: Cpu,
              title: "Performance First",
              text: "Compare processors, memory and storage.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <Icon size={22} className="text-cyan-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/70 via-slate-900 to-blue-950/50 p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                Your next move starts here
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black sm:text-5xl">
                READY TO LEVEL UP?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Need help choosing? Contact LaptopHub and tell us what you
                need your laptop to do.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              Talk to LaptopHub <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
