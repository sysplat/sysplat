"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Star, Users2, ShieldCheck, Cpu } from "lucide-react";
import { useShouldReduceMotion } from "@/lib/hooks";

const DEFAULT_TYPED_WORDS = [
  "Scalable Platforms",
  "AI-Powered Solutions",
  "Digital Growth Engines",
  "Smart Automation",
  "Unified Ecosystems"
];

const DEFAULT_HEADLINE = "Empowering Businesses";
const DEFAULT_SUBTITLE = "SYSPLAT builds scalable, modern, and AI-powered platforms that accelerate growth, automate operations, and elevate your digital presence.";

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useShouldReduceMotion();

  useEffect(() => {
    if (isPaused) return;
    const word = DEFAULT_TYPED_WORDS[currentWord];
    const speed = isDeleting ? 30 : 60;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = word.substring(0, displayText.length + 1);
        setDisplayText(next);
        if (next === word) {
          setIsPaused(true);
          setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2000);
        }
      } else {
        const next = word.substring(0, displayText.length - 1);
        setDisplayText(next);
        if (next === "") {
          setIsDeleting(false);
          setCurrentWord((p) => (p + 1) % DEFAULT_TYPED_WORDS.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord, isPaused]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-50 px-6 pt-24 pb-16">
      {/* Background Dots and Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 dot-pattern opacity-25" />
        <div className="absolute top-[20%] right-[10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-crimson-100/20 rounded-full blur-[80px] md:blur-[140px] hero-orb" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-navy-100/30 rounded-full blur-[70px] md:blur-[120px] hero-orb" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
        {/* Left Column: Copy */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card border border-white/70 shadow-sm text-navy-900"
          >
            <Sparkles className="w-4 h-4 text-crimson-600 animate-pulse" />
            <span className="text-xs font-black text-navy-700 tracking-wider uppercase">Intelligent Digital Platforms</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-navy-900 leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {DEFAULT_HEADLINE} <br />
            <span className="inline-block gradient-text-hero min-h-[1.25em]">
              {displayText}<span className="typing-cursor" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-navy-600 leading-relaxed mb-8 max-w-xl"
          >
            {DEFAULT_SUBTITLE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto"
          >
            <a href="#projects" className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white rounded-xl gradient-primary gradient-primary-hover shadow-xl shadow-crimson-600/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
              View Our Work <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-navy-900 rounded-xl bg-white border border-navy-200 shadow-sm hover:border-navy-300 hover:-translate-y-0.5 transition-all duration-300 text-center">
              Get in Touch
            </a>
          </motion.div>

          {/* Social Proof Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-navy-500/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" style={{ marginLeft: i > 0 ? "-2px" : "0" }} />
                ))}
              </div>
              <span className="text-xs font-semibold">100+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users2 className="w-4 h-4 text-crimson-500" />
              <span className="text-xs font-semibold">50+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-crimson-500" />
              <span className="text-xs font-semibold">99% Client Satisfaction</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Mockup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[2rem] border border-navy-100 p-2 shadow-2xl">
            <div className="bg-navy-900 text-white rounded-[1.5rem] overflow-hidden">
              {/* Browser window top bar */}
              <div className="bg-navy-950/60 px-5 py-3.5 flex items-center justify-between border-b border-navy-800">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black text-navy-400">
                  sysplat.com console
                </div>
              </div>

              {/* Console Body */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-navy-400 text-xs font-bold uppercase tracking-wider">Active Platforms</p>
                    <h3 className="text-2xl font-black mt-1">11 Running</h3>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-crimson-500/10 flex items-center justify-center text-crimson-400">
                    <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "qlessq.sysplat.com", desc: "Live Wait guidance active", status: "Healthy" },
                    { label: "lms.sysplat.com", desc: "Loyalty gamification server", status: "Healthy" },
                    { label: "ai.sysplat.com", desc: "Support Agent Model v2", status: "Idle" },
                  ].map((srv) => (
                    <div key={srv.label} className="bg-navy-950/50 border border-navy-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-navy-100 leading-none">{srv.label}</p>
                        <p className="text-[11px] text-navy-400 mt-1.5 leading-none">{srv.desc}</p>
                      </div>
                      <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {srv.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-navy-800 flex justify-between text-xs text-navy-400">
                  <span>Ping: 12ms</span>
                  <span>Uptime: 99.98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating live indicator */}
          <div className="absolute -bottom-4 -left-4 bg-white border border-navy-100 rounded-2xl p-4 shadow-xl flex items-center gap-3 max-w-[180px] hidden sm:flex">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crimson-600"></span>
            </span>
            <span className="text-[11px] font-black text-navy-900 leading-tight">Digital Platforms Monitored</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-navy-400 opacity-55"
      >
        <span className="text-[9px] font-black tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
