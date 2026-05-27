type Rule =
  | "thirds"
  | "golden"
  | "symmetry"
  | "asymmetry"
  | "leading-lines"
  | "negative-space"
  | "balance";

interface Props {
  rule: Rule;
  visible?: boolean; // when true, render at a higher opacity so it reads as visual
  className?: string;
}

/**
 * Composition rule SVG patterns rendered as a low-opacity backdrop.
 * Default opacity ~0.05 (whisper). `visible` raises it to ~0.18.
 */
export function CompositionBackdrop({ rule, visible = false, className = "" }: Props) {
  const opacity = visible ? 0.18 : 0.09;
  return (
    <svg
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      style={{ opacity, mixBlendMode: "multiply", color: "var(--color-ink)" }}
    >
      <Pattern rule={rule} />
    </svg>
  );
}

function Pattern({ rule }: { rule: Rule }) {
  const stroke = "currentColor";
  const sw = 0.18;
  switch (rule) {
    case "thirds":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <line x1="33.33" y1="0" x2="33.33" y2="100" />
          <line x1="66.66" y1="0" x2="66.66" y2="100" />
          <line x1="0" y1="33.33" x2="100" y2="33.33" />
          <line x1="0" y1="66.66" x2="100" y2="66.66" />
        </g>
      );
    case "golden":
      // Phi rectangle subdivisions + spiral
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <rect x="0" y="0" width="100" height="61.8" />
          <rect x="0" y="0" width="61.8" height="61.8" />
          <rect x="61.8" y="0" width="38.2" height="38.2" />
          <rect x="61.8" y="38.2" width="23.6" height="23.6" />
          <path d="M61.8 0 A61.8 61.8 0 0 1 0 61.8" />
          <path d="M100 38.2 A38.2 38.2 0 0 1 61.8 0" />
          <path d="M85.4 61.8 A23.6 23.6 0 0 1 61.8 38.2" />
        </g>
      );
    case "symmetry":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="0.6 0.8" />
        </g>
      );
    case "asymmetry":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <line x1="38" y1="0" x2="38" y2="100" />
          <circle cx="38" cy="62" r="3.5" fill={stroke} />
          <circle cx="78" cy="30" r="1.2" fill={stroke} />
          <line x1="38" y1="62" x2="78" y2="30" strokeDasharray="0.6 0.8" />
        </g>
      );
    case "leading-lines":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <line x1="0" y1="100" x2="50" y2="42" />
          <line x1="100" y1="100" x2="50" y2="42" />
          <line x1="0" y1="0" x2="50" y2="42" strokeDasharray="0.6 0.8" />
          <line x1="100" y1="0" x2="50" y2="42" strokeDasharray="0.6 0.8" />
          <circle cx="50" cy="42" r="0.8" fill={stroke} />
        </g>
      );
    case "negative-space":
      return (
        <g fill={stroke}>
          <circle cx="78" cy="76" r="0.9" />
        </g>
      );
    case "balance":
      return (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          <line x1="0" y1="55" x2="100" y2="55" />
          <line x1="50" y1="55" x2="50" y2="62" />
          <circle cx="28" cy="46" r="3.2" fill={stroke} />
          <circle cx="74" cy="50" r="1.2" fill={stroke} />
        </g>
      );
  }
}

/**
 * Section wrapper that drops a CompositionBackdrop behind its children
 * while keeping its own background. Use as a thin frame around <section>.
 */
export function WithRule({
  rule,
  visible,
  children,
  className = "",
}: Props & { children: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <CompositionBackdrop rule={rule} visible={visible} />
      <div className="relative">{children}</div>
    </div>
  );
}
