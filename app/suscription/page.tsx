// 'use client'

// import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
// import { useEffect, useState, useRef } from 'react';
// import { getFormToken } from "../lib/actions";

// // declare global {
// //     interface Window {
// //         Krypton?: any;
// //     }
// // }

// export default function Suscription() {
//     const plans = [
//         {
//             name: "Básico",
//             description: "Perfecto para empezar",
//             price: "$9.99",
//             period: "/mes",
//             icon: <Star className="h-6 w-6" />,
//             features: [
//                 "Hasta 5 proyectos",
//                 "1GB de almacenamiento",
//                 "Soporte por email",
//                 "Acceso a plantillas básicas",
//                 "Exportación en PDF",
//             ],
//             popular: false,
//             buttonVariant: "outline" as const,
//         },
//         {
//             name: "Profesional",
//             description: "Para profesionales y equipos pequeños",
//             price: "$24.99",
//             period: "/mes",
//             icon: <Zap className="h-6 w-6" />,
//             features: [
//                 "Proyectos ilimitados",
//                 "10GB de almacenamiento",
//                 "Soporte prioritario",
//                 "Todas las plantillas",
//                 "Colaboración en tiempo real",
//                 "Integraciones avanzadas",
//                 "Analytics detallados",
//             ],
//             popular: true,
//             buttonVariant: "default" as const,
//         },
//         {
//             name: "Empresarial",
//             description: "Para equipos grandes y empresas",
//             price: "$49.99",
//             period: "/mes",
//             icon: <Crown className="h-6 w-6" />,
//             features: [
//                 "Todo lo del plan Profesional",
//                 "100GB de almacenamiento",
//                 "Soporte 24/7",
//                 "Gestión de usuarios avanzada",
//                 "SSO y seguridad empresarial",
//                 "API personalizada",
//                 "Reportes personalizados",
//                 "Onboarding dedicado",
//             ],
//             popular: false,
//             buttonVariant: "outline" as const,
//         },
//         {
//             name: "Enterprise",
//             description: "Solución personalizada para grandes organizaciones",
//             price: "Personalizado",
//             period: "",
//             icon: <Rocket className="h-6 w-6" />,
//             features: [
//                 "Todo lo del plan Empresarial",
//                 "Almacenamiento ilimitado",
//                 "Gerente de cuenta dedicado",
//                 "Implementación personalizada",
//                 "SLA garantizado",
//                 "Integración personalizada",
//                 "Capacitación del equipo",
//                 "Soporte on-premise",
//             ],
//             popular: false,
//             buttonVariant: "outline" as const,
//         },
//     ]

//     const [formToken, setFormToken] = useState<string | null>(null);
//     const krInstance = useRef<any>(null);

//     useEffect(() => {
//         const loadScript = () => {
//             const existingScript = document.getElementById('kr-payment-form');
//             if (existingScript) return;

//             const script = document.createElement('script');
//             script.id = 'kr-payment-form';
//             script.src = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js';
//             script.async = true;
//             script.onload = () => {
//                 console.log('Izipay script loaded');
//             };
//             document.body.appendChild(script);
//         };

//         loadScript();
//     }, []);

//     // Función para iniciar el pago
//     const handlePayClick = async (amount: number, orderId: string) => {
//         try {
//             const token = await getFormToken(amount, orderId); // tu función para backend
//             if (!token) throw new Error('Token inválido');

//             setFormToken(token);
//         } catch (error) {
//             alert('Error al obtener el token de pago');
//             console.error(error);
//         }
//     };

//     // Cuando formToken cambia, inicializar Krypton y abrir modal
//     useEffect(() => {
//         if (!formToken) return;
//         if (!window.Krypton) {
//             console.error('Krypton no está disponible');
//             return;
//         }

