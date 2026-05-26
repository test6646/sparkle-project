export function Footer() {
  return (
    <footer
      id="contact"
      className="relative px-6 pt-20 pb-10 overflow-hidden scroll-mt-24"
      style={{ background: "var(--maroon-deep)", color: "#f3e7d4" }}
    >
      {/* faint grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -top-px inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232,199,154,0.55), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Headline */}
        <div
          className="pb-12 border-b"
          style={{ borderColor: "rgba(243,231,212,0.15)" }}
        >
          <p className="cap" style={{ color: "rgba(243,231,212,0.55)" }}>
            CONTACT
          </p>
          <p
            className="display mt-4 max-w-3xl"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              lineHeight: 0.98,
              color: "#fbf3e1",
            }}
          >
            Let&apos;s make something{" "}
            <span className="editorial italic" style={{ color: "#e8c79a" }}>
              cinematic.
            </span>
          </p>
        </div>

        {/* Contact details grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <p className="cap" style={{ color: "rgba(243,231,212,0.45)" }}>EMAIL</p>
            <a
              href="mailto:chiragkaliya47@gmail.com"
              className="block mt-2 editorial italic text-lg md:text-xl under-grow break-all"
              style={{ color: "#fbf3e1" }}
            >
              chiragkaliya47@gmail.com
            </a>
          </div>

          <div>
            <p className="cap" style={{ color: "rgba(243,231,212,0.45)" }}>PHONE</p>
            <a
              href="tel:+919979937462"
              className="block mt-2 editorial italic text-lg md:text-xl under-grow"
              style={{ color: "#fbf3e1" }}
            >
              +91 99799 37462
            </a>
            <p className="mt-1 cap" style={{ color: "rgba(243,231,212,0.4)" }}>
              MON – SAT · 10—8
            </p>
          </div>

          <div>
            <p className="cap" style={{ color: "rgba(243,231,212,0.45)" }}>BASED IN</p>
            <p
              className="mt-2 editorial italic text-lg md:text-xl"
              style={{ color: "#fbf3e1" }}
            >
              Botad, Gujarat
            </p>
            <p className="mt-1 cap" style={{ color: "rgba(243,231,212,0.4)" }}>
              AVAILABLE WORLDWIDE
            </p>
          </div>

          <div>
            <p className="cap" style={{ color: "rgba(243,231,212,0.45)" }}>ELSEWHERE</p>
            <ul className="mt-2 flex flex-col gap-1.5 text-[15px]">
              {[
                ["Instagram", "https://instagram.com/"],
                ["Vimeo", "https://vimeo.com/"],
                ["YouTube", "https://youtube.com/"],
              ].map(([n, h]) => (
                <li key={n}>
                  <a
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="under-grow"
                    style={{ color: "#fbf3e1" }}
                  >
                    {n} <span style={{ color: "#e8c79a" }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div
          className="mt-14 pt-5 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cap"
          style={{
            borderColor: "rgba(243,231,212,0.12)",
            color: "rgba(243,231,212,0.5)",
          }}
        >
          <span>© 2026 CHIRAG KALIYA</span>
          <span style={{ color: "#e8c79a" }}>CK · CINEMATOGRAPHER</span>
        </div>
      </div>
    </footer>
  );
}
