'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const KR_PUBLIC_KEY = '55969919:testpublickey_EV28rfLmpn0qPLk7bedvHpUXrF3uxVUChxNZUZTfhfFSz';
const KR_POST_URL_SUCCESS = 'http://localhost:3000/';

export default function CheckoutPage() {
  const { token } = useParams();
  const [ready, setReady] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false);

  useEffect(() => {
    if (!ready || !token || typeof window === 'undefined') return;
    if (!window.KR || formInitialized) return;

    window.KR.setFormConfig({
      formToken: token,
      'kr-post-url-success': KR_POST_URL_SUCCESS,
      'kr-public-key': KR_PUBLIC_KEY,
    });

    window.KR.attachForm('kr-form')
      .then(() => {
        setFormInitialized(true);
        console.log('✅ Formulario Krypton montado correctamente');
      })
      .catch((error: any) => {
        console.error('❌ Error al cargar formulario Krypton:', error);
      });
  }, [ready, token, formInitialized]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      {/* Scripts cargados solo en esta página */}
      <link
        rel="stylesheet"
        href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.css"
      />
      <Script
        src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('📦 Script Krypton cargado');
          setReady(true);
        }}
        onError={() => alert('❌ Error cargando script Krypton')}
      />

      <h1 className="text-2xl font-bold mb-4">Formulario de Pago</h1>

      {!ready && <p>Cargando script de pago…</p>}
      {ready && !formInitialized && <p>Preparando formulario…</p>}

      <div id="kr-form" kr-popin className="w-full max-w-md pl-20">
        <div className="kr-embedded"></div>
      </div>
    </div>
  );
}
