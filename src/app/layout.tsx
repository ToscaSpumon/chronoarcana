import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserSettingsProvider } from '@/contexts/UserSettingsContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChronoArcana - Digital Tarot Companion',
  description: 'Track your daily Tarot card pulls, discover patterns in your readings, and deepen your spiritual journey with ChronoArcana.',
  keywords: ['tarot', 'divination', 'spiritual', 'daily readings', 'card tracking'],
  authors: [{ name: 'ChronoArcana Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0F0F1A',
  colorScheme: 'dark',
  openGraph: {
    title: 'ChronoArcana - Digital Tarot Companion',
    description: 'Track your daily Tarot card pulls and discover patterns in your readings.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChronoArcana - Digital Tarot Companion',
    description: 'Track your daily Tarot card pulls and discover patterns in your readings.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className={`${inter.className} bg-deep-void text-lunar-glow min-h-screen`}>
        <AuthProvider>
          <UserSettingsProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </UserSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
