// 'use client'

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import KRGlue from '@lyracom/embedded-form-glue';
// import { useProductStore } from '../stores/usePrecioStore';
// import Head from 'next/head';
// import Script from 'next/script'
// import axios from 'axios';

// const Checkout = () => {
//   const producto = useProductStore((state) => state.token);
//   const router = useRouter();
//   const [formToken, setFormToken] = useState(null);
//   const [publicKey, setPublicKey] = useState(null);

//   useEffect(() => {
//     // if (producto) {
//     console.log("PRODUCTO: ", producto)
//     const token = producto.formToken
//     const key = producto.publicKey;
//     // }


//     if (!token || !key) {
//       // Si no hay datos, redirigir o mostrar error
//       router.push('/');
//       return;
//     }

//     setFormToken(token);
//     setPublicKey(key);
//   }, []);

//   useEffect(() => {
//     if (!formToken || !publicKey) return;

//     const endpoint = "https://static.micuentaweb.pe";

//     KRGlue.loadLibrary(endpoint, publicKey).then(({ KR }) => {
//       // KR.setFormConfig({
//       //   formToken: formToken,
//       //   'kr-language': 'es-ES',
//       // });

//       KR.setFormConfig({
//         formToken: formToken,
//         form: {
//           formTarget: 'modal',
//           type: 'card',
//         },
//         appearance: {
//           customTheme: {
//             primaryColor: '#FF2D46',
//             borderRadius: '10px',
//             fontFamily: 'Roboto, sans-serif'
//           }
//         }
//       });

//       KR.onFormReady(() => {
//         console.log("Formulario cargado correctamente");
//         KR.openPaymentModal(); 
//       });


//       KR.renderElements('#micuentawebstd_rest_wrapper').then(({ KR, result }) => {
//         KR.showForm(result.formId);
//       });

//       KR.onSubmit(paymentData => {
//         axios.post('[midominio.com]/validate', {
//           'kr-answer': paymentData.rawClientAnswer,
//           'kr-hash': paymentData.hash,
//         }).then(response => {
//           if (response.data === true) {
//             // También puedes guardar respuesta en localStorage si quieres usarla en otra ruta
//             router.push('/suscriptionresult');
//           }
//         });
//         return false;
//       });
//     });
//   }, [formToken, publicKey]);

//   return (
//     <>
//       <Head>
//         {/* Estilos de la pasarela */}
//         <link
//           rel="stylesheet"
//           href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic-reset.css"
//         />
//       </Head>

//       {/* Script de la pasarela */}
//       <Script
//         src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic.js"
//         strategy="afterInteractive"
//       />

//       {/* Formulario */}
//       <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-lg font-semibold mb-4 text-center">
//             Pago con tarjeta de crédito/débito
//           </h2>
//           <div className="flex justify-center mb-4">
//             <img
//               src="https://github.com/izipay-pe/Imagenes/blob/main/logo_tarjetas_aceptadas/logo-tarjetas-aceptadas-351x42.png?raw=true"
//               alt="Tarjetas aceptadas"
//               className="w-48"
//             />
//           </div>
//           <hr className="mb-4" />
//           {/* <div id="micuentawebstd_rest_wrapper">
//             <div className="kr-embedded text-black" />
//           </div> */}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Checkout;
