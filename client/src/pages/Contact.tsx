// import React from "react";

// Contact data in one place (easy to update later)
const contactLinks = [
  {
    label: "LinkedIn",
    value: "ayush-gautam-74a4081b2",
    url: "https://www.linkedin.com/in/ayush-gautam-74a4081b2/",
  },
  {
    label: "Instagram",
    value: "@_ayush.irl",
    url: "https://instagram.com/_ayush.irl",
  },
  {
    label: "GitHub",
    value: "ayush0320",
    url: "https://github.com/ayush0320",
  },
  {
    label: "Email",
    value: "ayushgautam0320@gmail.com",
    url: "mailto:ayushgautam0320@gmail.com",
  },
];

const Contact = () => {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">Contact</h1>
        <p className="mt-2 text-sm text-gray-300">
          Reach out or follow me on social platforms.
        </p>
      </div>

      {/* Contact cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {contactLinks.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-sm text-white backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.35)] transition hover:bg-white/10"
          >
            <div className="text-xs uppercase tracking-widest text-gray-400">
              {item.label}
            </div>
            <div className="mt-2 text-base font-semibold text-[color:var(--color-neon-blue)]">
              {item.value}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
