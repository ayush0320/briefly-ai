import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Footer from "./components/Footer.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Preferences from "./pages/Preferences.tsx";
import Credibility from "./pages/Credibility.tsx";

const Home = () => (
  <>
    <Hero />
    <Dashboard />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[color:var(--color-midnight)] relative overflow-hidden">
        <div className="glow-ring absolute inset-0 blur-3xl opacity-60"></div>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/credibility" element={<Credibility />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
