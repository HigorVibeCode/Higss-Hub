/**
 * A dashboard that is first sketched in pencil lines (s1), then gets structure (s2), then comes alive (s3).
 * Every stroke uses pathLength=1, so "drawn" is just strokeDashoffset = 1 - progress.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** Progress of one element that starts at `from` and takes `span` of its stage. */
const part = (stage: number, from: number, span = 0.35) => clamp((stage - from) / span);

// Layout grid (viewBox units). Every gap is GAP, so the margins read even at any size.
const WIN = { x: 40, y: 40, w: 560, h: 360, r: 14, bar: 32 };
const SIDE_W = 110;
const GAP = 16;
const LEFT = WIN.x + SIDE_W + GAP; // 166
const RIGHT = WIN.x + WIN.w - GAP; // 584
const TOP = WIN.y + WIN.bar + GAP; // 88
const BOTTOM = WIN.y + WIN.h - GAP; // 384
const COL = (RIGHT - LEFT - 2 * GAP) / 3;
const colX = (i: number) => LEFT + i * (COL + GAP);
const KPI_H = 64;
const ROW2 = TOP + KPI_H + GAP; // 168
const CHART = { x: LEFT, y: ROW2, w: 2 * COL + GAP, h: BOTTOM - ROW2 };
const PANEL = { x: colX(2), y: ROW2, w: COL, h: BOTTOM - ROW2 };

const BARS = [62, 94, 72, 122, 104, 142, 168];
const BAR_W = 18;
const BAR_PAD = 20;
const BAR_BASE = CHART.y + CHART.h - 18;
const barX = (i: number) => CHART.x + BAR_PAD + (i * (CHART.w - 2 * BAR_PAD - BAR_W)) / (BARS.length - 1);

const MENU_Y = [WIN.y + WIN.bar + 28, WIN.y + WIN.bar + 52, WIN.y + WIN.bar + 76, WIN.y + WIN.bar + 100];
const ROWS_Y = [PANEL.y + 84, PANEL.y + 108, PANEL.y + 132, PANEL.y + 156, PANEL.y + 180];
const KPI_VALUES = ['48.2k', '+32%', '0.9s'];

