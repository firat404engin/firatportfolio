"use client";

import { ThemeProvider } from 'next-themes';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
} 