## Goal

Mobile Craft section must **truly pin in the center of the viewport** — exactly as in the attached screenshot (rotate-phone hint centered, `SCROLL · SEQUENCE · 000%` at the bottom edge). The screen stays locked until all four clips have revealed and the playhead reaches 100%, then releases.

The mechanism is the standard `position: sticky` scroll-jacking pattern (same idea as the Reveal/Stoodiora cards example the user pasted): a tall outer wrap + a `100vh` sticky child + scroll-driven progress 0→1.

## File: `src/components/cinema/Services.tsx`

### 1. Section title moves OUT of the sticky pane on mobile

Right now the title "Four tracks, one cut." + `XXX%` readout is rendered **inside** the sticky child, so it stays glued to the top of the viewport during the entire pin. The screenshot shows no such title — the user wants the pinned content centered, no header bar.

Change: render the mobile title as a normal (non-sticky) block **above** the sticky wrap, alongside the existing `<Marks>` index strip. It scrolls past naturally, then the sticky pane engages with a clean centered stage.

### 2. Sticky wrap — confirm clean pin

Keep the proven shape:

```tsx
<div ref={wrapRef} className="md:hidden relative" style={{ height: "520vh" }}>
  <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-paper">
    {/* stage flex-1 */}
    {/* bottom readout */}
  </div>
</div>
```

- `bg-paper` on the sticky child so the page content behind never bleeds through during the pin.
- No title row inside. Stage takes `flex-1`. Bottom readout sits in a fixed-height row (`pt-3 pb-5`).
- Audit ancestors: `<section>` is `md:overflow-hidden` (mobile is fine), `container-x` and the `max-w-[1600px]` wrapper have no `overflow-hidden` on mobile. Sticky will work.

### 3. Stage layout matches the screenshot

Inside the stage (`flex-1 relative`):
- **Phase 1 (0 → 0.16)** — rotate-phone hint centered (`flex items-center justify-center`), exactly as shown.
- **Phase 1 fade-out (0.16 → 0.24)** — hint fades.
- **Phase 2 (0.18 → 0.30)** — rotated sequence frame fades in, centered at `top: 50%`, width `58vh`, height `min(80vw, 400px)`.
- **Phase 3 (0.28 → 0.96)** — playhead sweeps left→right, clips reveal at `0.34 / 0.50 / 0.66 / 0.82`.

### 4. Bottom readout (`SCROLL · SEQUENCE · NNN%`)

Stays pinned at the bottom of the sticky pane. Border-top hairline, centered, tabular-nums. Updates live with progress.

### 5. Progress measurement — keep current scroll-driven JS

The existing `useEffect` that reads `wrapRef.current.getBoundingClientRect()` is the correct approach (mirrors the Reveal/Stoodiora pattern). No change needed — it already drives `progress` 0→1 across the 520vh range.

### Out of scope

- Loader is unchanged.
- Desktop timeline is unchanged.
- No new dependencies; no framer-motion swap — pure CSS sticky + scroll listener already in place.