export function SketchDrawing({ s1, s2, s3, labels }: { s1: number; s2: number; s3: number; labels: [string, string, string] }) {
  // Pencil grey while sketching, settles into the UI border colour once structured.
  const ink = s2 > 0 ? `color-mix(in oklab, var(--color-border) ${s2 * 100}%, var(--color-muted))` : 'var(--color-muted)';
  // Hidden until it starts, otherwise round caps leave a dot where the line will begin.
  const draw = (p: number) => ({ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p, opacity: p > 0.001 ? 1 : 0 });
  const line = 1.4 - s2 * 0.4;
  const trendY = PANEL.y + 22;

  return (
    <svg viewBox="0 0 640 450" fill="none" className="h-auto w-full" role="img" aria-hidden>
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--color-border)" />
        </pattern>
        <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent-hover)" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="window">
          <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={WIN.r} />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="640" height="450" fill="url(#glow)" opacity={s3} />

      {/* Construction guides and dimensions: the architect's pencil, gone once the structure is set */}
      <g stroke="var(--color-muted)" strokeWidth="0.8" strokeDasharray="3 5" opacity={(1 - s2) * 0.5}>
        <line x1="0" y1={WIN.y} x2={640 * part(s1, 0, 0.25)} y2={WIN.y} />
        <line x1="0" y1={WIN.y + WIN.h} x2={640 * part(s1, 0.05, 0.25)} y2={WIN.y + WIN.h} />
        <line x1={WIN.x} y1="0" x2={WIN.x} y2={450 * part(s1, 0.08, 0.25)} />
        <line x1={WIN.x + WIN.w} y1="0" x2={WIN.x + WIN.w} y2={450 * part(s1, 0.12, 0.25)} />
      </g>
      <g opacity={(1 - s2) * part(s1, 0.55, 0.3)} stroke="var(--color-accent)" strokeWidth="1">
        <path d={`M${WIN.x} 422H${WIN.x + WIN.w}M${WIN.x} 416v12M${WIN.x + WIN.w} 416v12`} />
        <path d={`M616 ${WIN.y}V${WIN.y + WIN.h}M610 ${WIN.y}h12M610 ${WIN.y + WIN.h}h12`} />
        <text x="320" y="440" textAnchor="middle" fill="var(--color-accent)" stroke="none" className="font-mono text-[11px]">
          1280 px
        </text>
        <text x="628" y="220" textAnchor="middle" fill="var(--color-accent)" stroke="none" className="font-mono text-[11px]" transform="rotate(90 628 220)">
          800 px
        </text>
      </g>

      {/* Fills live inside the window's rounded corners */}
      <g clipPath="url(#window)">
        <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="var(--color-surface)" fillOpacity={s2 * 0.9} />
        <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="url(#dots)" opacity={s2 * (1 - s3) * 0.7} />
        <rect x={WIN.x} y={WIN.y + WIN.bar} width={SIDE_W} height={WIN.h - WIN.bar} fill="var(--color-card)" opacity={s2 * 0.7} />
      </g>

      {/* Window frame and title bar */}
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={WIN.r} stroke={ink} strokeWidth={line} {...draw(part(s1, 0.05, 0.4))} />
      <line x1={WIN.x} y1={WIN.y + WIN.bar} x2={WIN.x + WIN.w} y2={WIN.y + WIN.bar} stroke={ink} strokeWidth={line} {...draw(part(s1, 0.2))} />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={WIN.x + 22 + i * 16}
          cy={WIN.y + WIN.bar / 2}
          r="4"
          stroke={ink}
          strokeWidth={line}
          fill={['#e5484d', '#f5a524', '#30a46c'][i]}
          fillOpacity={s3}
          {...draw(part(s1, 0.25 + i * 0.04, 0.15))}
        />
      ))}

      {/* Sidebar menu */}
      <line x1={WIN.x + SIDE_W} y1={WIN.y + WIN.bar} x2={WIN.x + SIDE_W} y2={WIN.y + WIN.h} stroke={ink} strokeWidth={line} {...draw(part(s1, 0.3))} />
      <rect x={WIN.x + 14} y={MENU_Y[0] - 10} width={SIDE_W - 28} height="20" rx="6" fill="var(--color-accent)" opacity={s3 * 0.18} />
      {MENU_Y.map((y, i) => (
        <line
          key={y}
          x1={WIN.x + 24}
          y1={y}
          x2={WIN.x + SIDE_W - 24 - (i === 0 ? 0 : 10 + i * 6)}
          y2={y}
          stroke={i === 0 && s3 > 0 ? 'var(--color-accent)' : ink}
          strokeWidth={2.2}
          strokeLinecap="round"
          {...draw(part(s1, 0.35 + i * 0.05, 0.2))}
        />
      ))}

      {/* KPI cards */}
      {[0, 1, 2].map((i) => {
        const x = colX(i);
        const label = part(s1, 0.55 + i * 0.05, 0.2);
        return (
          <g key={i}>
            <rect x={x} y={TOP} width={COL} height={KPI_H} rx="10" fill="var(--color-card)" fillOpacity={s2} />
            <rect x={x} y={TOP} width={COL} height={KPI_H} rx="10" stroke={ink} strokeWidth={line} {...draw(part(s1, 0.4 + i * 0.06))} />
            <line
              x1={x + 14}
              y1={TOP + 20}
              x2={x + 58}
              y2={TOP + 20}
              stroke={ink}
              strokeWidth="2"
              strokeLinecap="round"
              {...draw(label)}
              opacity={label > 0.001 ? 1 - s3 : 0}
            />
            <line x1={x + 14} y1={TOP + 42} x2={x + 88} y2={TOP + 42} stroke={ink} strokeWidth="5" strokeLinecap="round" opacity={(1 - s3) * part(s2, 0.2)} />
            <text x={x + 14} y={TOP + 23} fill="var(--color-muted)" opacity={s3} className="font-sans text-[10px]">
              {labels[i]}
            </text>
            <text
              x={x + 14}
              y={TOP + 50}
              fill={i === 1 ? 'var(--color-accent-hover)' : 'var(--color-text)'}
              opacity={part(s3, 0.1 + i * 0.1, 0.3)}
              className="font-display text-[22px] font-extrabold"
            >
              {KPI_VALUES[i]}
            </text>
          </g>
        );
      })}

      {/* Bar chart */}
      <rect x={CHART.x} y={CHART.y} width={CHART.w} height={CHART.h} rx="10" fill="var(--color-card)" fillOpacity={s2} />
      <rect x={CHART.x} y={CHART.y} width={CHART.w} height={CHART.h} rx="10" stroke={ink} strokeWidth={line} {...draw(part(s1, 0.5))} />
      <line x1={CHART.x + BAR_PAD} y1={BAR_BASE} x2={CHART.x + CHART.w - BAR_PAD} y2={BAR_BASE} stroke={ink} strokeWidth="1" opacity={part(s2, 0.3)} />
      {BARS.map((h, i) => {
        const grow = 0.25 + 0.75 * part(s3, i * 0.06, 0.4);
        const height = s3 > 0 ? h * grow : h * 0.6;
        return (
          <rect
            key={i}
            x={barX(i)}
            y={BAR_BASE - height}
            width={BAR_W}
            height={height}
            rx="4"
            stroke={s3 > 0 ? 'none' : ink}
            strokeWidth={line}
            fill="url(#bar)"
            fillOpacity={s3}
            {...(s3 > 0 ? {} : draw(part(s1, 0.62 + i * 0.03, 0.2)))}
          />
        );
      })}

      {/* Side panel: a live trend line over a short list */}
      <rect x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} rx="10" fill="var(--color-card)" fillOpacity={s2} />
      <rect x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} rx="10" stroke={ink} strokeWidth={line} {...draw(part(s1, 0.52))} />
      <path
        d={`M${PANEL.x + 14} ${trendY + 36} C${PANEL.x + 30} ${trendY + 30} ${PANEL.x + 40} ${trendY + 18} ${PANEL.x + 54} ${trendY + 22} S${PANEL.x + 80} ${trendY + 8} ${PANEL.x + 92} ${trendY + 8} S${PANEL.x + 108} ${trendY} ${PANEL.x + PANEL.w - 14} ${trendY + 2}`}
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        {...draw(part(s3, 0.2, 0.5))}
      />
      {ROWS_Y.map((y, i) => (
        <g key={y}>
          <circle cx={PANEL.x + 20} cy={y} r="4.5" fill="var(--color-accent)" opacity={s3 * (i === 0 ? 1 : 0.35)} />
          <line
            x1={PANEL.x + 32}
            y1={y}
            x2={PANEL.x + PANEL.w - 14 - (i % 3) * 14}
            y2={y}
            stroke={ink}
            strokeWidth="2"
            strokeLinecap="round"
            {...draw(part(s1, 0.66 + i * 0.04, 0.2))}
          />
        </g>
      ))}

      {/* Pencil scribble above the window, gone when it gets real */}
      <g stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" opacity={(1 - s2) * part(s1, 0.75, 0.2)}>
        <path d="M500 14 c10 -8 22 -8 30 0" />
        <path d="M536 16 l7 11 l-11 -1" />
      </g>
    </svg>
  );
}
