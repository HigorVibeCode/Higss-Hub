import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { env } from '@/lib/env';
import { getLocale } from '@/lib/locale';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  // Share images resolve against the main domain, also when the page is served from <slug>.higsshub.com.
  metadataBase: new URL(`https://${env.rootDomain}`),
  title: 'Higss Hub',
  description: 'Projects, systems and sites — all in one place.',
  openGraph: { siteName: 'Higss Hub', type: 'website' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
