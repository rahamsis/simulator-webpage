// "use client";

// import { useEffect, useRef, useState } from "react";

// interface MeetingRoomProps {
//   roomName: string;
// }

// export default function MeetingRoom({ roomName }: MeetingRoomProps) {
//   const jitsiContainerRef = useRef<HTMLDivElement>(null);
//   const [jitsiLoaded, setJitsiLoaded] = useState(false);

//   // 1️⃣ Esperar a que Jitsi se cargue en `window`
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const checkJitsiAPI = setInterval(() => {
//         if ((window as any).JitsiMeetExternalAPI) {
//           setJitsiLoaded(true);
//           clearInterval(checkJitsiAPI);
//         }
//       }, 500);
//       return () => clearInterval(checkJitsiAPI);
//     }
//   }, []);

//   // 2️⃣ Crear la reunión solo cuando Jitsi esté cargado
//   useEffect(() => {
//     if (!jitsiLoaded || !jitsiContainerRef.current) return;

//     console.log("✅ Jitsi API cargado, creando instancia...");

//     const domain = "meet.jit.si";
//     const options = {
//       roomName: roomName,
//       width: "100%",
//       height: "100%",
//       parentNode: jitsiContainerRef.current,
//       interfaceConfigOverwrite: {
//         SHOW_JITSI_WATERMARK: false,
//         SHOW_WATERMARK_FOR_GUESTS: false,
//       },
//     };

//     try {
//       const api = new (window as any).JitsiMeetExternalAPI(domain, options);
//       return () => {
//         console.log("🛑 Destruyendo instancia de Jitsi...");
//         api.dispose();
//       };
//     } catch (error) {
//       console.error("❌ Error al inicializar Jitsi:", error);
//     }
//   }, [jitsiLoaded, roomName]);

//   return <div ref={jitsiContainerRef} className="w-full h-screen bg-gray-900" />;
// }

"use client";

import { useEffect, useRef, useState } from "react";

interface MeetingRoomProps {
  roomName: string;
}

export default function MeetingRoom({ roomName }: MeetingRoomProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);

  // 1️⃣ Cargar el script de Jitsi dinámicamente
  useEffect(() => {
    const scriptId = "jitsi-external-api";
    if (document.getElementById(scriptId)) {
      setJitsiLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Jitsi API cargado.");
      setJitsiLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      console.log("🛑 Eliminando script de Jitsi...");
      document.body.removeChild(script);
    };
  }, []);

  // 2️⃣ Crear la reunión solo cuando Jitsi esté cargado
  useEffect(() => {
    if (!jitsiLoaded || !jitsiContainerRef.current) return;

    console.log("✅ Creando instancia de Jitsi...");

    const domain = "meet.jit.si";
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: jitsiContainerRef.current,
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      },
    };

    try {
      const api = new (window as any).JitsiMeetExternalAPI(domain, options);
      return () => {
        console.log("🛑 Destruyendo instancia de Jitsi...");
        api.dispose();
      };
    } catch (error) {
      console.error("❌ Error al inicializar Jitsi:", error);
    }
  }, [jitsiLoaded, roomName]);

  return <div ref={jitsiContainerRef} className="w-full h-screen bg-gray-900" />;
}
