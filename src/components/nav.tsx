"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

/* -----------------------------------------------
   NAVIGATION
   ----------------------------------------------- */
const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Programs", href: "#programs" },
  { label: "Campus", href: "#campus" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <img src="/ks-logo.png" alt="KS School" className="h-10 w-auto" />
            <div className="hidden flex-col md:flex">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                KS School of
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-900">
                Business &amp; IT
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-zinc-900 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-zinc-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#admissions"
              className="rounded-sm bg-zinc-900 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-zinc-700"
            >
              Apply Now
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-900 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

/* -----------------------------------------------
   MOBILE MENU
   ----------------------------------------------- */
const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white/95 backdrop-blur-lg md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-lg font-medium uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-zinc-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#admissions"
          onClick={onClose}
          className="mt-4 rounded-sm bg-zinc-900 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: NAV_LINKS.length * 0.07 }}
        >
          Apply Now
        </motion.a>
      </motion.div>
    )}
  </AnimatePresence>
);
