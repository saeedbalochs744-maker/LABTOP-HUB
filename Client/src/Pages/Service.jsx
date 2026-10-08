import React from "react";
import { Link, useLocation } from "react-router-dom";

const Service = () => {
  const location = useLocation();

  const laptops = [
    {
      id: 1,
      name: "ASUS ROG Strix G16",
      category: "Gaming",
      price: "399,999",
      processor: "Intel Core i9",
      ram: "32GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Lenovo Legion 5",
      category: "Gaming",
      price: "309,999",
      processor: "AMD Ryzen 7",
      ram: "16GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "MacBook Pro 16",
      category: "Business",
      price: "499,999",
      processor: "Apple M3 Pro",
      ram: "18GB",
      storage: "512GB SSD",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "Dell XPS 15",
      category: "Business",
      price: "329,999",
      processor: "Intel Core i7",
      ram: "16GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      name: "HP Pavilion 15",
      category: "Student",
      price: "159,999",
      processor: "Intel Core i5",
      ram: "8GB",
      storage: "512GB SSD",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop",
      category: "Student",
      price: "249,999",
      processor: "Snapdragon X Elite",
      ram: "16GB",
      storage: "512GB SSD",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 7,
      name: "Acer Predator Helios",
      category: "Gaming",
      price: "289,999",
      processor: "Intel Core i7",
      ram: "16GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1603302576877-8a3d7e8b5bcd?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 8,
      name: "Lenovo ThinkPad X1",
      category: "Business",
      price: "299,999",
      processor: "Intel Core Ultra 7",
      ram: "32GB",
      storage: "1TB SSD",
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const categories = [
    {
      id: "gaming",
      title: "Gaming Laptops",
      subtitle: "HIGH PERFORMANCE",
      description:
        "Powerful laptops designed for gaming, streaming and demanding applications.",
      icon: "🎮",
      image:
        "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: "business",
      title: "Business Laptops",
      subtitle: "PROFESSIONAL POWER",
      description:
        "Reliable and powerful machines designed for business and professional work.",
      icon: "💼",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: "student",
      title: "Student Laptops",
      subtitle: "SMART & AFFORDABLE",
      description:
        "Affordable laptops for assignments, research, study and everyday productivity.",
      icon: "🎓",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1400&q=85",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950/40" />

        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="absolute right-10 top-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-[0.25em]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              LAPTOP COLLECTION
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mt-7 leading-[0.95]">
              FIND THE RIGHT
              <span className="block text-blue-500">
                MACHINE.
              </span>
            </h1>

            <p className="mt-7 text-lg text-slate-400 max-w-2xl leading-8">
              Explore our complete collection of premium laptops for
              gaming, business, education and everyday performance.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="#all-laptops"
                className="px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-black transition"
              >
                Explore Laptops →
              </a>

              <Link
                to="/contact"
                className="px-7 py-4 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 font-bold transition"
              >
                Need Help?
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          QUICK CATEGORY NAV
      ====================================================== */}

      <section className="sticky top-[90px] z-40 bg-slate-950/90 backdrop-blur-xl border-y border-white/5">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex items-center gap-2 overflow-x-auto py-3">

            <a
              href="#all-laptops"
              className="whitespace-nowrap px-5 py-3 rounded-xl bg-blue-600 text-sm font-bold"
            >
              All Laptops
            </a>

            <a
              href="#gaming"
              className="whitespace-nowrap px-5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              🎮 Gaming
            </a>

            <a
              href="#business"
              className="whitespace-nowrap px-5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              💼 Business
            </a>

            <a
              href="#student"
              className="whitespace-nowrap px-5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              🎓 Student
            </a>

          </div>

        </div>

      </section>

      {/* =====================================================
          ALL LAPTOPS
      ====================================================== */}

      <section
        id="all-laptops"
        className="py-24 scroll-mt-32"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

            <div>

              <p className="text-blue-500 text-xs font-black tracking-[0.3em] uppercase">
                Complete Collection
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                All Laptops
              </h2>

              <p className="text-slate-500 mt-3">
                Choose from our premium laptop collection.
              </p>

            </div>

            <div className="px-5 py-3 rounded-xl bg-slate-900 border border-white/5 text-sm text-slate-400">
              {laptops.length} Premium Models
            </div>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {laptops.map((laptop) => (

              <div
                key={laptop.id}
                className="group rounded-3xl bg-slate-900/60 border border-white/10 overflow-hidden hover:border-blue-500/30 transition duration-300"
              >

                <div className="relative h-60 overflow-hidden">

                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-blue-600 text-[10px] font-black">
                      {laptop.category}
                    </span>
                  </div>

                </div>

                <div className="p-5">

                  <h3 className="text-lg font-black">
                    {laptop.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mt-4">

                    <div className="p-2 rounded-lg bg-slate-950">
                      <p className="text-[9px] text-slate-600">
                        PROCESSOR
                      </p>
                      <p className="text-xs font-bold mt-1">
                        {laptop.processor}
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950">
                      <p className="text-[9px] text-slate-600">
                        RAM
                      </p>
                      <p className="text-xs font-bold mt-1">
                        {laptop.ram}
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 col-span-2">
                      <p className="text-[9px] text-slate-600">
                        STORAGE
                      </p>
                      <p className="text-xs font-bold mt-1">
                        {laptop.storage}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center justify-between mt-5">

                    <div>
                      <p className="text-xs text-slate-500">
                        Starting from
                      </p>

                      <p className="text-xl font-black text-blue-400">
                        Rs. {laptop.price}
                      </p>
                    </div>

                    <Link
                      to="/contact"
                      className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center font-black transition"
                    >
                      →
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORY SECTIONS
      ====================================================== */}

      {categories.map((category) => (

        <section
          key={category.id}
          id={category.id}
          className="py-24 scroll-mt-32 border-t border-white/5"
        >

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="relative min-h-[480px] rounded-[2rem] overflow-hidden border border-white/10">

              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

              <div className="relative z-10 min-h-[480px] max-w-2xl flex flex-col justify-center p-8 md:p-14">

                <div className="text-5xl mb-6">
                  {category.icon}
                </div>

                <p className="text-blue-400 text-xs font-black tracking-[0.3em]">
                  {category.subtitle}
                </p>

                <h2 className="text-4xl md:text-6xl font-black mt-4">
                  {category.title}
                </h2>

                <p className="text-slate-300 leading-7 mt-6 max-w-xl">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-8">

                  <a
                    href="#all-laptops"
                    className="px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-black transition"
                  >
                    View Laptops →
                  </a>

                  <Link
                    to="/contact"
                    className="px-6 py-4 rounded-xl border border-white/10 hover:border-blue-500 font-bold transition"
                  >
                    Ask An Expert
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </section>

      ))}

      {/* =====================================================
          BUYING GUIDE
      ====================================================== */}

      <section className="py-24 bg-slate-900/40">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <p className="text-blue-500 text-xs font-black tracking-[0.3em] uppercase">
              Need Help?
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-4">
              Not Sure Which Laptop To Choose?
            </h2>

            <p className="text-slate-500 mt-5 leading-7">
              Tell us what you need your laptop for and our team can help
              you find the right option.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="p-8 rounded-3xl bg-slate-950 border border-white/10">
              <div className="text-4xl">🎮</div>

              <h3 className="text-2xl font-black mt-6">
                Gaming
              </h3>

              <p className="text-slate-500 mt-3 leading-6">
                Choose powerful processors, dedicated GPUs and high refresh
                rate displays.
              </p>

              <a
                href="#gaming"
                className="inline-block text-blue-400 font-bold mt-6"
              >
                View Gaming →
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-slate-950 border border-white/10">
              <div className="text-4xl">💼</div>

              <h3 className="text-2xl font-black mt-6">
                Business
              </h3>

              <p className="text-slate-500 mt-3 leading-6">
                Reliable machines for meetings, office work and professional
                productivity.
              </p>

              <a
                href="#business"
                className="inline-block text-blue-400 font-bold mt-6"
              >
                View Business →
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-slate-950 border border-white/10">
              <div className="text-4xl">🎓</div>

              <h3 className="text-2xl font-black mt-6">
                Student
              </h3>

              <p className="text-slate-500 mt-3 leading-6">
                Affordable and lightweight laptops for classes, assignments
                and everyday use.
              </p>

              <a
                href="#student"
                className="inline-block text-blue-400 font-bold mt-6"
              >
                View Student →
              </a>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 p-8 md:p-14">

            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">

              <div>

                <p className="text-blue-100 text-xs font-black tracking-[0.3em] uppercase">
                  Expert Assistance
                </p>

                <h2 className="text-4xl md:text-5xl font-black mt-3">
                  STILL NEED HELP?
                </h2>

                <p className="text-blue-100 mt-4 max-w-xl leading-7">
                  Our team can help you choose a laptop based on your
                  budget, work, gaming or study requirements.
                </p>

              </div>

              <Link
                to="/contact"
                className="shrink-0 px-8 py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-black transition"
              >
                Talk To Us →
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Service;