//         // Crear instancia Krypton
//         krInstance.current = new window.Krypton({
//             formToken: formToken,
//             // Opciones personalizadas, si quieres
//             // frameStyle: '...', // estilos para el iframe embebido
//             // formTarget: 'modal', // para que abra en modal
//             formTarget: 'modal',
//             onPaymentFormLoaded: () => {
//                 console.log('Formulario cargado');
//                 // Abrir el modal justo cuando está listo
//                 krInstance.current.openPaymentModal();
//             },
//             onFormSubmitSucceeded: (result: any) => {
//                 console.log('Pago exitoso:', result);
//                 alert('Pago completado con éxito!');
//                 setFormToken(null); // cerrar formulario
//             },
//             onFormSubmitFailed: (error: any) => {
//                 console.error('Error en el pago:', error);
//                 alert('Error durante el pago, intenta de nuevo.');
//             },
//             onFormAbandoned: () => {
//                 console.log('Usuario abandonó el formulario');
//                 setFormToken(null); // cerrar formulario
//             },
//         });

//         // Carga el formulario en el DOM (no visible porque abrimos modal)
//         krInstance.current.loadForm();

//         // Cleanup por si se desmonta el componente
//         return () => {
//             if (krInstance.current) {
//                 krInstance.current.destroy();
//                 krInstance.current = null;
//             }
//         };
//     }, [formToken]);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">

//             {/* Hero Section */}
//             <section className="py-20">
//                 <div className="container mx-auto px-4 text-center">
//                     <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//                         Elige el plan perfecto
//                         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
//                             para tu ascenso
//                         </span>
//                     </h1>
//                     <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//                         Planes flexibles diseñados para crecer contigo. Desde videoconferencias, hasta planes personalizados.
//                     </p>
//                     <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
//                         <div className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-1" />
//                             Sin compromisos a largo plazo
//                         </div>
//                         <div className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-1" />
//                             Cancela cuando quieras
//                         </div>
//                         <div className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-1" />
//                             Soporte incluido
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Pricing Section */}
//             <section id="pricing" className="py-0">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center mb-16">
//                         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planes de Suscripción</h2>
//                         <p className="text-lg text-gray-600">Elige el plan que mejor se adapte a tus necesidades</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//                         {plans.map((plan, index) => (
//                             <div
//                                 key={index}
//                                 className={`relative rounded-xl border bg-white p-6 ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"} transition-all duration-300 hover:shadow-xl`}
//                             >

//                                 {plan.popular && (
//                                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
//                                         Más Popular
//                                     </div>
//                                 )}


//                                 {/* Header */}
//                                 <div className="text-center pb-4">
//                                     <div
//                                         className={`mx-auto mb-4 p-3 w-fit rounded-full ${plan.popular ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
//                                     >
//                                         {plan.icon}
//                                     </div>
//                                     <h3 className="text-xl font-bold">{plan.name}</h3>
//                                     <p className="text-sm text-gray-500">{plan.description}</p>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="text-center pb-6">
//                                     <div className="mb-6">
//                                         <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
//                                         <span className="text-gray-500"> {plan.period}</span>
//                                     </div>
//                                     <ul className="space-y-3 text-left">
//                                         {plan.features.map((feature, featureIndex) => (
//                                             <li key={featureIndex} className="flex items-start">
//                                                 <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
//                                                 <span className="text-sm text-gray-600">{feature}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>

//                                 {/* Footer */}
//                                 <div >
//                                     <button
//                                         onClick={() => {
//                                             if (plan.price === "Personalizado") {
//                                                 alert('Contacta ventas para este plan');
//                                             } else {
//                                                 // Convierte precio $9.99 a número en céntimos o la unidad que maneje tu backend
//                                                 const priceNumber = Number(plan.price.replace(/[^0-9.]/g, ''));
//                                                 const amountInCents = Math.round(priceNumber * 100);
//                                                 handlePayClick(amountInCents, `orden-${plan.name.toLowerCase()}`);
//                                             }
//                                         }}
//                                         className={`w-full rounded-lg px-4 py-2 text-white font-semibold ${plan.popular
//                                             ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                                             : "bg-gray-800 hover:bg-gray-900"
//                                             }`}
//                                     >
//                                         {plan.price === "Personalizado" ? "Contactar Ventas" : `Comenzar con ${plan.name}`}
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Additional Info */}
//                     <div className="text-center mt-16">
//                         <p className="text-gray-600 mb-4">
//                             ¿Necesitas algo diferente?
//                             <a href="#" className="text-blue-600 hover:underline ml-1">
//                                 Contáctanos
//                             </a>
//                         </p>
//                         <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
//                             <div className="flex items-center">
//                                 <Check className="h-4 w-4 text-green-500 mr-1" />
//                                 Prueba gratuita de 14 días
//                             </div>
//                             <div className="flex items-center">
//                                 <Check className="h-4 w-4 text-green-500 mr-1" />
//                                 Migración gratuita
//                             </div>
//                             <div className="flex items-center">
//                                 <Check className="h-4 w-4 text-green-500 mr-1" />
//                                 Garantía de devolución
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// 'use client'

