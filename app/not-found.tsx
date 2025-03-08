"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';

export default function NotFound() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center justify-center  bg-white text-white text-center">
      {/* <motion.h1
        className="text-6xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 - Página no encontrada
      </motion.h1>
      <motion.p
        className="mt-4 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        No encontramos la página que buscas.
      </motion.p>
      <motion.div
        className="mt-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition">
            Volver al inicio
          </button>
        </Link>
        holi
      </motion.div> */}
      <div className="mb-10">

        <Image
          src="/assets/404/404.svg"
          alt="Landing page builder illustration"
          width={500}
          height={500}
          className="rounded-full"
          priority // 🔥 Esto optimiza la carga de la image
        />
        {session ? (
          <button
            onClick={() => router.push("/main")}
            className="my-4  border border-green-600 text-black px-4 py-2 rounded-xl">
            volver a inicio
          </button>
        )
          : (
            <button
              onClick={() => router.push("/")}
              className="my-4  border border-green-600 text-black px-4 py-2 rounded-xl">
              volver a inicio
            </button>
          )
        }

      </div>
    </div>
  );
}
