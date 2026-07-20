"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Layers, QrCode, HeartPulse, Globe, Brain, Users, CalendarCheck, Landmark } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "";

const PRODUCTS = [
  {
    label: "QlessQ",
    sub: "Queue Management & Appointment Booking",
    icon: QrCode,
    href: "https://qlessq.sysplat.com",
    external: true,
  },
  {
    label: "Patron Loyalty",
    sub: "Points, Rewards & Retention Platform",
    icon: HeartPulse,
    href: "https://lms.sysplat.com",
    external: true,
  },
];

const PLATFORMS = [
  { label: "Web Plat", sub: "Custom corporate & e-commerce websites", icon: Globe, href: "#services" },
  { label: "AI & Chatbot Plat", sub: "Predictive analytics & intelligent support", icon: Brain, href: "#services" },
  { label: "CRM Plat", sub: "Lead tracking & automated sales pipeline", icon: Users, href: "#services" },
  { label: "Appointment Plat", sub: "Seamless online booking solutions", icon: CalendarCheck, href: "#services" },
];

function NavDropdown({
  label,
  items,
  onItemClick,
}: {
  label: string;
  items: typeof PRODUCTS | typeof PLATFORMS;
  onItemClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-navy-600 hover:text-navy-900 transition-colors rounded-lg"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-4 shadow-2xl"
          >
            <div className="grid gap-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={"external" in item && item.external ? "_blank" : undefined}
                    rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      setOpen(false);
                      onItemClick();
                    }}
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-navy-50/50 transition-colors group"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-crimson-50 text-crimson-600 group-hover:bg-crimson-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900 leading-tight">{item.label}</p>
                      <p className="mt-0.5 text-xs text-navy-400 leading-snug">{item.sub}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ["home", "products", "services", "about", "projects", "testimonials", "contact"];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!CAL_LINK) return;
    (async () => {
      const cal = await getCalApi({ namespace: "booking" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-nav py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }} className="flex items-center">
          <img
            src="/logo-black.svg"
            alt="SYSPLAT"
            className="h-12 w-auto"
            style={{ maxWidth: '220px' }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className={`px-3 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ${activeSection === "home" ? "text-crimson-600 bg-crimson-50/50" : "text-navy-600 hover:text-navy-900"}`}
          >
            Home
          </a>
          <NavDropdown label="Products" items={PRODUCTS} onItemClick={() => setIsMobileOpen(false)} />
          <NavDropdown label="Platforms" items={PLATFORMS} onItemClick={() => setIsMobileOpen(false)} />
          {["About", "Projects", "Testimonials", "Contact"].map((label) => {
            const id = label.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(`#${id}`); }}
                className={`px-3 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg
                  ${isActive ? "text-crimson-600 bg-crimson-50/50" : "text-navy-600 hover:text-navy-900 hover:bg-navy-50/50"}`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          {CAL_LINK ? (
            <button
              data-cal-link={CAL_LINK}
              data-cal-namespace="booking"
              data-cal-config='{"layout":"month_view"}'
              className="px-6 py-3 text-sm font-bold text-white rounded-xl gradient-primary shadow-lg shadow-crimson-600/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Get Started
            </button>
          ) : (
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="px-6 py-3 text-sm font-bold text-white rounded-xl gradient-primary shadow-lg shadow-crimson-600/20 hover:scale-[1.02] transition-transform"
            >
              Get Started
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2 text-navy-900">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-navy-50"
          >
            <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
                className="block px-4 py-2 text-base font-bold text-navy-800 hover:text-crimson-600 rounded-xl hover:bg-navy-50"
              >
                Home
              </a>
              <div>
                <p className="px-4 text-xs font-black text-navy-400 uppercase tracking-widest mb-2">Our Products</p>
                {PRODUCTS.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-navy-700 hover:text-crimson-600 hover:bg-navy-50 rounded-xl"
                  >
                    <p.icon className="w-4 h-4 text-crimson-500" />
                    {p.label}
                  </a>
                ))}
              </div>
              <div>
                <p className="px-4 text-xs font-black text-navy-400 uppercase tracking-widest mb-2">Our Platforms</p>
                {PLATFORMS.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(p.href); }}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-navy-700 hover:text-crimson-600 hover:bg-navy-50 rounded-xl"
                  >
                    <p.icon className="w-4 h-4 text-crimson-500" />
                    {p.label}
                  </a>
                ))}
              </div>
              {["About", "Projects", "Testimonials", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(`#${label.toLowerCase()}`); }}
                  className="block px-4 py-2 text-base font-bold text-navy-800 hover:text-crimson-600 rounded-xl hover:bg-navy-50"
                >
                  {label}
                </a>
              ))}
              <div className="pt-2">
                {CAL_LINK ? (
                  <button
                    data-cal-link={CAL_LINK}
                    data-cal-namespace="booking"
                    data-cal-config='{"layout":"month_view"}'
                    className="w-full px-4 py-3 text-base font-bold text-white rounded-xl gradient-primary shadow-lg shadow-crimson-600/20 cursor-pointer"
                  >
                    Get Started
                  </button>
                ) : (
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                    className="block px-4 py-3 text-base font-bold text-white text-center rounded-xl gradient-primary shadow-lg shadow-crimson-600/20"
                  >
                    Get Started
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
