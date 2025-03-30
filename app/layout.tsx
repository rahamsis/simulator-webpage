'use client'

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import ClientLayout from './components/clientLayout';
import { metadata } from './metadata';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const getImageUrl = () => {
    if (Array.isArray(metadata.openGraph?.images)) {
      return typeof metadata.openGraph.images[0] === 'object' && 'url' in metadata.openGraph.images[0]
        ? metadata.openGraph.images[0].url
        : "";
    }
    return "";
  };

  const getImageAlt = () => {
    if (Array.isArray(metadata.openGraph?.images)) {
      return typeof metadata.openGraph.images[0] === 'object' && 'alt' in metadata.openGraph.images[0]
        ? metadata.openGraph.images[0].alt
        : "";
    }
    return "";
  };

  const getTwitterImageUrl = () => {
    if (Array.isArray(metadata.twitter?.images)) {
      return metadata.twitter.images[0] || "";
    }
    return "";
  };

  return (
    <html lang="en">
      <head>
        <title>Ponte 100 - Simulador de Exámenes</title>
        <meta name="description" content={metadata.description || ""} />
        <meta property="og:title" content={String(metadata.openGraph?.title) || ""} />
        <meta property="og:description" content={String(metadata.openGraph?.description) || ""} />
        <meta property="og:url" content={String(metadata.openGraph?.url) || ""} />
        <meta property="og:site_name" content={String(metadata.openGraph?.siteName) || ""} />
        <meta property="og:image" content={getImageUrl().toString()} />
        <meta property="og:image:alt" content={getImageAlt()} />
      </head>
      <body>
        <SessionProvider>
          <ClientLayout>{children}</ClientLayout>
        </SessionProvider>
      </body>
    </html>
  );
}