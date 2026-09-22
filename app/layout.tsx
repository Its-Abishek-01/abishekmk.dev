import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Anek_Latin, Anek_Tamil } from 'next/font/google';
import './globals.css';
import './live.css';
import LiveWidget from '@/components/live/LiveWidget';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const anek = Anek_Latin({ subsets: ['latin'], axes: ['wdth'], variable: '--font-anek', display: 'swap' });
const anekTamil = Anek_Tamil({ subsets: ['tamil'], variable: '--font-anek-tamil', display: 'swap' });

const SITE_URL = 'https://abishek.wiozen.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Abishek M K · App & Website Developer in Trichy', template: '%s · Abishek M K' },
  description: 'Freelance app and website developer in Tiruchirappalli (Trichy), Tamil Nadu. Android and iOS apps, business websites, web apps and hosting for clients in Trichy, across India and worldwide.',
  authors: [{ name: 'Abishek M K', url: SITE_URL }],
  creator: 'Abishek M K',
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'Abishek M K', url: SITE_URL },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: '3P0hT-OqKAlAoIEsVhsawqCsPdwEZqB0sQpQ0aBAhSY' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable} ${anek.variable} ${anekTamil.variable}`}>
      <body>{children}<LiveWidget /></body>
    </html>
  );
}
