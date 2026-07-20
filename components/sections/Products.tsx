"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, CheckCircle2, QrCode, HeartPulse, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useShouldReduceMotion } from "@/lib/hooks";

const PRODUCTS = [
  {
    id: "qlessq",
    title: "QlessQ",
    subtitle: "Queue Management System",
    icon: QrCode,
    description:
      "A complete multi-tenant queue management platform for walk-ins, appointments, lobby displays, and kiosk interfaces. Keep your customers moving seamlessly.",
    features: [
      "QR Code Walk-in Check-in",
      "Lobby Displays & Kiosks",
      "Real-time Agent Operations Panel",
      "Configurable Wait Guidance",
      "SMS & Email Notifications"
    ],
    live_url: "https://qlessq.sysplat.com",
    bg: "from-blue-600 to-indigo-800",
    shadow: "shadow-blue-600/30",
    mockup: (
      <div className="w-full max-w-sm bg-white rounded-3xl border border-navy-100 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-blue-600 text-white font-black h-8 w-8 rounded-lg flex items-center justify-center text-xs">
            Q
          </div>
          <span className="text-[10px] font-black text-navy-400 uppercase tracking-widest">
            Live Ticket
          </span>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-navy-400 uppercase">Your Number</p>
            <p className="text-4xl font-black text-navy-900 leading-none">A-124</p>
          </div>
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-navy-800">Estimated Wait</span>
              <span className="font-black text-blue-600">~12 min</span>
            </div>
            <div className="w-full bg-blue-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-2/3 rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-navy-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Updates automatically as the queue moves
          </p>
        </div>
      </div>
    )
  },
  {
    id: "lms",
    title: "Patron Loyalty",
    subtitle: "Loyalty Management System",
    icon: HeartPulse,
    description:
      "A powerful points and rewards platform designed to increase customer retention. Features tiered memberships, gamification, and rich behavior analytics.",
    features: [
      "Point Accumulation & Exchange",
      "Tiered Memberships & VIP Levels",
      "Gamified Quests & Challenges",
      "Rich Customer Behavior Analytics",
      "Seamless E-Commerce Integrations"
    ],
    live_url: "https://lms.sysplat.com",
    bg: "from-rose-500 to-crimson-700",
    shadow: "shadow-crimson-600/30",
    mockup: (
      <div className="w-full max-w-sm bg-white rounded-3xl border border-navy-100 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-crimson-600 text-white font-black h-8 w-8 rounded-lg flex items-center justify-center text-xs">
            L
          </div>
          <span className="text-[10px] font-black text-navy-400 uppercase tracking-widest">
            Loyalty Hub
          </span>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-navy-400 uppercase">Tier Level</p>
            <p className="text-4xl font-black text-crimson-600 leading-none">Gold Member</p>
          </div>
          <div className="bg-crimson-50/50 rounded-2xl p-4 border border-crimson-100/50 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-navy-800">Points Balance</span>
              <span className="font-black text-crimson-600">4,250 pts</span>
            </div>
            <div className="w-full bg-crimson-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-crimson-600 h-full w-4/5 rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-navy-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-crimson-500 animate-pulse" />
            Redeem points for active rewards
          </p>
        </div>
      </div>
    )
  }
];

export default function Products() {
  const reduce = useShouldReduceMotion();
  const [activeTab, setActiveTab] = useState("qlessq");
  const current = PRODUCTS.find((p) => p.id === activeTab)!;

  return (
    <section id="products" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading title="Our Core Products" highlight="Products" subtitle="Explore" />

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 mt-8 mb-12">
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            const isActive = activeTab === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveTab(prod.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-navy-900 text-white border-navy-900 shadow-md"
                    : "border-navy-200 text-navy-600 hover:text-navy-900 hover:border-navy-300 bg-white"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {prod.title}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[400px]">
          {/* Left Column: Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-text"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
              className="flex flex-col items-start"
            >
              <h3 className="text-3xl font-extrabold text-navy-900 mb-2 leading-none">
                {current.title}
              </h3>
              <p className="text-crimson-600 font-bold uppercase tracking-widest text-xs mb-4">
                {current.subtitle}
              </p>
              <p className="text-navy-600 text-lg leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="space-y-3 mb-8">
                {current.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-crimson-600" />
                    <span className="text-navy-800 font-medium text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <a
                href={current.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-navy-900 text-white hover:bg-navy-800 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Launch Platform
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Right Column: Dynamic Mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-mockup"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
              className="flex justify-center md:justify-end"
            >
              {current.mockup}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
