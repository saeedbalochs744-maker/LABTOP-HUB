
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  Cpu,
  MemoryStick,
  HardDrive,
  SlidersHorizontal,
  X,
  ShieldCheck,
  Truck,
  Headphones,
  Laptop as LaptopIcon,
  Zap,
} from "lucide-react";

/* =========================================================
   LAPTOP DATA
========================================================= */

const LAPTOPS = [
  {
    id: 1,
    name: "ASUS ROG Strix G16",
    brand: "ASUS",
    category: "Gaming",
    price: 399999,
    processor: "Intel Core i9",
    ram: "32GB",
    storage: "1TB SSD",
    badge: "ULTIMATE GAMING",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Lenovo Legion 5",
    brand: "Lenovo",
    category: "Gaming",
    price: 309999,
    processor: "AMD Ryzen 7",
    ram: "16GB",
    storage: "1TB SSD",
    badge: "GAMING SERIES",
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "MacBook Pro 16",
    brand: "Apple",
    category: "Business",
    price: 499999,
    processor: "Apple M3 Pro",
    ram: "18GB",
    storage: "512GB SSD",
    badge: "PREMIUM CHOICE",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Dell XPS 15",
    brand: "Dell",
    category: "Business",
    price: 329999,
    processor: "Intel Core i7",
    ram: "16GB",
    storage: "1TB SSD",
    badge: "PROFESSIONAL",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "HP Pavilion 15",
    brand: "HP",
    category: "Student",
    price: 159999,
    processor: "Intel Core i5",
    ram: "8GB",
    storage: "512GB SSD",
    badge: "STUDENT PICK",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    name: "Microsoft Surface Laptop",
    brand: "Microsoft",
    category: "Student",
    price: 249999,
    processor: "Snapdragon X Elite",
    ram: "16GB",
    storage: "512GB SSD",
    badge: "MODERN DESIGN",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    name: "Acer Predator Helios",
    brand: "Acer",
    category: "Gaming",
    price: 289999,
    processor: "Intel Core i7",
    ram: "16GB",
    storage: "1TB SSD",
    badge: "HIGH PERFORMANCE",
    image:
      "https://images.unsplash.com/photo-1603302576877-8a3d7e8b5bcd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    category: "Business",
    price: 299999,
    processor: "Intel Core Ultra 7",
    ram: "32GB",
    storage: "1TB SSD",
    badge: "BUSINESS SERIES",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85",
  },
];

const CATEGORIES = [
  {
    id: "Gaming",
    title: "Gaming Laptops",
    subtitle: "HIGH PERFORMANCE",
    description:
      "Explore powerful machines for gaming, streaming and demanding applications.",
    icon: "🎮",
    image:
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "Business",
    title: "Business Laptops",
    subtitle: "PROFESSIONAL POWER",
    description:
      "Discover productivity-focused laptops for business and professional work.",
    icon: "💼",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "Student",
    title: "Student Laptops",
    subtitle: "SMART & AFFORDABLE",
    description:
      "Find practical laptops for assignments, research, learning and everyday tasks.",
    icon: "🎓",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1400&q=85",
  },
];

