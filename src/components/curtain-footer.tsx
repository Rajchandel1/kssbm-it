import { ArrowUpRight } from "lucide-react";

/* -----------------------------------------------
   CURTAIN FOOTER
   Fixed to bottom — revealed as content scrolls
   away above it. Curtain effect: the previous
   section lifts like a curtain to show the footer.
   ----------------------------------------------- */
export const CurtainFooter = () => {
  return (
    <div
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full">
        <div className="bg-[#0a0a0a] text-[#a1a1aa] h-full flex flex-col justify-between p-8 md:p-16 lg:p-24">

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />

          {/* Top section */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="flex flex-col items-start">
              <img src="/ks-logo.png" alt="KS School" className="h-8 w-auto mb-6 opacity-70" />
              <h2 className="text-[10vw] leading-[0.8] font-thin tracking-tighter text-zinc-700">
                KS<br />
                <span className="font-bold italic text-white">SCHOOL.</span>
              </h2>
            </div>
            <div className="hidden md:block text-right space-y-2">
              <p className="text-sm text-zinc-500">KS School of Business Management</p>
              <p className="text-sm text-zinc-500">& Information Technology</p>
              <p className="text-sm text-zinc-600 mt-3">Gujarat, India</p>
            </div>
          </div>

          {/* Middle: Quick links grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Programs</p>
              <div className="space-y-3">
                {["M.Sc. (CA & IT)", "Integrated MBA", "Ph.D Programs"].map((l, i) => (
                  <p key={i} className="text-base text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer">{l}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Campus</p>
              <div className="space-y-3">
                {["Infrastructure", "Library", "Auditorium", "Labs"].map((l, i) => (
                  <p key={i} className="text-base text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer">{l}</p>
                ))}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Connect</p>
              <div className="space-y-3">
                {["Admissions", "Contact Us", "Placements", "Alumni"].map((l, i) => (
                  <p key={i} className="text-base text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer">{l}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Social links + copyright */}
          <div className="relative z-10 border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="group flex items-center justify-between text-xl hover:text-white transition-colors duration-300"
                  >
                    {s}
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </a>
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 flex-shrink-0">
                &copy; 2025 KS SBMIT. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