// import { getFormToken } from "../lib/actions";
// import { useEffect, useRef, useState } from "react";
// import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
// import Head from "next/head";
// import Script from "next/script";

// declare global {
//     interface Window {
//         Krypton: any;
//     }
// }

// export default function PaymentPage() {
//     const [formToken, setFormToken] = useState<string | null>(null);
//     const krInstance = useRef<any>(null);

//     // Reemplaza con tu clave pública real (3era clave del panel API REST)
//     const KR_PUBLIC_KEY = "55969919:testpublickey_EV28rfLmpn0qPLk7bedvHpUXrF3uxVUChxNZUZTfhfFSz";

//     // URL a la que se redirige después de pago exitoso
//     const KR_POST_URL_SUCCESS = "https://ponte100.com";

//     // Carga el script principal con kr-public-key y kr-post-url-success
//     // y el CSS + JS del tema neon en el head usando next/head y next/script
//     // (esto es lo que pide la doc oficial)
//     return (
//         <>
//             <Head>
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//                 <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
//                 <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

//                 {/* Tema neon */}
//                 <link
//                     rel="stylesheet"
//                     href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.min.css"
//                 />
//             </Head>

//             {/* Script principal kr-payment-form con atributos kr-public-key y kr-post-url-success */}
//             <Script
//                 id="kr-payment-form"
//                 src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
//                 strategy="afterInteractive"
//                 kr-public-key={KR_PUBLIC_KEY}
//                 kr-post-url-success={KR_POST_URL_SUCCESS}
//                 onLoad={() => {
//                     console.log("Krypton script loaded");
//                 }}
//             />

//             {/* Script JS tema neon */}
//             <Script
//                 src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js"
//                 strategy="afterInteractive"
//             />

//             {/* Aquí va el resto de tu UI y lógica */}
//             <MainContent
//                 formToken={formToken}
//                 setFormToken={setFormToken}
//                 krInstance={krInstance}
//                 handlePayClick={async (amount: number, orderId: string) => {
//                     try {
//                         const token = await getToken(amount, orderId);
//                         if (!token) throw new Error("Token inválido");
//                         setFormToken(token);
//                     } catch (error) {
//                         alert("Error al obtener el token de pago");
//                         console.error(error);
//                     }
//                 }}
//             />
//         </>
//     );
// }

// function MainContent({ formToken, setFormToken, krInstance, handlePayClick }: any) {
//     useEffect(() => {
//         if (!formToken) return;
//         if (!window.Krypton) {
//             console.error("Krypton no está disponible");
//             return;
//         }

//         krInstance.current = new window.Krypton({
//             formToken: formToken,
//             formTarget: "modal",
//             onPaymentFormLoaded: () => {
//                 console.log("Formulario cargado");
//                 krInstance.current.openPaymentModal();
//             },
//             onFormSubmitSucceeded: (result: any) => {
//                 console.log("Pago exitoso:", result);
//                 alert("Pago completado con éxito!");
//                 setFormToken(null);
//             },
//             onFormSubmitFailed: (error: any) => {
//                 console.error("Error en el pago:", error);
//                 alert("Error durante el pago, intenta de nuevo.");
//             },
//             onFormAbandoned: () => {
//                 console.log("Usuario abandonó el formulario");
//                 setFormToken(null);
//             },
//         });

//         krInstance.current.loadForm();

//         return () => {
//             if (krInstance.current) {
//                 krInstance.current.destroy();
//                 krInstance.current = null;
//             }
//         };
//     }, [formToken, setFormToken, krInstance]);

