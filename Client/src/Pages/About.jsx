
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const images = {
  hero: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=2200&q=90",
  mission: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=90",
  workspace: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=90",
  gaming: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=85",
};

const stats = [
  { value: 100, suffix: "+", label: "Laptop Choices", icon: "▦" },
  { value: 20, suffix: "+", label: "Technology Brands", icon: "◈" },
  { value: 24, suffix: "/7", label: "Support Focus", icon: "↗" },
  { value: 100, suffix: "%", label: "Customer Focus", icon: "✦" },
];

const values = [
  {
    number: "01",
    icon: "◈",
    title: "Performance First",
    description:
      "Discover machines selected around processing power, graphics, speed and the workloads that matter to you.",
    tag: "POWER",
  },
  {
    number: "02",
    icon: "▦",
    title: "Freedom of Choice",
    description:
      "From everyday study to demanding gaming, explore different configurations for different ambitions.",
    tag: "CHOICE",
  },
  {
    number: "03",
    icon: "✧",
    title: "Modern Technology",
    description:
      "Understand the hardware behind every machine and compare the specifications that make a difference.",
    tag: "INNOVATION",
  },
  {
    number: "04",
    icon: "↗",
    title: "Support That Matters",
    description:
      "Our goal is to make the laptop discovery process clearer, more convenient and easier to navigate.",
    tag: "SUPPORT",
  },
];

const audiences = [
  {
    number: "01",
    icon: "🎮",
    title: "Gamers",
    description:
      "Dedicated graphics, powerful processors and high-refresh display options.",
    category: "Gaming",
  },
  {
    number: "02",
    icon: "🎓",
    title: "Students",
    description:
      "Everyday computing for classes, research, assignments and learning.",
    category: "Student",
  },
  {
    number: "03",
    icon: "💼",
    title: "Professionals",
    description:
      "Productivity-focused laptops for office work, meetings and business.",
    category: "Business",
  },
  {
    number: "04",
    icon: "🎨",
    title: "Creators",
    description:
      "Explore capable systems for design, development and creative projects.",
    category: "Creator",
  },
];

