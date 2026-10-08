import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    {
      number: "100+",
      title: "Laptops",
      text: "Different models for different needs.",
    },
    {
      number: "20+",
      title: "Brands",
      text: "A wide range of trusted technology brands.",
    },
    {
      number: "24/7",
      title: "Support",
      text: "Help whenever you need assistance.",
    },
    {
      number: "100%",
      title: "Focus",
      text: "Focused on making laptop shopping easier.",
    },
  ];

  const values = [
    {
      number: "01",
      title: "Performance",
      text: "We focus on laptops that offer the right balance of speed, reliability and everyday performance.",
    },
    {
      number: "02",
      title: "Choice",
      text: "From student laptops to powerful gaming machines, our collection is built around different requirements.",
    },
    {
      number: "03",
      title: "Technology",
      text: "We keep our collection focused on modern hardware and useful features.",
    },
    {
      number: "04",
      title: "Support",
      text: "Our goal is to make choosing and understanding your next laptop easier.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[650px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=2200&q=90"
          alt="Laptop workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-8">

          <div className="max-w-3xl">

            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-14 bg-blue-500" />

              <p className="text-xs font-black uppercase tracking-[5px] text-blue-400">
                About LaptopHub
              </p>

            </div>

            <h1 className="text-7xl font-black uppercase leading-[0.88] tracking-tight lg:text-9xl">

              TECHNOLOGY

              <br />

              FOR YOUR

              <br />

              <span className="text-blue-500">
                NEXT MOVE.
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
              LaptopHub is a modern laptop store created to make
              finding the right computer simple, clear and enjoyable.
            </p>

            <div className="mt-9 flex gap-4">

              <Link
                to="/service"
                className="rounded-xl bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest transition hover:bg-blue-500"
              >
                Explore Laptops →
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-widest transition hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="border-b border-white/10 px-8 py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-16">

          <div className="col-span-12 lg:col-span-5">

            <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
              Who We Are
            </p>

            <h2 className="mt-5 text-5xl font-black uppercase leading-none lg:text-7xl">
              BUILT FOR
              <br />
              MODERN
              <br />
              USERS.
            </h2>

          </div>


          <div className="col-span-12 lg:col-span-6 lg:col-start-7">

            <p className="text-2xl font-semibold leading-relaxed text-gray-200 lg:text-4xl">
              Your laptop should work around your life,
              not the other way around.
            </p>

            <p className="mt-8 text-base leading-8 text-gray-500">
              LaptopHub brings laptops together for students,
              professionals, creators, gamers and everyday users.
              Instead of making technology complicated, we aim
              to present useful information in a straightforward
              way.
            </p>

            <p className="mt-6 text-base leading-8 text-gray-500">
              Whether you need a machine for university, office
              work, programming, creative projects or gaming,
              our collection is organized around real-world needs.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="bg-slate-900 px-8 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14">

            <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
              LaptopHub
            </p>

            <h2 className="mt-4 text-5xl font-black">
              OUR NUMBERS
            </h2>

          </div>


          <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">

            {stats.map((stat) => (

              <div
                key={stat.title}
                className="bg-slate-900 p-8 transition hover:bg-slate-800"
              >

                <p className="text-5xl font-black text-blue-500">
                  {stat.number}
                </p>

                <h3 className="mt-7 text-lg font-black uppercase">
                  {stat.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {stat.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <section className="px-8 py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-20">

          <div className="relative">

            <div className="absolute -inset-8 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10">

              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=90"
                alt="Modern laptop"
                className="h-[600px] w-full object-cover"
              />

            </div>

          </div>


          <div>

            <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
              Our Mission
            </p>

            <h2 className="mt-5 text-6xl font-black uppercase leading-none">
              MAKE
              <br />
              TECH
              <br />
              SIMPLE.
            </h2>

            <p className="mt-8 text-base leading-8 text-gray-400">
              Buying a laptop can involve dozens of specifications,
              processors, storage options, graphics cards and display
              technologies.
            </p>

            <p className="mt-5 text-base leading-8 text-gray-500">
              Our mission is to organize that information so you can
              understand what you are looking at and find a machine
              that fits your requirements.
            </p>

            <Link
              to="/service"
              className="mt-9 inline-block rounded-xl bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-blue-500"
            >
              Browse Our Collection →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="border-y border-white/10 bg-slate-900 px-8 py-28">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
              What Matters
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase lg:text-7xl">
              OUR
              <br />
              VALUES.
            </h2>

          </div>


          <div className="mt-14 grid grid-cols-2 gap-5">

            {values.map((value) => (

              <div
                key={value.number}
                className="group rounded-2xl border border-white/10 bg-black p-10 transition duration-300 hover:border-blue-500"
              >

                <div className="flex items-center justify-between">

                  <span className="text-5xl font-black text-blue-600">
                    {value.number}
                  </span>

                  <span className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    LaptopHub
                  </span>

                </div>

                <h3 className="mt-10 text-2xl font-black uppercase">
                  {value.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-8 text-gray-500">
                  {value.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHO WE SERVE
      ===================================================== */}

      <section className="px-8 py-28">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
              Made For Everyone
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase lg:text-7xl">
              ONE STORE.
              <br />
              <span className="text-blue-500">
                MANY NEEDS.
              </span>
            </h2>

          </div>


          <div className="mt-16 grid grid-cols-4 gap-5">

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

              <div className="text-4xl">
                🎮
              </div>

              <h3 className="mt-7 text-xl font-black uppercase">
                Gamers
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Powerful hardware, dedicated graphics and
                high-refresh displays.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

              <div className="text-4xl">
                🎓
              </div>

              <h3 className="mt-7 text-xl font-black uppercase">
                Students
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Practical machines for classes, assignments,
                research and everyday tasks.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

              <div className="text-4xl">
                💼
              </div>

              <h3 className="mt-7 text-xl font-black uppercase">
                Professionals
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Reliable laptops designed for productivity,
                communication and business work.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

              <div className="text-4xl">
                🎨
              </div>

              <h3 className="mt-7 text-xl font-black uppercase">
                Creators
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Performance-focused systems for creative
                applications and demanding workflows.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TECHNOLOGY SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-blue-600 px-8 py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-20">

          <div>

            <p className="text-xs font-black uppercase tracking-[5px] text-blue-100">
              Technology
            </p>

            <h2 className="mt-5 text-6xl font-black uppercase leading-none">
              CHOOSE
              <br />
              YOUR
              <br />
              POWER.
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-blue-100">
              Different users need different hardware.
              That's why LaptopHub covers a range of processors,
              memory configurations, storage options and graphics
              solutions.
            </p>

          </div>


          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-black p-8">

              <p className="text-4xl font-black">
                CPU
              </p>

              <p className="mt-3 text-xs uppercase tracking-widest text-gray-500">
                Processing Power
              </p>

            </div>


            <div className="rounded-2xl bg-black p-8">

              <p className="text-4xl font-black">
                GPU
              </p>

              <p className="mt-3 text-xs uppercase tracking-widest text-gray-500">
                Graphics
              </p>

            </div>


            <div className="rounded-2xl bg-black p-8">

              <p className="text-4xl font-black">
                RAM
              </p>

              <p className="mt-3 text-xs uppercase tracking-widest text-gray-500">
                Multitasking
              </p>

            </div>


            <div className="rounded-2xl bg-black p-8">

              <p className="text-4xl font-black">
                SSD
              </p>

              <p className="mt-3 text-xs uppercase tracking-widest text-gray-500">
                Fast Storage
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="px-8 py-28">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
            The Idea
          </p>

          <h2 className="mt-5 text-5xl font-black uppercase leading-tight lg:text-7xl">
            TECHNOLOGY
            <br />
            SHOULD FEEL
            <br />
            <span className="text-blue-500">
              POSSIBLE.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-500">
            We believe a good laptop should open possibilities.
            Learn, create, work, play, build and explore with
            technology that matches your goals.
          </p>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-8 pb-28">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900">

          <div className="grid grid-cols-2">

            <div className="p-14 lg:p-20">

              <p className="text-xs font-black uppercase tracking-[5px] text-blue-500">
                Start Exploring
              </p>

              <h2 className="mt-5 text-5xl font-black uppercase leading-none lg:text-7xl">
                FIND YOUR
                <br />
                NEXT
                <br />
                <span className="text-blue-500">
                  LAPTOP.
                </span>
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-7 text-gray-500">
                Explore our collection and discover laptops
                built for the way you work, study and play.
              </p>

              <div className="mt-9 flex gap-4">

                <Link
                  to="/service"
                  className="rounded-xl bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-blue-500"
                >
                  Browse Laptops
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black"
                >
                  Contact
                </Link>

              </div>

            </div>


            <div className="relative min-h-[500px]">

              <img
                src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1400&q=90"
                alt="Laptop desk"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <section className="border-t border-white/10 bg-black px-8 py-20">

        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-12">

          <div>

            <h3 className="text-xl font-black">
              LAPTOP<span className="text-blue-500">HUB</span>
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
              A modern destination for laptops and computing
              technology.
            </p>

          </div>


          <div>

            <h3 className="text-sm font-black uppercase tracking-widest">
              Explore
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/"
                className="block text-sm text-gray-500 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/service"
                className="block text-sm text-gray-500 hover:text-white"
              >
                Laptops
              </Link>

              <Link
                to="/about"
                className="block text-sm text-gray-500 hover:text-white"
              >
                About
              </Link>

            </div>

          </div>


          <div>

            <h3 className="text-sm font-black uppercase tracking-widest">
              Support
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/contact"
                className="block text-sm text-gray-500 hover:text-white"
              >
                Contact Us
              </Link>

              <Link
                to="/signin"
                className="block text-sm text-gray-500 hover:text-white"
              >
                Sign In
              </Link>

              <Link
                to="/service"
                className="block text-sm text-gray-500 hover:text-white"
              >
                View Products
              </Link>

            </div>

          </div>

        </div>


        <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-7">

          <p className="text-xs text-gray-600">
            © 2026 LaptopHub. All rights reserved.
          </p>

        </div>

      </section>

    </main>
  );
};

export default About;