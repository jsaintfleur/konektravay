import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KonekTravay — Konekte ak travay ki fèt pou ou',
  description: 'AI platform helping Haitian youth access remote work opportunities.',
  manifest: '/manifest.json',
  themeColor: '#1B4D3E',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KonekTravay',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ht" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans bg-[#FAFAF8] text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
