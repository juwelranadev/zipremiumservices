import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZI Premium Services | Enterprise Digital Solutions',
  description: 'Premium digital services infrastructure for modern businesses. Streaming, security, productivity tools delivered with enterprise-grade reliability.',
  keywords: ['premium services', 'digital solutions', 'streaming', 'VPN', 'productivity', 'enterprise'],
  authors: [{ name: 'ZI Premium Services' }],
  openGraph: {
    title: 'ZI Premium Services | Enterprise Digital Solutions',
    description: 'Premium digital services infrastructure for modern businesses.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/zi-logo.svg" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