//     const plans = [
//         {
//             name: "Básico",
//             description: "Perfecto para empezar",
//             price: "$9.99",
//             period: "/mes",
//             icon: <Star className="h-6 w-6" />,
//             features: [
//                 "Hasta 5 proyectos",
//                 "1GB de almacenamiento",
//                 "Soporte por email",
//                 "Acceso a plantillas básicas",
//                 "Exportación en PDF",
//             ],
//             popular: false,
//             buttonVariant: "outline" as const,
//         },
//         {
//             name: "Profesional",
//             description: "Para profesionales y equipos pequeños",
//             price: "$24.99",
//             period: "/mes",
//             icon: <Zap className="h-6 w-6" />,
//             features: [
//                 "Proyectos ilimitados",
//                 "10GB de almacenamiento",
//                 "Soporte prioritario",
//                 "Todas las plantillas",
//                 "Colaboración en tiempo real",
//                 "Integraciones avanzadas",
//                 "Analytics detallados",
//             ],
//             popular: true,
//             buttonVariant: "default" as const,
//         },
//         {
//             name: "Empresarial",
//             description: "Para equipos grandes y empresas",
//             price: "$49.99",
//             period: "/mes",
//             icon: <Crown className="h-6 w-6" />,
//             features: [
//                 "Todo lo del plan Profesional",
//                 "100GB de almacenamiento",
//                 "Soporte 24/7",
//                 "Gestión de usuarios avanzada",
//                 "SSO y seguridad empresarial",
//                 "API personalizada",
//                 "Reportes personalizados",
//                 "Onboarding dedicado",
//             ],
//             popular: false,
//             buttonVariant: "outline" as const,
//         },
//         {
//             name: "Enterprise",
//             description: "Solución personalizada para grandes organizaciones",
//             price: "Personalizado",
//             period: "",
//             icon: <Rocket className="h-6 w-6" />,
//             features: [
//                 "Todo lo del plan Empresarial",
//                 "Almacenamiento ilimitado",
//                 "Gerente de cuenta dedicado",
//                 "Implementación personalizada",
//                 "SLA garantizado",
//                 "Integración personalizada",
//                 "Capacitación del equipo",
//                 "Soporte on-premise",
//             ],
//             popular: false,
//             buttonVariant: "outline" as const,
//         },
//     ]

//     // Aquí va tu UI completa (hero, planes, botones, etc)
//     // Reemplaza `plans` con tu estado o constante con los planes
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">

//             {/* Hero Section */}
//             <section className="py-20">
//                 <div className="container mx-auto px-4 text-center">
//                     <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//                         Elige el plan perfecto
//                         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
//                             para tu ascenso
//                         </span>
//                     </h1>
//                     <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//                         Planes flexibles diseñados para crecer contigo. Desde videoconferencias, hasta planes personalizados.
//                     </p>
//                     <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
//                         <div className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-1" />
//                             Sin compromisos a largo plazo
//                         </div>
//                         <div className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-1" />
//                             Cancela cuando quieras
//                         </div>
//                         <div className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-1" />
//                             Soporte incluido
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Pricing Section */}
//             <section id="pricing" className="py-0">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center mb-16">
//                         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planes de Suscripción</h2>
//                         <p className="text-lg text-gray-600">Elige el plan que mejor se adapte a tus necesidades</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//                         {plans.map((plan, index) => (
//                             <div
//                                 key={index}
//                                 className={`relative rounded-xl border bg-white p-6 ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"} transition-all duration-300 hover:shadow-xl`}
//                             >

//                                 {plan.popular && (
//                                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
//                                         Más Popular
//                                     </div>
//                                 )}


//                                 {/* Header */}
//                                 <div className="text-center pb-4">
//                                     <div
//                                         className={`mx-auto mb-4 p-3 w-fit rounded-full ${plan.popular ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
//                                     >
//                                         {plan.icon}
//                                     </div>
//                                     <h3 className="text-xl font-bold">{plan.name}</h3>
//                                     <p className="text-sm text-gray-500">{plan.description}</p>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="text-center pb-6">
//                                     <div className="mb-6">
//                                         <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
//                                         <span className="text-gray-500"> {plan.period}</span>
//                                     </div>
//                                     <ul className="space-y-3 text-left">
//                                         {plan.features.map((feature, featureIndex) => (
//                                             <li key={featureIndex} className="flex items-start">
//                                                 <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
//                                                 <span className="text-sm text-gray-600">{feature}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>

