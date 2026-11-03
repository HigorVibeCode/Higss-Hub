/** 1200×630 share card for WhatsApp/iMessage/LinkedIn previews, rendered by next/og. */
export function ShareImage({ eyebrow, title, accent = '#D87445' }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: `radial-gradient(ellipse at top right, ${accent}40, transparent 60%), #071316`,
        color: '#F4F6F7',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 40, fontWeight: 800 }}>
        <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
          <path d="M17 9H8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-9" stroke="#F4F6F7" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M14 18 27 5M19 5h8v8" stroke={accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Higss Hub
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 34, color: accent, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' }}>{eyebrow}</div>
        <div style={{ fontSize: title.length > 24 ? 76 : 96, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
      </div>
    </div>
  );
}
