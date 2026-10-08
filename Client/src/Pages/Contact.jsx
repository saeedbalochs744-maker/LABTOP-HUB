import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (status) {
      setStatus("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Please select a subject.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      newErrors.message =
        "Message must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulated request
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    }, 1500);
  };

  const supportCards = [
    {
      icon: "▣",
      title: "Laptop Advice",
      text: "Not sure which laptop is right for gaming, study, work or business?",
    },
    {
      icon: "↗",
      title: "Order Support",
      text: "Need help with your order, delivery, payment or product status?",
    },
    {
      icon: "⚙",
      title: "Technical Help",
      text: "Our support team can help with laptop and technology questions.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10">

        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Content */}

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10 lg:py-32">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3">

              <span className="h-px w-12 bg-blue-500" />

              <p className="text-xs font-bold uppercase tracking-[0.45em] text-blue-400">
                LaptopHub / Contact
              </p>

            </div>

            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">

              Let's

              <br />

              <span className="text-blue-500">
                Talk.
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">

              Have a question about a laptop, order, delivery,
              warranty or technical support? Send us a message
              and our team will help you find the right solution.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Send Message
              </button>

              <Link
                to="/"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-black uppercase tracking-wider transition hover:border-blue-500 hover:text-blue-400"
              >
                Explore Laptops
              </Link>

            </div>

          </div>

          {/* Hero Stats */}

          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">

            <div className="border-l border-blue-500/50 pl-4">
              <p className="text-2xl font-black">24/7</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Support
              </p>
            </div>

            <div className="border-l border-blue-500/50 pl-4">
              <p className="text-2xl font-black">100+</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Laptops
              </p>
            </div>

            <div className="border-l border-blue-500/50 pl-4">
              <p className="text-2xl font-black">20+</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Brands
              </p>
            </div>

            <div className="border-l border-blue-500/50 pl-4">
              <p className="text-2xl font-black">100%</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Focus
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="bg-slate-950 px-6 py-20 lg:px-10">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
              Get In Touch
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-5xl">

              We're

              <br />

              <span className="text-slate-600">
                Here To Help.
              </span>

            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">

              Whether you need help choosing your next laptop,
              checking an order, understanding specifications,
              or getting technical assistance, LaptopHub is ready
              to help.

            </p>

            {/* Contact Cards */}

            <div className="mt-10 space-y-4">

              {/* EMAIL */}

              <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-slate-900 p-5 transition duration-300 hover:border-blue-500/50 hover:bg-slate-900/80">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-600/20">
                  @
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    support@laptophub.com
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Online support available
                  </p>

                </div>

              </div>

              {/* PHONE */}

              <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-slate-900 p-5 transition duration-300 hover:border-blue-500/50 hover:bg-slate-900/80">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-600/20">
                  ☎
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    +92 300 1234567
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Mon - Sat / 10 AM - 8 PM
                  </p>

                </div>

              </div>

              {/* LOCATION */}

              <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-slate-900 p-5 transition duration-300 hover:border-blue-500/50 hover:bg-slate-900/80">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-600/20">
                  ◉
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    Pakistan
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Nationwide service
                  </p>

                </div>

              </div>

            </div>

            {/* Quick Links */}

            <div className="mt-10">

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                Explore LaptopHub
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <Link
                  to="/"
                  className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-center text-xs font-bold transition hover:border-blue-500 hover:text-blue-400"
                >
                  Home →
                </Link>

                <Link
                  to="/about"
                  className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-center text-xs font-bold transition hover:border-blue-500 hover:text-blue-400"
                >
                  About →
                </Link>

                <Link
                  to="/service"
                  className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-center text-xs font-bold transition hover:border-blue-500 hover:text-blue-400"
                >
                  Services →
                </Link>

                <Link
                  to="/signin"
                  className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-center text-xs font-bold transition hover:border-blue-500 hover:text-blue-400"
                >
                  Sign In →
                </Link>

              </div>

            </div>

            {/* Social */}

            <div className="mt-10">

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                Follow LaptopHub
              </p>

              <div className="mt-4 flex gap-3">

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:border-blue-500 hover:bg-blue-600"
                >
                  IG
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:border-blue-500 hover:bg-blue-600"
                >
                  FB
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:border-blue-500 hover:bg-blue-600"
                >
                  X
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div
            id="contact-form"
            className="relative scroll-mt-24"
          >

            {/* Glow */}

            <div className="absolute -inset-5 rounded-[2rem] bg-blue-600/10 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8 lg:p-10">

              <div className="mb-8">

                <div className="flex items-center gap-3">

                  <span className="h-px w-8 bg-blue-500" />

                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                    Send Message
                  </p>

                </div>

                <h2 className="mt-4 text-3xl font-black uppercase">
                  Contact Our Team
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                  Tell us what you need help with and our team
                  will get back to you.
                </p>

              </div>

              {/* SUCCESS MESSAGE */}

              {status === "success" && (
                <div className="mb-7 flex items-start gap-4 rounded-2xl border border-green-400/30 bg-green-400/10 p-5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-400 font-black text-black">
                    ✓
                  </div>

                  <div>

                    <h3 className="font-black text-green-400">
                      Message Sent!
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Thanks for contacting LaptopHub.
                      We'll get back to you as soon as possible.
                    </p>

                  </div>

                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full rounded-xl border bg-slate-950 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-700 ${
                      errors.name
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-slate-950 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-700 ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}

                </div>

                {/* SUBJECT */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-slate-950 px-5 py-4 text-sm text-white outline-none transition ${
                      errors.subject
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                  >

                    <option value="">
                      Select a subject
                    </option>

                    <option value="Laptop Recommendation">
                      Laptop Recommendation
                    </option>

                    <option value="Product Question">
                      Product Question
                    </option>

                    <option value="Order Support">
                      Order Support
                    </option>

                    <option value="Delivery">
                      Delivery
                    </option>

                    <option value="Warranty">
                      Warranty
                    </option>

                    <option value="Technical Support">
                      Technical Support
                    </option>

                    <option value="General Question">
                      General Question
                    </option>

                  </select>

                  {errors.subject && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}

                </div>

                {/* MESSAGE */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="message"
                      className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
                    >
                      Message
                    </label>

                    <span className="text-[10px] text-slate-700">
                      {form.message.length}/500
                    </span>

                  </div>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        handleChange(e);
                      }
                    }}
                    placeholder="Tell us how we can help..."
                    rows="6"
                    className={`w-full resize-none rounded-xl border bg-slate-950 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-700 ${
                      errors.message
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                  />

                  {errors.message && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message

                      <span className="text-lg">
                        →
                      </span>
                    </>
                  )}

                </button>

                <p className="text-center text-[10px] text-slate-700">
                  Your information is kept private and secure.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUPPORT CARDS
      ===================================================== */}

      <section className="border-t border-white/10 bg-slate-950 px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
              LaptopHub Support
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
              How Can We Help?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
              From choosing your first laptop to getting help
              after your purchase, our team is here for you.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {supportCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/10 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-black transition group-hover:scale-110">
                  {card.icon}
                </div>

                <h3 className="mt-6 text-lg font-black uppercase">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {card.text}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="mt-6 text-xs font-black uppercase tracking-widest text-blue-400 transition hover:text-blue-300"
                >
                  Contact Us →
                </button>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ / FINAL CTA
      ===================================================== */}

      <section className="border-t border-white/10 bg-blue-600 px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-100">
            Need Quick Help?
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase text-white sm:text-6xl">
            Find Your Next Laptop.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100">
            Explore our laptop collection or learn more about
            LaptopHub before making your next technology upgrade.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              to="/"
              className="rounded-xl bg-white px-7 py-4 text-sm font-black uppercase tracking-wider text-blue-700 transition hover:bg-slate-100"
            >
              Explore Laptops
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-white/30 px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/10"
            >
              About LaptopHub
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;