//                                 {/* Footer */}
//                                 <div >
//                                     <button
//                                         onClick={() => {
//                                             if (plan.price === "Personalizado") {
//                                                 alert('Contacta ventas para este plan');
//                                             } else {
//                                                 // Convierte precio $9.99 a número en céntimos o la unidad que maneje tu backend
//                                                 const priceNumber = Number(plan.price.replace(/[^0-9.]/g, ''));
//                                                 const amountInCents = Math.round(priceNumber * 100);
//                                                 handlePayClick(amountInCents, `orden-${plan.name.toLowerCase()}`);
//                                             }
//                                         }}
//                                         className={`w-full rounded-lg px-4 py-2 text-white font-semibold ${plan.popular
//                                             ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                                             : "bg-gray-800 hover:bg-gray-900"
//                                             }`}
//                                     >
//                                         {plan.price === "Personalizado" ? "Contactar Ventas" : `Comenzar con ${plan.name}`}
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Additional Info */}
//                     <div className="text-center mt-16">
//                         <p className="text-gray-600 mb-4">
//                             ¿Necesitas algo diferente?
//                             <a href="#" className="text-blue-600 hover:underline ml-1">
//                                 Contáctanos
//                             </a>
//                         </p>
//                         <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
//                             <div className="flex items-center">
//                                 <Check className="h-4 w-4 text-green-500 mr-1" />
//                                 Prueba gratuita de 14 días
//                             </div>
//                             <div className="flex items-center">
//                                 <Check className="h-4 w-4 text-green-500 mr-1" />
//                                 Migración gratuita
//                             </div>
//                             <div className="flex items-center">
//                                 <Check className="h-4 w-4 text-green-500 mr-1" />
//                                 Garantía de devolución
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Ejemplo botón de pago */}
//             {/* <button
//                 onClick={() => {
//                     // Usa esta función para llamar al pago
//                     handlePayClick(999, "orden-ejemplo");
//                 }}
//             >
//                 Pagar ejemplo
//             </button> */}
//         </div>
//     );
// }

// // Debes implementar esta función para obtener token del backend
// async function getToken(amount: number, orderId: string) {
//     // Aquí tu llamada a backend, que te devuelve el formToken
//     // Ejemplo ficticio:
//     //  "tu_form_token_desde_backend";
//     try {
//         const token = await getFormToken(amount, orderId); // tu función para backend
//         if (!token) throw new Error('Token inválido');

//         return token;
//     } catch (error) {
//         alert('Error al obtener el token de pago');
//         console.error(error);
//     }
// }

// app/payment/page.tsx
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Script from 'next/script';
// import { getFormToken } from "../lib/actions";

// const KR_PUBLIC_KEY = '55969919:testpublickey_EV28rfLmpn0qPLk7bedvHpUXrF3uxVUChxNZUZTfhfFSz';
// const KR_POST_URL_SUCCESS = 'https://ponte100.com';

// export default function PaymentPage() {
//     const [formToken, setFormToken] = useState<string | null>(null);
//     const krInstance = useRef<any>(null);
//     const [kryptonReady, setKryptonReady] = useState(false);

//     useEffect(() => {
//         if (!formToken || !kryptonReady) return;

//         // Limpia instancia previa si existe
//         if (krInstance.current) {
//             krInstance.current.destroy();
//             krInstance.current = null;
//         }

//         // Crea instancia
//         krInstance.current = new window.Krypton({
//             formToken,
//             formTarget: 'form', // Inline en el div, no modal
//             krPublicKey: KR_PUBLIC_KEY,
//             krPostUrlSuccess: KR_POST_URL_SUCCESS,
//             onPaymentFormLoaded: () => {
//                 console.log('Formulario cargado');
//             },
//             onFormSubmitSucceeded: () => {
//                 alert('Pago exitoso');
//                 setFormToken(null);
//             },
//             onFormSubmitFailed: () => {
//                 alert('Error en el pago');
//                 setFormToken(null);
//             },
//         });

//         // Espera a que el formulario se adjunte al DOM
//         krInstance.current.attachForm()
//             .then(() => {
//                 console.log('Formulario adjuntado al DOM correctamente');
//             })
//             .catch((err: any) => {
//                 console.error('Error adjuntando formulario', err);
//             });

