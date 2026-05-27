import { CompositionBackdrop } from "./CompositionBackdrop";

type Rule =
  | "thirds"
  | "golden"
  | "symmetry"
  | "asymmetry"
  | "leading-lines"
  | "negative-space"
  | "balance";

type Pos =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface Props {
  rule: Rule;
  fig: string;       // e.g. "FIG. 02"
  label: string;     // e.g. "GOLDEN MEAN"
  position?: Pos;
  size?: number;     // px, default 220
  className?: string;
}

/**
 * Small artistic diagram plate — a museum-style composition study,
 * positioned at a corner of a section as a quiet decorative artifact.
 * Kept subtle (low opacity, thin rule border) so it never overpowers content.
 */
export function DiagramPlate({
  rule,
  fig,
  label,
  position = "top-right",
  size = 220,
  className = "",
}: Props) {
  const pos: Record<Pos, string> = {
    "top-left":     "left-4 md:left-8 top-6 md:top-10",
    "top-right":    "right-4 md:right-8 top-6 md:top-10",
    "bottom-left":  "left-4 md:left-8 bottom-6 md:bottom-10",
    "bottom-right": "right-4 md:right-8 bottom-6 md:bottom-10",
  };
  return (
    <div
      aria-hidden
      className={`hidden md:block absolute ${pos[position]} pointer-events-none select-none ${className}`}
      style={{ width: size, opacity: 0.55 }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          border: "1px solid color-mix(in oklab, var(--color-ink) 22%, transparent)",
        }}
      >
        {/* corner ticks */}
        <Tick className="top-0 left-0" />
        <Tick className="top-0 right-0" rot={90} />
        <Tick className="bottom-0 right-0" rot={180} />
        <Tick className="bottom-0 left-0" rot={270} />

        <CompositionBackdrop rule={rule} visible />
      </div>
      <div
        className="mt-2 flex items-center justify-between"
        style={{
          fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, monospace)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "color-mix(in oklab, var(--color-ink) 65%, transparent)",
        }}
      >
        <span>{fig}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Tick({ className = "", rot = 0 }: { className?: string; rot?: number }) {
  return (
    <span
      className={`absolute ${className}`}
      style={{
        width: 10,
        height: 10,
        transform: `rotate(${rot}deg)`,
        borderTop: "1px solid color-mix(in oklab, var(--color-ink) 55%, transparent)",
        borderLeft: "1px solid color-mix(in oklab, var(--color-ink) 55%, transparent)",
      }}
    />
  );
}