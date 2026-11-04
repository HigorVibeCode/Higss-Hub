import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon for iPhone/iPad when a client saves their page. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#071316' }}>
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <path d="M17 9H8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-9" stroke="#F4F6F7" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M14 18 27 5M19 5h8v8" stroke="#D87445" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