//         return () => {
//             if (krInstance.current) {
//                 krInstance.current.destroy();
//                 krInstance.current = null;
//             }
//         };
//     }, [formToken, kryptonReady]);

//     const handlePayClick = async () => {
//         const token = await getFormToken(1000, 'order-123');
//         if (!token) {
//             alert('Error al obtener el token');
//             return;
//         }
//         setFormToken(token.formToken);
//     };

//     return (
//         <div className="pt-52">
//             <Script
//                 src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
//                 strategy="beforeInteractive"
//                 onLoad={() => {
//                     setKryptonReady(true);
//                     console.log('Script Krypton cargado');
//                 }}
//                 onError={() => {
//                     alert('No se pudo cargar Krypton');
//                 }}
//             />
//             <button onClick={handlePayClick}>Pagar</button>

//             {/* Contenedor inline para el formulario */}
//             <div className="kr-smart-form" kr-popin kr-form-token={formToken}></div>
//         </div>
//     );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFormToken } from '../lib/actions'; // Ajusta según tu ruta real

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayClick = async () => {
    setLoading(true);

    try {
      const token = await getFormToken(1000, 'order-123');

      if (!token || !token.formToken) {
        alert('Error al generar el formulario de pago');
        setLoading(false);
        return;
      }

      // Redirige a checkout/[token]
      router.replace(`/checkout/${token.formToken}`);
    } catch (error) {
      alert('Error inesperado al generar el token');
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin" />
          <p className="text-blue-600 font-semibold">Cargando datos para pago seguro...</p>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handlePayClick}
        >
          Pagar
        </button>
      )}
    </main>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// export default function KryptonForm() {
//   const [kryptonReady, setKryptonReady] = useState(false);

