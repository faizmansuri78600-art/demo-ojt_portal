import React, { useState } from "react";

const Icon = ({ children, className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const MapPinIcon = () => (
  <Icon>
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

const PhoneIcon = () => (
  <Icon>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

const GlobeIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </Icon>
);

const SendIcon = () => (
  <Icon>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Icon>
);

const ShieldIcon = () => (
  <Icon className="h-5 w-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submitted:", formData);

    alert("Your message has been submitted successfully.");

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================= CONTACT HERO ================= */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:px-10 lg:py-10">

          {/* Left */}
          <div className="w-full lg:w-1/2">

            <p className="mb-3 text-base font-bold text-blue-700">
              CONTACT US
            </p>

            <div className="mb-4 h-1 w-12 bg-blue-700"></div>

            <h1 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
              We're Here to Help!
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              Have questions or need assistance? Feel free to reach out to us.
              Our team is always ready to support you.
            </p>

          </div>

          {/* Right Illustration */}
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="flex h-52 w-full max-w-xl items-center justify-center rounded-3xl bg-blue-50/40">

              {/* Temporary visual representation if illustration isn't available */}
              <div className="relative flex items-center justify-center">

                <div className="absolute -left-20 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <MapPinIcon className="h-10 w-10" />
                </div>

                <div className="flex h-36 w-52 items-center justify-center rounded-xl border-4 border-blue-600 bg-white shadow-lg">
                  <span className="text-6xl font-bold text-blue-600">@</span>
                </div>

                <div className="absolute -right-16 top-0 flex h-24 w-24 rotate-[-25deg] items-center justify-center rounded-full bg-blue-600 text-white">
                  <PhoneIcon className="h-12 w-12" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="px-5 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[0.9fr_1.2fr]">

          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-5">

            {/* Get In Touch */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-blue-950">
                Get in Touch
              </h2>

              <div className="mt-2 h-1 w-12 bg-blue-700"></div>

              <p className="mt-4 text-sm text-slate-600">
                You can contact us through any of the following channels.
              </p>

              {/* Address */}
              <div className="mt-5 flex gap-4 border-b border-slate-200 pb-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <MapPinIcon />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Address
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-700">
                    Abeda Inamdar Senior College
                    <br />
                    2390 KB Hidayatullah Road, Pune – 411001,
                    Maharashtra, India
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex gap-4 border-b border-slate-200 py-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                  <PhoneIcon />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-700">
                    +91 20 2644 6312
                    <br />
                    +91 90996 72163
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex gap-4 border-b border-slate-200 py-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
                  <MailIcon />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Email
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-700">
                    ojt@abedainamdarcollege.ac.in
                    <br />
                    support@aisc.ojtportal.in
                  </p>
                </div>

              </div>

              {/* Website */}
              <div className="flex gap-4 pt-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
                  <GlobeIcon />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Website
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-700">
                    www.abedainamdarcollege.ac.in
                    <br />
                    www.aisc.ojtportal.in
                  </p>
                </div>

              </div>

            </div>

            {/* Social Media */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-blue-950">
                Connect With Us
              </h2>

              <div className="mt-2 h-1 w-12 bg-blue-700"></div>

              <p className="mt-4 text-sm text-slate-600">
                Follow us on social media for latest updates and
                notifications.
              </p>

              <div className="mt-5 flex gap-4">

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white transition hover:-translate-y-1"
                >
                  f
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-lg font-bold text-white transition hover:-translate-y-1"
                >
                  ◎
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white transition hover:-translate-y-1"
                >
                  in
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white transition hover:-translate-y-1"
                >
                  ▶
                </a>

              </div>

            </div>

          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-7">

            <h2 className="text-xl font-bold text-blue-950">
              Send Us a Message
            </h2>

            <div className="mt-2 h-1 w-12 bg-blue-700"></div>

            <p className="mt-4 text-sm text-slate-600">
              Fill out the form below and we will get back to you as soon as
              possible.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              {/* Name + Email */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* Subject */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Subject <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Message */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Type your message here..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 active:scale-[0.99]"
              >
                <SendIcon className="h-5 w-5" />
                Send Message
              </button>

              {/* Privacy */}
              <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs text-slate-500">
                <ShieldIcon />
                <span>
                  Your information is safe with us. We respect your privacy.
                </span>
              </div>

            </form>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;