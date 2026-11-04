/**
 * A dashboard that is first sketched in pencil lines (s1), then gets structure (s2), then comes alive (s3).
 * Every stroke uses pathLength=1, so "drawn" is just strokeDashoffset = 1 - progress.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** Progress of one element that starts at `from` and takes `span` of its stage. */
const part = (stage: number, from: number, span = 0.35) => clamp((stage - from) / span);

const BARS = [62, 94, 72, 122, 104, 142, 168];
const MENU = [104, 128, 152, 176];
const ROWS = [228, 256, 284, 312, 340];
const KPIS = [
  { x: 172, w: 128, value: '48.2k' },
  { x: 316, w: 128, value: '+32%' },
  { x: 460, w: 124, value: '0.9s' },
];

export function SketchDrawing({ s1, s2, s3, labels }: { s1: number; s2: number; s3: number; labels: [string, string, string] }) {
  // Pencil grey while sketching, settles into the UI border colour once structured.
  const ink = s2 > 0 ? `color-mix(in oklab, var(--color-border) ${s2 * 100}%, var(--color-muted))` : 'var(--color-muted)';
  const draw = (p: number) => ({ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p });
  const sketchWidth = 1.4 - s2 * 0.4;

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
        <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Stage 3 glow behind the finished system */}
      <rect x="0" y="0" width="640" height="450" fill="url(#glow)" opacity={s3} />

      {/* Construction guides and dimensions: the architect's pencil, gone once the structure is set */}
      <g stroke="var(--color-muted)" strokeWidth="0.8" strokeDasharray="3 5" opacity={(1 - s2) * 0.55}>
        <line x1="0" y1="40" x2={640 * part(s1, 0, 0.25)} y2="40" />
        <line x1="0" y1="400" x2={640 * part(s1, 0.05, 0.25)} y2="400" />
        <line x1="40" y1="0" x2="40" y2={450 * part(s1, 0.08, 0.25)} />
        <line x1="600" y1="0" x2="600" y2={450 * part(s1, 0.12, 0.25)} />
      </g>
      <g opacity={(1 - s2) * part(s1, 0.55, 0.3)} stroke="var(--color-accent)" strokeWidth="1">
        <path d="M40 424h560M40 418v12M600 418v12" />
        <path d="M622 40v360M616 40h12M616 400h12" />
        <text x="320" y="442" textAnchor="middle" fill="var(--color-accent)" stroke="none" className="font-mono text-[11px]">
          1280 px
        </text>
        <text x="634" y="224" fill="var(--color-accent)" stroke="none" className="font-mono text-[11px]" transform="rotate(90 634 224)">
          800 px
        </text>
      </g>

      {/* Window */}
      <rect x="40" y="40" width="560" height="360" rx="14" fill="var(--color-surface)" fillOpacity={s2 * 0.9} />
      <rect x="40" y="40" width="560" height="360" rx="14" fill="url(#dots)" opacity={s2 * (1 - s3) * 0.7} />
      <rect x="40" y="40" width="560" height="360" rx="14" stroke={ink} strokeWidth={sketchWidth} {...draw(part(s1, 0.05, 0.4))} />
      <line x1="40" y1="72" x2="600" y2="72" stroke={ink} strokeWidth={sketchWidth} {...draw(part(s1, 0.2))} />
      {[62, 78, 94].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="56"
          r="4"
          stroke={ink}
          strokeWidth={sketchWidth}
          fill={s3 > 0 ? ['#e5484d', '#f5a524', '#30a46c'][i] : 'none'}
          fillOpacity={s3}
          {...draw(part(s1, 0.25 + i * 0.04, 0.15))}
        />
      ))}

      {/* Sidebar menu */}
      <rect x="40" y="72" width="110" height="328" fill="var(--color-card)" opacity={s2 * 0.7} />
      <line x1="150" y1="72" x2="150" y2="400" stroke={ink} strokeWidth={sketchWidth} {...draw(part(s1, 0.3))} />
      <rect x="56" y={MENU[0] - 10} width="80" height="20" rx="6" fill="var(--color-accent)" opacity={s3 * 0.18} />
      {MENU.map((y, i) => (
        <line
          key={y}
          x1="64"
          y1={y}
          x2={i === 0 ? 126 : 110 - i * 6}
          y2={y}
          stroke={i === 0 && s3 > 0 ? 'var(--color-accent)' : ink}
          strokeWidth={2.2}
          strokeLinecap="round"
          {...draw(part(s1, 0.35 + i * 0.05, 0.2))}
        />
      ))}

      {/* KPI cards */}
      {KPIS.map((k, i) => (
        <g key={k.x}>
          <rect x={k.x} y="92" width={k.w} height="64" rx="10" fill="var(--color-card)" fillOpacity={s2} />
          <rect x={k.x} y="92" width={k.w} height="64" rx="10" stroke={ink} strokeWidth={sketchWidth} {...draw(part(s1, 0.4 + i * 0.06))} />
          <line x1={k.x + 14} y1="112" x2={k.x + 58} y2="112" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity={1 - s3} {...draw(part(s1, 0.55 + i * 0.05, 0.2))} />
          <line x1={k.x + 14} y1="134" x2={k.x + 88} y2="134" stroke={ink} strokeWidth="5" strokeLinecap="round" opacity={(1 - s3) * part(s2, 0.2)} />
          <text x={k.x + 14} y="114" fill="var(--color-muted)" opacity={s3} className="font-sans text-[10px]">
            {labels[i]}
          </text>
          <text
            x={k.x + 14}
            y="142"
            fill={i === 1 ? 'var(--color-accent-hover)' : 'var(--color-text)'}
            opacity={part(s3, 0.1 + i * 0.1, 0.3)}
            className="font-display text-[22px] font-extrabold"
          >
            {k.value}
          </text>
        </g>
      ))}

      {/* Bar chart */}
      <rect x="172" y="176" width="272" height="200" rx="10" fill="var(--color-card)" fillOpacity={s2} />
      <rect x="172" y="176" width="272" height="200" rx="10" stroke={ink} strokeWidth={sketchWidth} {...draw(part(s1, 0.5))} />
      {BARS.map((h, i) => {
        const x = 192 + i * 35;
        const grow = 0.25 + 0.75 * part(s3, i * 0.06, 0.4);
        const height = s3 > 0 ? h * grow : h * 0.6;
        return (
          <g key={x}>
            <rect
              x={x}
              y={358 - height}
              width="18"
              height={height}
              rx="4"
              stroke={s3 > 0 ? 'none' : ink}
              strokeWidth={sketchWidth}
              fill="url(#bar)"
              fillOpacity={s3}
              {...(s3 > 0 ? {} : draw(part(s1, 0.62 + i * 0.03, 0.2)))}
            />
          </g>
        );
      })}

      {/* Side list with a live trend line */}
      <rect x="460" y="176" width="124" height="200" rx="10" fill="var(--color-card)" fillOpacity={s2} />
      <rect x="460" y="176" width="124" height="200" rx="10" stroke={ink} strokeWidth={sketchWidth} {...draw(part(s1, 0.58))} />
      <path
        d="M474 214 C490 206 498 196 512 200 S536 186 548 184 S566 176 572 178"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        {...draw(part(s3, 0.2, 0.5))}
      />
      {ROWS.map((y, i) => (
        <g key={y}>
          <circle cx="480" cy={y} r="5" fill="var(--color-accent)" opacity={s3 * (i === 0 ? 1 : 0.35)} />
          <line x1="492" y1={y} x2={568 - (i % 3) * 14} y2={y} stroke={ink} strokeWidth="2" strokeLinecap="round" {...draw(part(s1, 0.66 + i * 0.04, 0.2))} />
        </g>
      ))}

      {/* Little sketch cues: the pencil scribble and arrow that disappear when it gets real */}
      <g stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" opacity={(1 - s2) * part(s1, 0.75, 0.2)}>
        <path d="M512 20 c10 -8 22 -8 30 0" />
        <path d="M548 22 l8 14 l-12 -2" />
      </g>
    </svg>
  );
}
