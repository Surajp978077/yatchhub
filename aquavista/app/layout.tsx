import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'AQUAVISTA | Luxury Yacht Charters',
    template: '%s | AQUAVISTA',
  },
  description:
    'AQUAVISTA offers the world\'s most luxurious yacht charters. Experience unmatched elegance and breathtaking destinations with our exclusive superyacht fleet.',
  keywords: [
    'luxury yacht',
    'yacht charter',
    'superyacht',
    'luxury travel',
    'Mediterranean cruise',
    'Caribbean yacht',
  ],
  openGraph: {
    siteName: 'AQUAVISTA Luxury Charters',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
