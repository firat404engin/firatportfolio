import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import Navbar from '@/components/Layout/Navbar';
import ThemeToggle from '@/components/Layout/ThemeToggle';
import Footer from '@/components/Layout/Footer';
import { Toaster } from 'react-hot-toast';
import EasterEggManager from '@/components/EasterEggs/EasterEggManager';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fırat Engin - Portfolio',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors`}>
        <Providers>
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <ThemeToggle />
            <main className="flex-grow pt-28">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
          <EasterEggManager />
        </Providers>
      </body>
    </html>
  );
}
