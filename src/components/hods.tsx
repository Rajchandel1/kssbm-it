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
      className="relative bg-zinc-50 py-20 md:py-0"
    >
      {/* Subtle heading - mobile only shows on top */}
      <motion.p
        className="mb-10 text-center text-xs font-light uppercase tracking-[0.5em] text-zinc-400 md:hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        The People Behind
      </motion.p>

      {/* Mobile: Simple vertical stack */}
      <div className="flex flex-col items-center gap-8 md:hidden">
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
            className="absolute left-1/2 top-[10%] -translate-x-1/2 text-sm font-light uppercase tracking-[0.5em] text-zinc-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            The People Behind
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
   HOD CARD
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
  <div className="hod-card-wrapper hod-card-item text-center">
    <div
      className={`relative overflow-hidden rounded-2xl ${
        isMain
          ? 'shadow-xl ring-1 ring-zinc-100'
          : 'shadow-md'
      }`}
    >
      <img
        src={img}
        alt={name}
        className={`hod-card-photo w-full object-cover ${
          mobile
            ? 'aspect-[3/4]'
            : isMain
              ? 'aspect-[3/4]'
              : 'aspect-[3/4]'
        }`}
        style={mobile ? { width: isMain ? '240px' : '200px' } : undefined}
        referrerPolicy="no-referrer"
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black/8 to-transparent" />
    </div>
    <div className="hod-card-info mt-5 px-3">
      <div className="mx-auto mb-3 h-[1px] w-8 bg-zinc-300" />
      <p
        className={`font-semibold tracking-tight text-zinc-900 ${
          isMain ? 'text-base' : 'text-sm'
        }`}
      >
        {name}
      </p>
      <p className="mt-1 text-[9px] font-light uppercase tracking-[0.18em] text-zinc-400">
        {role}
      </p>
    </div>
  </div>
);
