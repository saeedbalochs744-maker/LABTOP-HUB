import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [liked, setLiked] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const laptops = [
    {
      id: 1,
      name: "MacBook Pro 16",
      brand: "Apple",
      category: "Professional",
      price: 499999,
      oldPrice: 549999,
      rating: 4.9,
      reviews: 128,
      badge: "BEST SELLER",
      processor: "Apple M3 Pro",
      ram: "18GB",
      storage: "512GB SSD",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Dell XPS 15",
      brand: "Dell",
      category: "Professional",
      price: 329999,
      oldPrice: 369999,
      rating: 4.8,
      reviews: 96,
      badge: "POPULAR",
      processor: "Intel Core i7",
      ram: "16GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "ASUS ROG Strix",
      brand: "ASUS",
      category: "Gaming",
      price: 419999,
      oldPrice: 459999,
      rating: 4.9,
      reviews: 87,
      badge: "GAMING",
      processor: "Intel Core i9",
      ram: "32GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "HP Spectre x360",
      brand: "HP",
      category: "Student",
      price: 279999,
      oldPrice: 319999,
      rating: 4.7,
      reviews: 74,
      badge: "NEW",
      processor: "Intel Core Ultra 7",
      ram: "16GB",
      storage: "512GB SSD",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      name: "Lenovo Legion 5",
      brand: "Lenovo",
      category: "Gaming",
      price: 309999,
      oldPrice: 349999,
      rating: 4.8,
      reviews: 112,
      badge: "HOT",
      processor: "AMD Ryzen 7",
      ram: "16GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop",
      brand: "Microsoft",
      category: "Student",
      price: 249999,
      oldPrice: 279999,
      rating: 4.6,
      reviews: 61,
      badge: "LIGHTWEIGHT",
      processor: "Snapdragon X Elite",
      ram: "16GB",
      storage: "512GB SSD",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 7,
      name: "Acer Predator Helios",
      brand: "Acer",
      category: "Gaming",
      price: 289999,
      oldPrice: 329999,
      rating: 4.7,
      reviews: 89,
      badge: "PERFORMANCE",
      processor: "Intel Core i7",
      ram: "16GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1603302576877-8a3d7e8b5bcd?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 8,
      name: "Lenovo ThinkPad X1",
      brand: "Lenovo",
      category: "Professional",
      price: 299999,
      oldPrice: 339999,
      rating: 4.9,
      reviews: 102,
      badge: "BUSINESS",
      processor: "Intel Core Ultra 7",
      ram: "32GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const categories = [
    {
      name: "Gaming",
      count: "32+ Models",
      icon: "🎮",
      image:
        "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Professional",
      count: "45+ Models",
      icon: "💼",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Student",
      count: "28+ Models",
      icon: "🎓",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Creator",
      count: "24+ Models",
      icon: "🎨",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const brands = [
    "APPLE",
    "DELL",
    "HP",
    "LENOVO",
    "ASUS",
    "ACER",
    "MICROSOFT",
  ];

  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      text: "Quick and secure delivery across Pakistan.",
    },
    {
      icon: "🛡️",
      title: "Official Warranty",
      text: "Original products with trusted warranty coverage.",
    },
    {
      icon: "💳",
      title: "Secure Payment",
      text: "Safe and reliable payment options.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      text: "Our team is ready whenever you need help.",
    },
  ];

  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      const categoryMatch =
        activeCategory === "All" || laptop.category === activeCategory;

      const searchMatch =
        laptop.name.toLowerCase().includes(search.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(search.toLowerCase()) ||
        laptop.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK").format(price);
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[720px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold mb-7">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                PREMIUM LAPTOP STORE
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
                POWER YOUR
                <span className="block text-blue-500">
                  NEXT MOVE.
                </span>
              </h1>

              <p className="mt-7 text-lg text-slate-300 max-w-xl leading-8">
                Discover premium laptops built for gaming, business,
                creativity, study and everything in between.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <Link
                  to="/service"
                  className="px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-bold shadow-xl shadow-blue-600/20"
                >
                  Explore Laptops →
                </Link>

                <Link
                  to="/contact"
                  className="px-7 py-4 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-900 transition font-bold"
                >
                  Talk To Us
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl">
                <div>
                  <h3 className="text-3xl font-black">100+</h3>
                  <p className="text-sm text-slate-500 mt-1">Laptops</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black">20+</h3>
                  <p className="text-sm text-slate-500 mt-1">Brands</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black">24/7</h3>
                  <p className="text-sm text-slate-500 mt-1">Support</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-blue-500/10 blur-3xl rounded-full" />

              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=90"
                  alt="Premium Laptop"
                  className="w-full h-[430px] object-cover rounded-[1.5rem]"
                />

                <div className="absolute left-8 bottom-8 right-8 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-blue-400 font-bold">
                        FEATURED DEVICE
                      </p>
                      <h3 className="text-xl font-bold mt-1">
                        MacBook Pro 16
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-blue-400 font-black text-xl">
                        Rs. 499,999
                      </p>
                      <p className="text-xs text-slate-500">
                        Premium Edition
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-y border-white/5 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xl">
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">
                Shop By Need
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                Find Your Perfect Machine
              </h2>
            </div>

            <Link
              to="/service"
              className="text-blue-400 font-bold hover:text-blue-300"
            >
              View All Laptops →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className="group relative h-72 overflow-hidden rounded-3xl text-left border border-white/10"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-3xl mb-3">{category.icon}</div>

                  <h3 className="text-2xl font-black">
                    {category.name}
                  </h3>

                  <p className="text-slate-300 text-sm mt-1">
                    {category.count}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">

            <div>
              <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">
                Featured Collection
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                Popular Laptops
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Search laptop..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-slate-950 border border-slate-700 rounded-xl px-5 py-3 outline-none focus:border-blue-500 transition"
              />

              <div className="flex gap-2 overflow-x-auto">
                {["All", "Gaming", "Professional", "Student"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm font-bold transition ${
                        activeCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-slate-950 border border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>

            </div>
          </div>

          {filteredLaptops.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredLaptops.map((laptop) => (
                <div
                  key={laptop.id}
                  className="group rounded-3xl bg-slate-950 border border-white/10 overflow-hidden hover:border-blue-500/40 transition duration-300"
                >

                  <div className="relative h-64 overflow-hidden">

                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-blue-600 text-xs font-black">
                        {laptop.badge}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleLike(laptop.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur flex items-center justify-center hover:bg-blue-600 transition"
                    >
                      {liked.includes(laptop.id) ? "♥" : "♡"}
                    </button>

                  </div>

                  <div className="p-5">

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-blue-400 font-bold uppercase">
                        {laptop.brand}
                      </span>

                      <span className="text-xs text-slate-500">
                        ★ {laptop.rating} ({laptop.reviews})
                      </span>
                    </div>

                    <h3 className="text-lg font-black">
                      {laptop.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="rounded-lg bg-slate-900 p-2">
                        <p className="text-[10px] text-slate-500">
                          PROCESSOR
                        </p>
                        <p className="text-xs font-bold mt-1">
                          {laptop.processor}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-900 p-2">
                        <p className="text-[10px] text-slate-500">
                          RAM
                        </p>
                        <p className="text-xs font-bold mt-1">
                          {laptop.ram}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-900 p-2 col-span-2">
                        <p className="text-[10px] text-slate-500">
                          STORAGE
                        </p>
                        <p className="text-xs font-bold mt-1">
                          {laptop.storage}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-5">

                      <div>
                        <p className="text-xs text-slate-500 line-through">
                          Rs. {formatPrice(laptop.oldPrice)}
                        </p>

                        <p className="text-xl font-black text-blue-400">
                          Rs. {formatPrice(laptop.price)}
                        </p>
                      </div>

                      <button
                        onClick={addToCart}
                        className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center font-bold transition"
                      >
                        +
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-700 rounded-3xl">
              <div className="text-5xl mb-5">🔍</div>

              <h3 className="text-2xl font-black">
                No laptops found
              </h3>

              <p className="text-slate-500 mt-2">
                Try another search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 px-6 py-3 rounded-xl bg-blue-600 font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/service"
              className="inline-flex px-7 py-4 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-600/10 transition font-bold"
            >
              Explore Complete Collection →
            </Link>
          </div>

        </div>
      </section>

      {/* ================= GAMING BANNER ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] min-h-[430px] border border-blue-500/20">

            <img
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1600&q=90"
              alt="Gaming Laptop"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

            <div className="relative z-10 max-w-2xl p-8 md:p-14 flex flex-col justify-center min-h-[430px]">

              <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs">
                Gaming Collection
              </span>

              <h2 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
                PLAY WITHOUT
                <span className="block text-blue-500">
                  LIMITS.
                </span>
              </h2>

              <p className="text-slate-300 mt-5 leading-7">
                High-performance gaming laptops with powerful processors,
                dedicated graphics and fast displays.
              </p>

              <Link
                to="/service"
                className="mt-8 inline-flex w-fit px-7 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition"
              >
                Shop Gaming Laptops →
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECS ================= */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">
              Built For Performance
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              Choose Your Power
            </h2>

            <p className="text-slate-400 mt-5 leading-7">
              From everyday productivity to serious gaming and professional
              workloads, find the specifications that match your lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: "⚡",
                title: "CPU",
                value: "Intel / AMD / Apple",
                text: "Latest generation processors.",
              },
              {
                icon: "🎮",
                title: "GPU",
                value: "RTX / Radeon",
                text: "Dedicated graphics for demanding work.",
              },
              {
                icon: "🧠",
                title: "RAM",
                value: "8GB — 64GB",
                text: "Smooth multitasking and performance.",
              },
              {
                icon: "💾",
                title: "SSD",
                value: "256GB — 4TB",
                text: "Fast storage with plenty of space.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-3xl border border-white/10 bg-slate-950 hover:border-blue-500/30 transition"
              >
                <div className="text-3xl">{item.icon}</div>

                <p className="text-blue-400 font-bold text-sm mt-6">
                  {item.title}
                </p>

                <h3 className="text-xl font-black mt-2">
                  {item.value}
                </h3>

                <p className="text-slate-500 text-sm mt-3 leading-6">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <p className="text-center text-xs font-bold tracking-[0.4em] text-slate-500">
            TRUSTED BRANDS
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {brands.map((brand) => (
              <div
                key={brand}
                className="h-20 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/5 text-slate-400 font-black tracking-widest hover:text-blue-400 hover:border-blue-500/30 transition"
              >
                {brand}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">
                Why LaptopHub
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
                Technology You Can
                <span className="block text-blue-500">
                  Trust.
                </span>
              </h2>

              <p className="text-slate-400 mt-6 leading-8 max-w-xl">
                We make it easier to choose the right laptop by combining
                trusted brands, useful specifications, competitive prices
                and dedicated customer support.
              </p>

              <div className="mt-8 space-y-5">

                {[
                  "Original and authentic products",
                  "Competitive market pricing",
                  "Warranty-backed devices",
                  "Expert buying assistance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <span className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      ✓
                    </span>

                    <span className="text-slate-200 font-semibold">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              <Link
                to="/about"
                className="inline-flex mt-9 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition"
              >
                Learn More About Us →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-3xl bg-blue-600 p-7 min-h-56">
                <div className="text-4xl">🏆</div>

                <h3 className="text-2xl font-black mt-12">
                  Premium Quality
                </h3>

                <p className="text-blue-100 text-sm mt-2">
                  Carefully selected devices.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-900 border border-white/10 p-7 min-h-56 mt-8">
                <div className="text-4xl">🔒</div>

                <h3 className="text-2xl font-black mt-12">
                  Secure Shopping
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Safe buying experience.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-900 border border-white/10 p-7 min-h-56">
                <div className="text-4xl">💻</div>

                <h3 className="text-2xl font-black mt-12">
                  Latest Tech
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Modern hardware choices.
                </p>
              </div>

              <div className="rounded-3xl bg-blue-950 border border-blue-500/20 p-7 min-h-56 mt-8">
                <div className="text-4xl">🤝</div>

                <h3 className="text-2xl font-black mt-12">
                  Real Support
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Help before and after purchase.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-950 to-slate-950 p-8 md:p-14 text-center">

            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />

            <div className="relative">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em]">
                Stay Updated
              </span>

              <h2 className="text-4xl md:text-5xl font-black mt-4">
                Get The Latest Tech Deals
              </h2>

              <p className="text-slate-400 max-w-xl mx-auto mt-5 leading-7">
                Subscribe for new laptop launches, exclusive deals and
                technology updates.
              </p>

              {!subscribed ? (
                <form
                  onSubmit={handleSubscribe}
                  className="max-w-xl mx-auto mt-8 flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="mt-8 inline-flex px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold">
                  ✓ Successfully subscribed!
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="rounded-[2rem] bg-blue-600 p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>
              <p className="text-blue-100 font-bold text-sm uppercase tracking-[0.3em]">
                Ready To Upgrade?
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                FIND YOUR NEXT LAPTOP.
              </h2>

              <p className="text-blue-100 mt-4 max-w-xl">
                Explore our collection and find the machine that fits your
                work, study, gaming or creative needs.
              </p>
            </div>

            <Link
              to="/contact"
              className="shrink-0 px-8 py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-black transition"
            >
              Contact Us →
            </Link>

          </div>

        </div>
      </section>

      {/* ================= CART FLOATING BUTTON ================= */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">

          <button className="relative w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-600/30 flex items-center justify-center text-2xl transition">
            🛒

            <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white text-blue-600 text-xs font-black flex items-center justify-center">
              {cartCount}
            </span>
          </button>

        </div>
      )}

    </main>
  );
};

export default Home;