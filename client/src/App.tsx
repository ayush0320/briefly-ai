import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Footer from "./components/Footer.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Preferences from "./pages/Preferences.tsx";

const App = () => {
  return (
    <div className="min-h-screen bg-[color:var(--color-midnight)] relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-ring absolute inset-0 blur-3xl opacity-60"></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Dashboard */}
      <Dashboard />

      {/* Footer */}
      <Footer />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