//   // Simula un token real de tu backend (reemplaza con el real)
//   const formToken = "04_54IOSotS7G61Rr6qtp_vw255eyJhbW91bnQiOjEwMDAsImN1cnJlbmN5IjoiUEVOIiwibW9kZSI6IlRFU1QiLCJ2ZXJzaW9uIjo0LCJvcmRlcklkIjoib3JkZXItMTIzIiwic2hvcE5hbWUiOiJJWkkqR3VpbGxlcm1vIEFydHVybyBWYXNxdWV6IE1hbmNvICg1ODM1NjI0KSIsImZvcm1BY3Rpb24iOiJQQVlNRU5UIiwicmlza0FuYWx5c2VyIjp7ImZpbmdlclByaW50c0lkIjoiOThhMDY4ZjQtMDUzMi00YWExLThjZjYtMGZmNmI4ODFlYzQ0IiwianNVcmwiOiJodHRwczovL3NlY3VyZS5taWN1ZW50YXdlYi5wZS90cmFzL2FuYWx5emVyL3B1YmxpYy92MS9jaGVja2VyLzk4YTA2OGY0LTA1MzItNGFhMS04Y2Y2LTBmZjZiODgxZWM0NCJ9LCJjYXRlZ29yaWVzIjp7ImRlYml0Q3JlZGl0Q2FyZHMiOnsiYXBwSWQiOiJjYXJkcyIsInBhcmFtIjpbIkFNRVgiLCJNQVNURVJDQVJEX0RFQklUIiwiTUFTVEVSQ0FSRCIsIlZJU0EiLCJWSVNBX0VMRUNUUk9OIiwiRElORVJTIiwiVklTQV9ERUJJVCJdfX0sImNhcmRzIjp7IkFNRVgiOnsiZmllbGRzIjp7InNlY3VyaXR5Q29kZSI6eyJtYXhMZW5ndGgiOjR9LCJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwMCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImNhcmRIb2xkZXJOYW1lIjp7InJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCIsInNlcGFyYXRlQnV0dG9uIjpmYWxzZX0sIk1BU1RFUkNBUkRfREVCSVQiOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiY2FyZEhvbGRlck5hbWUiOnsicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIiwic2VwYXJhdGVCdXR0b24iOmZhbHNlfSwiTUFTVEVSQ0FSRCI6eyJmaWVsZHMiOnsiaW5zdGFsbG1lbnROdW1iZXIiOnsidmFsdWUiOiItMSIsInZhbHVlcyI6eyItMSI6IjE6Ojo6OjEwMDAiLCJEWU5BTUlDIjoiOjo6OjoifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJjYXJkSG9sZGVyTmFtZSI6eyJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImZpcnN0SW5zdGFsbG1lbnREZWxheSI6eyJ2YWx1ZSI6IjAiLCJ2YWx1ZXMiOnsiMCI6IjAiLCJEWU5BTUlDIjoiRFlOQU1JQyJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQiLCJzZXBhcmF0ZUJ1dHRvbiI6ZmFsc2V9LCJWSVNBIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwMCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImNhcmRIb2xkZXJOYW1lIjp7InJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCIsInNlcGFyYXRlQnV0dG9uIjpmYWxzZX0sIlZJU0FfRUxFQ1RST04iOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiY2FyZEhvbGRlck5hbWUiOnsicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIiwic2VwYXJhdGVCdXR0b24iOmZhbHNlfSwiREVGQVVMVCI6eyJmaWVsZHMiOnsicGFuIjp7Im1pbkxlbmd0aCI6MTAsIm1heExlbmd0aCI6MTksInZhbGlkYXRvcnMiOlsiTlVNRVJJQyIsIkxVSE4iXSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6dHJ1ZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjp0cnVlfSwiZXhwaXJ5RGF0ZSI6eyJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOnRydWV9LCJzZWN1cml0eUNvZGUiOnsibWluTGVuZ3RoIjozLCJtYXhMZW5ndGgiOjMsInZhbGlkYXRvcnMiOlsiTlVNRVJJQyJdLCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOnRydWV9fSwic2VwYXJhdGVCdXR0b24iOmZhbHNlfSwiRElORVJTIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwMCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImZpcnN0SW5zdGFsbG1lbnREZWxheSI6eyJ2YWx1ZSI6IjAiLCJ2YWx1ZXMiOnsiMCI6IjAiLCJEWU5BTUlDIjoiRFlOQU1JQyJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQiLCJzZXBhcmF0ZUJ1dHRvbiI6ZmFsc2V9LCJWSVNBX0RFQklUIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwMCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImNhcmRIb2xkZXJOYW1lIjp7InJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCIsInNlcGFyYXRlQnV0dG9uIjpmYWxzZX19LCJzbWFydEZvcm0iOnsiQ0FSRFMiOnsiYWxsb3dJRnJhbWUiOmZhbHNlLCJyYW5rIjowLCJkZWFkRW5kUGF5bWVudE1ldGhvZCI6ZmFsc2UsIm5ld1BheW1lbnRSZXF1aXJlZCI6ZmFsc2UsIndhbGxldCI6ZmFsc2V9fSwiYXBpUmVzdFZlcnNpb24iOiI0LjAiLCJjb3VudHJ5IjoiUEUiLCJqU2Vzc2lvbklkIjoiOThlNEMyN2ZiMWYyRmFCRjNCMjlDODljYUVBZEYyOTgxRUVCZUFGQy52YWR3b3JsZGFwaTAyLXRscy1wcm9kLWZyLWx5cmEiLCJjdXN0b21lckVtYWlsIjoicmFoYW1zaXNjZy45NUBnbWFpbC5jb20iLCJwYXJ0aWFsUGF5bWVudHNBbGxvd2VkIjpmYWxzZX0ef02";

//   useEffect(() => {
//     // Esperar que window.Krypton esté disponible
//     const interval = setInterval(() => {
//       if ((window as any).Krypton) {
//         setKryptonReady(true);
//         clearInterval(interval);
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="pt-52">
//       <h2>Formulario de Pago Krypton</h2>

//       <div
//         className="kr-smart-form"
//         kr-form-token={formToken}
//       ></div>

//       <button
//         onClick={() =>
//           alert(
//             (window as any).Krypton
//               ? "Krypton cargado y listo"
//               : "Krypton NO cargado"
//           )
//         }
//         disabled={!kryptonReady}
//       >
//         ¿Krypton cargado?
//       </button>
//     </div>
//   );
// }
