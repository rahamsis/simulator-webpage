"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signOut } from 'next-auth/react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.error("Error en la aplicación:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <motion.h1
        className="text-6xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Algo salió mal 😢
      </motion.h1>
      <motion.p
        className="mt-4 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Se ha producido un error inesperado.
      </motion.p>
      <motion.div
        className="mt-6 space-x-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
          onClick={() => reset()}
        >
          Reintentar
        </button>

        {session ? (
          <button
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
            onClick={() => router.push("/principal")}
          >
            Volver al inicio
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
            onClick={() => router.push("/")}
          >
            Volver al inicio
          </button>
        )
        }
      </motion.div>
    </div>
  );
}
