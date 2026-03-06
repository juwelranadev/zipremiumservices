import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { Orbitron, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'ZI PREMIUM SERVICES - Your Digital Gateway',
  description: 'Premium Digital Services at unbeatable prices',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
