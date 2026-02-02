import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  // Navigation links
  const mainLinks = ["Home", "About", "Pages", "Contact"];

  return (
    <div>
      <header className="relative z-10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <a href="/">
              <span className="text-white">🌐</span>
              Briefly
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            {mainLinks.map((item) => (
              <a key={item} href="#" className="hover:text-white transition">
                {item}
              </a>
            ))}
            <button className="rounded-full border border-white/20 px-4 py-1 pb-2 text-xs text-gray-200 hover:bg-white/10">
              <a href="/login">Log in</a>
            </button>
            <button className="rounded-full bg-white/10 px-4 py-1 pb-2 text-xs text-white shadow-[0_0_10px_rgba(76,195,255,0.7)] hover:bg-white/20">
              <a href="/register">Sign up</a>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