const formatPrice = (price) =>
  `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;

/* =========================================================
   REUSABLE IMAGE COMPONENT
========================================================= */

function LaptopImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={
        failed
          ? "https://placehold.co/900x600/0f172a/67e8f9?text=LaptopHub"
          : src
      }
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   LAPTOP CARD
========================================================= */

function LaptopCard({ laptop }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-950/30">
      <div className="relative h-56 overflow-hidden bg-slate-800">
        <LaptopImage
          src={laptop.image}
          alt={laptop.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />

        <span className="absolute left-4 top-4 rounded-full border border-blue-300/20 bg-slate-950/90 px-3 py-1.5 text-[10px] font-black tracking-wider text-blue-300">
          {laptop.badge}
        </span>

        <span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white">
          {laptop.brand}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
          {laptop.category}
        </p>

        <h3 className="mt-2 min-h-14 text-lg font-black leading-7 text-white">
          {laptop.name}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-950 p-3">
            <Cpu size={17} className="mb-2 text-blue-400" />
            <p className="text-[9px] font-bold tracking-wider text-slate-500">
              PROCESSOR
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-200">
              {laptop.processor}
            </p>
          </div>

          <div className="rounded-xl bg-slate-950 p-3">
            <MemoryStick size={17} className="mb-2 text-blue-400" />
            <p className="text-[9px] font-bold tracking-wider text-slate-500">
              MEMORY
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-200">
              {laptop.ram}
            </p>
          </div>

          <div className="col-span-2 flex items-center gap-3 rounded-xl bg-slate-950 p-3">
            <HardDrive size={18} className="shrink-0 text-blue-400" />
            <div>
              <p className="text-[9px] font-bold tracking-wider text-slate-500">
                STORAGE
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
            <p className="mt-1 text-lg font-black text-blue-400">
              {formatPrice(laptop.price)}
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-500"
            aria-label={`Enquire about ${laptop.name}`}
          >
            Enquire <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   CATEGORY BANNER
========================================================= */

function CategoryBanner({ category }) {
  const matchingLaptops = LAPTOPS.filter(
    (laptop) => laptop.category === category.id
  );

  return (
    <section
      id={category.id.toLowerCase()}
      className="scroll-mt-32 border-t border-white/5 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          <LaptopImage
            src={category.image}
            alt={category.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />

          <div className="relative z-10 flex min-h-[430px] flex-col justify-center p-7 sm:p-12 lg:p-16">
            <span className="text-5xl">{category.icon}</span>

            <p className="mt-6 text-xs font-black tracking-[0.3em] text-blue-400">
              {category.subtitle}
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-black text-white sm:text-5xl">
              {category.title}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {category.description}
            </p>

            <p className="mt-4 text-sm font-semibold text-blue-300">
              {matchingLaptops.length} models in this collection
            </p>

            <a
              href="#all-laptops"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500"
            >
              Explore Collection <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {matchingLaptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN SERVICE PAGE
========================================================= */

export default function Service() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("featured");

  const filteredLaptops = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = LAPTOPS.filter((laptop) => {
      const matchesSearch =
        !query ||
        [
          laptop.name,
          laptop.brand,
          laptop.category,
          laptop.processor,
          laptop.ram,
          laptop.storage,
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

    if (sort === "low") results.sort((a, b) => a.price - b.price);
    if (sort === "high") results.sort((a, b) => b.price - a.price);
    if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [search, category, budget, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSort("featured");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Announcement */}
      <div className="border-b border-blue-500/10 bg-blue-500/[0.06] px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 sm:text-xs">
        <Zap size={14} className="mr-2 inline" />
        Discover your next machine at LaptopHub
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_30%,rgba(37,99,235,0.18),transparent_45%),radial-gradient(ellipse_at_10%_80%,rgba(8,145,178,0.12),transparent_40%)]" />

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-black tracking-[0.2em] text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              LAPTOP COLLECTION
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              FIND THE RIGHT
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                MACHINE.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Explore laptops for gaming, business, education and everyday
              performance. Compare specifications and find a machine that
              matches your requirements.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#all-laptops"
                className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-sm font-black transition hover:bg-blue-500"
              >
                Explore Laptops <ArrowUpRight size={18} />
              </a>

              <Link
                to="/contact"
                className="rounded-xl border border-slate-700 px-7 py-4 text-sm font-bold transition hover:border-blue-500 hover:bg-blue-500/5"
              >
                Need Help?
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {[
                ["08", "Listed models"],
                ["03", "Categories"],
                ["24/7", "Support focus"],
              ].map(([number, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black sm:text-3xl">{number}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky category navigation */}
      <nav className="sticky top-0 z-40 border-y border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10">
          {[
            { label: "All Laptops", href: "#all-laptops" },
            { label: "🎮 Gaming", href: "#gaming" },
            { label: "💼 Business", href: "#business" },
            { label: "🎓 Student", href: "#student" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-xl border border-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* All laptops */}
      <section
        id="all-laptops"
        className="scroll-mt-24 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Complete collection"
            title="ALL LAPTOPS."
            description="Search, filter and compare available sample listings by category, budget and specifications."
          />

          {/* Search and filters */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="relative lg:col-span-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search laptops, brands..."
                  aria-label="Search laptops"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
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
                  aria-label="Filter by category"
                  className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950 py-4 pl-11 pr-4 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="All">All categories</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Business">Business</option>
                  <option value="Student">Student</option>
                </select>
              </div>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort laptops"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 text-sm text-white outline-none focus:border-blue-500"
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
                  type="button"
                  onClick={() => setBudget(value)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    budget === value
                      ? "border-blue-500 bg-blue-500/10 text-blue-300"
                      : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}

              {(search ||
                category !== "All" ||
                budget !== "All" ||
                sort !== "featured") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-blue-300 hover:text-white"
                >
                  <X size={14} /> Reset
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-black text-white">
                {filteredLaptops.length}
              </span>{" "}
              of {LAPTOPS.length} laptops
            </p>
            <span className="hidden text-xs uppercase tracking-widest text-slate-600 sm:block">
              LaptopHub / Collection
            </span>
          </div>

          {filteredLaptops.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredLaptops.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-16 text-center">
              <Search size={32} className="mx-auto text-slate-600" />
              <h3 className="mt-4 text-xl font-black">
                No laptops found
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Try changing your search or filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold hover:bg-blue-500"
              >
                Show all laptops
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Category collections */}
      {CATEGORIES.map((categoryItem) => (
        <CategoryBanner key={categoryItem.id} category={categoryItem} />
      ))}

      {/* Service benefits */}
      <section className="border-y border-white/10 bg-slate-900/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
          {[
            {
              Icon: ShieldCheck,
              title: "Quality Focus",
              description: "Compare specifications before you choose.",
            },
            {
              Icon: Truck,
              title: "Delivery Support",
              description: "Contact us to discuss delivery options.",
            },
            {
              Icon: Headphones,
              title: "Helpful Support",
              description: "Ask questions about your laptop requirements.",
            },
            {
              Icon: LaptopIcon,
              title: "Laptop Selection",
              description: "Explore systems for work, study and gaming.",
            },
          ].map(({ Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                <Icon size={22} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-12 lg:p-16">
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                  Expert assistance
                </p>
                <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                  READY TO FIND YOUR LAPTOP?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Tell us your budget and what you need your laptop for.
                  We can help you compare your options.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-sm font-black transition hover:bg-blue-500"
              >
                Contact LaptopHub <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
