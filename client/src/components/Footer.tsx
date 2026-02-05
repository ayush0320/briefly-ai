// import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const mainLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Pages", to: "/pages" },
    { label: "Contact", to: "/contact" },
  ];

  const utilityLinks = [
    "Start here",
    "Styleguide",
    "404 not found",
    "Password protected",
    "Changelog",
  ];

  return (
    <div>
      <footer className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        <div className="grid gap-10 md:grid-cols-3 text-sm text-gray-300">
          <div>
            <h3 className="text-white font-semibold">Briefly AI</h3>
            <p className="mt-3 text-xs leading-relaxed">
              AI-powered news briefs with credibility signals, designed for
              modern readers.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Main pages</h4>
            <ul className="mt-3 space-y-2 text-xs">
              {mainLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Utility</h4>
            <ul className="mt-3 space-y-2 text-xs text-gray-400">
              {utilityLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
