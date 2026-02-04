import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes for auth check

  // Track if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Navigation links (label + route)
  const mainLinks = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Contact", to: "/contact" },
  ];

  // Check auth status whenever route changes
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        // If this succeeds, the user is logged in
        await api.get("/api/user/profile");
        if (isMounted) setIsAuthenticated(true);
      } catch {
        // If it fails, user is not logged in
        if (isMounted) setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      // Clear any token you may have stored locally
      localStorage.removeItem("token");

      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <div>
      <header className="relative z-10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Link to="/">
              <span className="text-white">🌐</span>
              Briefly
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            {mainLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Show either Login/Signup OR Logout based on auth */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/20 px-4 py-1 pb-2 text-xs text-gray-200 hover:bg-white/10"
              >
                Log out
              </button>
            ) : (
              <>
                <button className="rounded-full border border-white/20 px-4 py-1 pb-2 text-xs text-gray-200 hover:bg-white/10">
                  <a href="/login">Log in</a>
                </button>
                <button className="rounded-full bg-white/10 px-4 py-1 pb-2 text-xs text-white shadow-[0_0_10px_rgba(76,195,255,0.7)] hover:bg-white/20">
                  <a href="/register">Sign up</a>
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