const technologies = [
  {
    code: "CPU",
    title: "Processing Power",
    description: "The engine behind your everyday tasks.",
  },
  {
    code: "GPU",
    title: "Graphics Performance",
    description: "Visual computing for gaming and creative work.",
  },
  {
    code: "RAM",
    title: "Smooth Multitasking",
    description: "Memory for running your applications.",
  },
  {
    code: "SSD",
    title: "Fast Storage",
    description: "Quick access to files, applications and projects.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({ stat, index }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setCount(stat.value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [stat.value]);

  useEffect(() => {
    if (!started) return;

    let frame;
    const duration = 1000;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(eased * stat.value));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [started, stat.value]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden border-b border-r border-white/[0.08] bg-white/[0.015] p-6 transition duration-300 hover:bg-blue-500/[0.07] sm:p-8 lg:p-9"
    >
      <span className="absolute right-5 top-5 text-xl text-blue-400/50 transition group-hover:text-blue-300">
        {stat.icon}
      </span>

      <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
        {count}
        <span className="text-blue-500">{stat.suffix}</span>
      </p>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
        {stat.label}
      </p>

      <div
        className="mt-7 h-px w-10 bg-blue-500 transition-all duration-300 group-hover:w-full"
        style={{ transitionDelay: `${index * 30}ms` }}
      />
    </div>
  );
}

const About = () => {
  return (
    <main className="overflow-hidden bg-[#060912] text-white selection:bg-blue-500 selection:text-white">

      {/* HERO */}

      <section className="relative isolate min-h-[700px] overflow-hidden sm:min-h-[760px]">
        <img
          src={images.hero}
          alt="Laptop on a modern workspace"
          fetchPriority="high"
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-20 bg-[#060912]/75" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#060912] via-[#060912]/90 to-[#060912]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#060912] via-transparent to-[#060912]/40" />

        <div className="absolute right-0 top-24 -z-10 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px] sm:h-[500px] sm:w-[500px]" />

        <div className="mx-auto flex min-h-[700px] max-w-7xl items-center px-5 py-24 sm:min-h-[760px] sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-12 bg-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-400 sm:text-xs">
                  The LaptopHub Experience
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[104px]">
                TECHNOLOGY
                <br />
                FOR YOUR
                <br />
                <span className="text-blue-500">NEXT MOVE.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                Discover a better way to explore laptops. From powerful
                gaming machines to everyday productivity, LaptopHub helps
                you understand your options and find technology that
                fits your ambitions.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/laptops"
                  className="group inline-flex items-center gap-4 rounded-xl bg-blue-600 px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] transition hover:bg-blue-500 sm:px-8"
                >
                  Explore Collection
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] transition hover:border-blue-400/60 hover:bg-white/[0.08] sm:px-8"
                >
                  Talk To Us
                  <span>↗</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
                {["GAMING", "BUSINESS", "STUDENT", "CREATOR"].map((item) => (
                  <span
                    key={item}
                    className="text-[9px] font-bold tracking-[0.2em] text-slate-400 sm:text-[10px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-12 right-8 hidden items-center gap-4 xl:flex">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
            Technology for every ambition
          </span>
          <span className="h-px w-14 bg-blue-500" />
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="border-y border-white/[0.07] bg-[#080d18] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              01 / Who We Are
            </p>

            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-6xl">
              BUILT FOR
              <br />
              THE WAY
              <br />
              <span className="text-blue-500">YOU WORK.</span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={150}>
            <p className="text-2xl font-semibold leading-relaxed tracking-tight text-white sm:text-3xl lg:text-4xl">
              The right technology doesn't just keep you moving.
              It opens up what's possible.
            </p>

            <p className="mt-7 text-sm leading-8 text-slate-400">
              LaptopHub brings different laptop categories together in
              one place, helping students, gamers, professionals and
              creators explore their options without unnecessary
              complexity.
            </p>

            <p className="mt-5 text-sm leading-8 text-slate-500">
              Whether you are choosing a laptop for university, programming,
              office work or creative projects, our aim is to make
              specifications easier to understand and comparisons easier
              to navigate.
            </p>

            <Link
              to="/laptops"
              className="mt-8 inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-400 transition hover:text-white"
            >
              Discover LaptopHub <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* STATS */}

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                  02 / At A Glance
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                  THE BIG PICTURE<span className="text-blue-500">.</span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-slate-500">
                Different needs. Different machines. One place to start.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          <p className="mt-4 text-[10px] leading-5 text-slate-600">
            Figures represent LaptopHub's stated collection and service
            goals, not independently verified customer or inventory data.
          </p>
        </div>
      </section>

      {/* MISSION */}

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="group relative">
              <div className="absolute -inset-4 rounded-3xl bg-blue-600/10 opacity-70 blur-2xl transition duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={images.mission}
                  alt="Modern laptop hardware and workspace"
                  loading="lazy"
                  className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[540px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/90 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300">
                    Our Philosophy
                  </span>

                  <p className="mt-3 max-w-md text-2xl font-black uppercase leading-tight sm:text-3xl">
                    BETTER CHOICES.
                    <br />
                    <span className="text-blue-400">BETTER POSSIBILITIES.</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              03 / Our Mission
            </p>

            <h2 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
              MAKE
              <br />
              TECH
              <br />
              <span className="text-blue-500">SIMPLE.</span>
            </h2>

            <p className="mt-8 text-sm leading-8 text-slate-400">
              Processor generations, graphics cards, memory, storage
              and displays can make laptop shopping feel overwhelming.
              We want to make the journey easier to understand.
            </p>

            <p className="mt-5 text-sm leading-8 text-slate-500">
              Our focus is presenting useful product information and
              organizing choices around practical needs, so you can
              compare what matters before making a decision.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Understand the specifications",
                "Explore laptops by category",
                "Compare options for your needs",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-sm text-blue-400">
                    {index === 0 ? "✓" : index === 1 ? "↗" : "◈"}
                  </span>

                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/laptops"
              className="mt-10 inline-flex items-center gap-4 rounded-xl bg-white px-7 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-blue-500 hover:text-white"
            >
              Find Your Laptop <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}

      <section className="border-y border-white/[0.07] bg-[#080d18] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                  04 / What Drives Us
                </p>

                <h2 className="mt-5 text-5xl font-black uppercase tracking-tight sm:text-7xl">
                  OUR
                  <br />
                  <span className="text-blue-500">STANDARDS.</span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-slate-500">
                A clear approach to technology, choice and the experience
                of finding your next machine.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.number} delay={index * 90}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b111e] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 sm:p-9">
                  <span className="absolute -right-3 -top-10 text-9xl font-black text-white/[0.025] transition group-hover:text-blue-500/[0.07]">
                    {value.number}
                  </span>

                  <div className="relative flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-xl text-blue-400">
                      {value.icon}
                    </span>

                    <span className="text-[9px] font-black tracking-[0.25em] text-slate-600">
                      {value.tag}
                    </span>
                  </div>

                  <h3 className="relative mt-9 text-xl font-black uppercase tracking-tight sm:text-2xl">
                    {value.title}
                  </h3>

                  <p className="relative mt-4 max-w-md text-sm leading-7 text-slate-500">
                    {value.description}
                  </p>

                  <div className="mt-8 h-px w-12 bg-blue-500/70 transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              05 / Find Your Fit
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl">
              ONE STORE.
              <br />
              <span className="text-blue-500">MANY AMBITIONS.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-500">
              Explore laptop categories based on how you learn, work,
              create and play.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={index * 80}>
                <article className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0a101c] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/50 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl transition duration-300 group-hover:scale-110">
                      {audience.icon}
                    </span>

                    <span className="text-xs font-black text-slate-600">
                      / {audience.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-black uppercase">
                    {audience.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
                    {audience.description}
                  </p>

                  <Link
                    to="/laptops"
                    className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-black uppercase tracking-widest text-blue-400 transition hover:text-white"
                  >
                    Explore Laptops
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}

      <section className="relative overflow-hidden border-y border-blue-400/10 bg-[#091326] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              06 / Understand The Hardware
            </p>

            <h2 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
              KNOW YOUR
              <br />
              <span className="text-blue-500">POWER.</span>
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-8 text-slate-400">
              Every specification tells part of the story. Learn the
              basics of the hardware that influences performance,
              multitasking, graphics and storage.
            </p>

            <img
              src={images.workspace}
              alt="Technology workspace for programming and creative work"
              loading="lazy"
              className="mt-9 h-52 w-full rounded-2xl border border-white/10 object-cover sm:h-64"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {technologies.map((technology, index) => (
              <Reveal key={technology.code} delay={index * 90}>
                <article className="group rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:border-blue-500/50 hover:bg-blue-500/[0.06] sm:p-7">
                  <span className="text-4xl font-black tracking-tight text-blue-400 transition group-hover:text-white sm:text-5xl">
                    {technology.code}
                  </span>

                  <h3 className="mt-7 text-sm font-black uppercase tracking-wide">
                    {technology.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {technology.description}
                  </p>

                  <span className="mt-7 block text-[9px] font-bold tracking-[0.25em] text-slate-600">
                    HARDWARE / 0{index + 1}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE BANNER */}

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a101c]">
              <img
                src={images.gaming}
                alt="Laptop designed for demanding computing tasks"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#060912] via-[#060912]/90 to-[#060912]/40" />

              <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:items-center lg:p-16">
                <div className="lg:col-span-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                    The LaptopHub Difference
                  </p>

                  <h2 className="mt-5 text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl">
                    YOUR NEXT
                    <br />
                    <span className="text-blue-500">CHAPTER STARTS HERE.</span>
                  </h2>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">
                    From your first laptop to your next performance upgrade,
                    start exploring the possibilities and discover the
                    specifications that fit your goals.
                  </p>
                </div>

                <div className="lg:col-span-4 lg:text-right">
                  <Link
                    to="/laptops"
                    className="inline-flex w-full items-center justify-center gap-4 rounded-xl bg-blue-600 px-7 py-5 text-[10px] font-black uppercase tracking-[0.18em] transition hover:bg-blue-500 sm:w-auto"
                  >
                    Explore Collection
                    <span className="text-lg">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative border-t border-white/[0.07] bg-[#080d18] px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-400">
              07 / Make Your Next Move
            </p>

            <h2 className="mt-7 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              FIND YOUR
              <br />
              NEXT
              <br />
              <span className="text-blue-500">LAPTOP.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-slate-400">
              Explore the collection, compare your options and take the
              next step toward technology that works for you.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/laptops"
                className="rounded-xl bg-blue-600 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-blue-500"
              >
                Browse Laptops →
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white/15 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition hover:border-blue-400 hover:bg-white/[0.05]"
              >
                Contact LaptopHub
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default About;
