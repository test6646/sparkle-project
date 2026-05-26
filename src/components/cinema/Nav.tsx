import { useEffect, useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const links = [
  { id: "about", label: "About" },
  { id: "reel", label: "Reel" },
  { id: "work", label: "Work" },
  { id: "disciplines", label: "Craft" },
  { id: "kit", label: "Kit" },
  { id: "process", label: "Process" },
];



export function Nav() {
  const active = useScrollSpy(links.map((l) => l.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop floating pill */}
      <nav
        aria-label="Primary"
        className={`fixed left-1/2 -translate-x-1/2 z-[70] hidden md:block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div className="nav-glass flex items-center gap-1 md:gap-1.5 pl-4 pr-2 py-2.5 rounded-full">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="display text-paper text-[18px] leading-none px-2 py-1 hover:text-gold transition-colors"
            aria-label="Top"
            style={{ letterSpacing: "0.04em" }}
          >
            CK<span className="text-gold/60 mx-0.5">/</span><span className="italic editorial">DOP</span>
          </button>

          <span className="w-px h-4 bg-paper/25 mx-1" />

          <ul className="flex items-center gap-0.5">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`cap px-3 py-2 rounded-full transition-colors ${
                    active === l.id ? "bg-paper text-ink" : "text-paper/70 hover:text-gold"
                  }`}
                  style={{ fontSize: 11.5, letterSpacing: "0.22em" }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <span className="hidden xl:block w-px h-4 bg-paper/25 mx-1" />

          <button
            onClick={() => go("contact")}
            className="cap px-4 py-2.5 rounded-full ml-1 text-ink bg-paper hover:bg-gold hover:text-ink transition-colors"
            style={{ fontSize: 11.5, letterSpacing: "0.22em" }}
          >
            Contact ↗
          </button>
        </div>
      </nav>

      {/* Mobile top bar — attached, full width */}
      <nav
        aria-label="Primary"
        className="fixed top-0 inset-x-0 z-[70] md:hidden"
        style={{
          background: "var(--color-ink)",
          backdropFilter: "blur(14px) saturate(1.2)",
          WebkitBackdropFilter: "blur(14px) saturate(1.2)",
          borderBottom: "1px solid color-mix(in oklab, var(--color-gold) 18%, transparent)",
        }}
      >
        <div className="flex items-center justify-between px-5 h-14">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="display text-paper text-[15px] leading-none"
            style={{ letterSpacing: "0.04em" }}
            aria-label="Top"
          >
            CK<span className="text-gold/60 mx-0.5">/</span><span className="italic editorial">DOP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="cap" style={{ fontSize: 10, color: "var(--color-gold)" }}>DOP</span>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative w-9 h-9"
          >
            <span
              className="absolute left-1/2 top-1/2 block w-5 h-[1.5px] bg-paper rounded-full"
              style={{
                transform: open
                  ? "translate(-50%, -50%) rotate(45deg)"
                  : "translate(-50%, calc(-50% - 4px)) rotate(0deg)",
                transition: "transform 600ms cubic-bezier(0.76,0,0.24,1)",
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 block w-5 h-[1.5px] bg-paper rounded-full"
              style={{
                transform: open
                  ? "translate(-50%, -50%) rotate(-45deg)"
                  : "translate(-50%, calc(-50% + 4px)) rotate(0deg)",
                transition: "transform 600ms cubic-bezier(0.76,0,0.24,1)",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile curtain */}
      <div className="fixed inset-0 z-[65] md:hidden pointer-events-none" aria-hidden={!open}>
        <div
          className="absolute inset-0 origin-top"
          style={{
            transform: open ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 850ms cubic-bezier(0.76,0,0.24,1)",
            background: "var(--color-ink)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='520' height='520'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.85  0 0 0 0 0.80  0 0 0 0 0.72  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 800" preserveAspectRatio="none" aria-hidden>
            <g stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.14" fill="none">
              <line x1="153" y1="0" x2="153" y2="800" />
              <line x1="247" y1="0" x2="247" y2="800" />
              <line x1="0" y1="306" x2="400" y2="306" />
              <line x1="0" y1="494" x2="400" y2="494" />
            </g>
          </svg>

          <div className="relative h-full w-full px-6 pt-20 pb-10 flex flex-col">
            <p className="cap" style={{ color: "var(--color-gold)", opacity: open ? 1 : 0, transition: "opacity 500ms 400ms" }}>
              MENU · 0{links.length + 1} SECTIONS
            </p>

            <ul className="mt-8 flex-1 flex flex-col gap-0.5">
              {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
                <li
                  key={l.id}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${450 + i * 60}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${450 + i * 60}ms`,
                  }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="display block w-full text-left text-paper hover:text-gold transition-colors"
                    style={{
                      fontSize: "clamp(2rem, 9vw, 3.4rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    <span className="cap mr-3 align-middle" style={{ fontSize: 10, color: "var(--color-gold)" }}>0{i + 1}</span>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 pt-6 border-t border-paper/15 flex items-center justify-between cap"
              style={{ color: "var(--color-paper)", opacity: open ? 1 : 0, transition: "opacity 500ms 900ms" }}
            >
              <span>CK · DOP</span>
              <span style={{ color: "var(--color-gold)" }}>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
