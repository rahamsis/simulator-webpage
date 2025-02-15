'use client'

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import ClientLayout from './components/clientLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ClientLayout>{children}</ClientLayout>
        </SessionProvider>
      </body>
    </html>
  );
}