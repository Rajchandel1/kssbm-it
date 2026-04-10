"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------------------------
   HODs - LEADERSHIP SECTION
   Desktop: Screen pins, Dean photo scrolls
   up from below to center, then two HODs
   emerge from behind it (left and right).
   Mobile: Simple stacked cards that
   stagger in. No pin, no complex animation.
   ----------------------------------------------- */
export const HODs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // On mobile, use simple fade-in instead of pin/scroll animation
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set('.hod-card-item', { y: 40, opacity: 0 });
        gsap.to('.hod-card-item', {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
        return;
      }

      // Desktop: scroll-driven pinned animation
      gsap.set('.hod-main', { y: '55vh', opacity: 0 });
      gsap.set('.hod-side-left', { opacity: 0, scale: 0.9 });
      gsap.set('.hod-side-right', { opacity: 0, scale: 0.9 });
      gsap.set('.hod-card-info', { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Phase 1: Dean rises from below
      tl.to('.hod-main', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      });

      // Phase 2: Side HODs emerge
      tl.to(
        '.hod-side-left',
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '+=0.1'
      );
      tl.to(
        '.hod-side-right',
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '<'
      );

      // Phase 3: Info cards appear
      tl.to(
        '.hod-card-info',
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
        '-=0.2'
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-zinc-50 via-white to-zinc-100 py-20 md:py-0"
    >
      {/* Decorative SVG Background - Purely Visual, No Functionality Impact */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute h-full w-full" preserveAspectRatio="none">
          {/* Elegant flowing lines */}
          <path
            d="M0,200 Q300,100 600,300 T1200,200"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M0,400 Q400,500 800,300 T1200,450"
            fill="none"
            stroke="url(#lineGrad2)"
            strokeWidth="0.3"
            opacity="0.2"
          />
          <path
            d="M0,600 Q500,400 900,550 T1200,600"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="0.4"
            opacity="0.15"
          />
          
          {/* Decorative circles */}
          <circle cx="15%" cy="25%" r="80" fill="none" stroke="#d4a373" strokeWidth="0.3" opacity="0.15" />
          <circle cx="85%" cy="70%" r="120" fill="none" stroke="#a78bfa" strokeWidth="0.3" opacity="0.1" />
          <circle cx="50%" cy="50%" r="200" fill="none" stroke="#e9c46a" strokeWidth="0.2" opacity="0.08" />
          
          {/* Geometric diamond patterns */}
          <path d="M100,100 L120,80 L140,100 L120,120 Z" fill="none" stroke="#d4a373" strokeWidth="0.3" opacity="0.2" />
          <path d="M1050,650 L1070,630 L1090,650 L1070,670 Z" fill="none" stroke="#d4a373" strokeWidth="0.3" opacity="0.2" />
          <path d="M550,150 L565,135 L580,150 L565,165 Z" fill="none" stroke="#a78bfa" strokeWidth="0.3" opacity="0.15" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a373" stopOpacity="0" />
              <stop offset="50%" stopColor="#d4a373" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4a373" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Soft gradient orbs */}
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-amber-200/15 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-purple-200/15 blur-3xl" />
      </div>

      {/* Subtle heading - mobile only shows on top */}
      <motion.p
        className="relative mb-10 text-center text-xs font-light uppercase tracking-[0.5em] text-zinc-500 md:hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="relative inline-block">
          The People Behind
          <span className="absolute -bottom-2 left-1/2 h-px w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </span>
      </motion.p>

      {/* Mobile: Simple vertical stack */}
      <div className="relative flex flex-col items-center gap-8 md:hidden">
        <HODCard
          name="Dr. Rajesh K. Sharma"
          role="Dean & Director"
          img="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=650&fit=crop&crop=face"
          isMain
          mobile
        />
        <HODCard
          name="Dr. Priya Mehta"
          role="Head - Dept. of Computer Applications"
          img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=650&fit=crop&crop=face"
          mobile
        />
        <HODCard
          name="Prof. Anil Verma"
          role="Head - Dept. of Management Studies"
          img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=650&fit=crop&crop=face"
          mobile
        />
      </div>

      {/* Desktop: Pinned scroll animation */}
      <div
        className="hidden md:block"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <motion.p
            className="absolute left-1/2 top-[10%] -translate-x-1/2 text-sm font-light uppercase tracking-[0.5em] text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              The People Behind
              <span className="absolute -bottom-3 left-1/2 h-px w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            </span>
          </motion.p>

          {/* Three cards - all centered via CSS, GSAP only animates Y/X */}
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Left: M.Sc IT HOD */}
            <div
              className="hod-side hod-side-left hod-card-item absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2"
              style={{ marginLeft: '-310px', zIndex: 0 }}
            >
              <HODCard
                name="Dr. Priya Mehta"
                role="Head - Dept. of Computer Applications"
                img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=650&fit=crop&crop=face"
              />
            </div>

            {/* Center: Dean & Director (bigger) */}
            <div
              className="hod-main hod-card-item absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 10 }}
            >
              <HODCard
                name="Dr. Rajesh K. Sharma"
                role="Dean & Director"
                img="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=650&fit=crop&crop=face"
                isMain
              />
            </div>

            {/* Right: MBA HOD */}
            <div
              className="hod-side hod-side-right hod-card-item absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2"
              style={{ marginLeft: '310px', zIndex: 0 }}
            >
              <HODCard
                name="Prof. Anil Verma"
                role="Head - Dept. of Management Studies"
                img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=650&fit=crop&crop=face"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -----------------------------------------------
   HOD CARD - Enhanced UI with Zero Functionality Change
   ----------------------------------------------- */
const HODCard = ({
  name,
  role,
  img,
  isMain = false,
  mobile = false,
}: {
  name: string;
  role: string;
  img: string;
  isMain?: boolean;
  mobile?: boolean;
}) => (
  <div className="hod-card-wrapper hod-card-item group text-center">
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isMain
          ? 'shadow-2xl shadow-amber-100/40 ring-1 ring-amber-200/30'
          : 'shadow-xl shadow-zinc-200/30 ring-1 ring-zinc-200/30'
      }`}
    >
      {/* Decorative border accents */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-amber-300/0 via-amber-300/0 to-amber-300/0 transition-all duration-500 group-hover:from-amber-300/20 group-hover:via-transparent group-hover:to-purple-300/20" />
      
      {/* Corner decorations */}
      <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      
      <img
        src={img}
        alt={name}
        className={`hod-card-photo w-full object-cover transition-all duration-700 group-hover:scale-105 ${
          mobile
            ? 'aspect-[3/4]'
            : isMain
              ? 'aspect-[3/4]'
              : 'aspect-[3/4]'
        }`}
        style={mobile ? { width: isMain ? '240px' : '200px' } : undefined}
        referrerPolicy="no-referrer"
      />
      
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Subtle shine effect */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </div>
    
    <div className="hod-card-info mt-5 px-3">
      <div className="relative mx-auto mb-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent transition-all duration-300 group-hover:w-12" />
        <div className="absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
      </div>
      
      <p
        className={`relative font-semibold tracking-tight text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900 ${
          isMain ? 'text-base' : 'text-sm'
        }`}
      >
        <span className="relative inline-block">
          {name}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500 group-hover:w-full" />
        </span>
      </p>
      
      <p className="mt-1 text-[9px] font-light uppercase tracking-[0.18em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500">
        {role}
      </p>
    </div>
  </div>
);