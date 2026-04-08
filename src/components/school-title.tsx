"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ScrollFloat } from "./scroll-float";

/* -----------------------------------------------
   VIDEO INTRO + SCHOOL TITLE
   First reveal after the opening hero. The page
   auto-scrolls here on load, showing the campus
   film first and the school identity beneath it.
   ----------------------------------------------- */
export const SchoolTitle = () => {
  const videoSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start start", "end end"],
  });

  const framePadX = useTransform(scrollYProgress, [0, 0.45], ["6vw", "0vw"]);
  const framePadY = useTransform(scrollYProgress, [0, 0.45], ["14vh", "0vh"]);
  const framePadding = useMotionTemplate`${framePadY} ${framePadX}`;
  const frameRadius = useTransform(scrollYProgress, [0, 0.45], ["2rem", "0rem"]);
  const frameShadow = useTransform(
    scrollYProgress,
    [0, 0.45],
    [
      "0 40px 120px -50px rgba(0,0,0,0.45)",
      "0 0 0 0 rgba(0,0,0,0)",
    ]
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32], [0, 1, 0]);
  const hintY = useTransform(scrollYProgress, [0, 0.24], [24, 0]);

  return (
    <section id="intro-reveal" className="relative bg-white">
      <section ref={videoSectionRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          <motion.div
            className="absolute inset-0"
            style={{ padding: framePadding }}
          >
            <motion.div
              className="relative h-full w-full overflow-hidden bg-zinc-950"
              style={{
                borderRadius: frameRadius,
                boxShadow: frameShadow,
              }}
            >
              <video
                className="h-full w-full object-cover"
                src="/clg.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 md:px-10 md:py-24">
        <motion.p
          className="mb-5 text-center text-xs font-light uppercase tracking-[0.5em] text-zinc-400 md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Welcome to
        </motion.p>

        <ScrollFloat
          className="mb-2 text-center font-black uppercase tracking-[0.05em] text-zinc-900 leading-[1.2]"
          stagger={0.018}
        >
          KS School of Business
        </ScrollFloat>

        <ScrollFloat
          className="mb-2 text-center font-black uppercase tracking-[0.05em] text-zinc-800 leading-[1.2]"
          stagger={0.018}
        >
          Management &amp;
        </ScrollFloat>

        <ScrollFloat
          className="text-center font-black uppercase tracking-[0.05em] text-zinc-700 leading-[1.2]"
          stagger={0.018}
        >
          Information Technology
        </ScrollFloat>

        <motion.div
          className="mx-auto mb-5 mt-7 h-[1px] w-24 bg-zinc-300"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mx-auto max-w-md px-6 text-center text-sm font-light leading-relaxed text-zinc-400 md:text-[15px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Empowering minds through business excellence and cutting-edge
          technology education.
        </motion.p>
      </div>
    </section>
  );
};
