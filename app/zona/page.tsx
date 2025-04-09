"use client";

import { useState } from "react";
import MeetingRoom from "../components/meeting/meetingRoom";
import Image from "next/image";
import Link from "next/link";

export default function VideoCallPage() {
  const [meetingStarted, setMeetingStarted] = useState(false);
  const roomName = "mi-sala-de-reunion"; // Puedes generar dinámicamente un nombre único
  const [startVideocall, setStartVideoCall] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      {!meetingStarted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white w-full rounded-lg shadow-md overflow-hidden p-4">
            <Image
              src={"/images/taller.png"}
              alt={"videos"}
              width={1000}
              height={200}
              className="h-48 w-full object-cover"
              priority
            />
            <div className="text-center p-4 items-center w-ful">
              <h3 className="text-lg font-bold text-green-700">Taller</h3>
              {/* <p className="text-gray-600">XD</p> */}
              <Link href="/talleres">
                <button
                  className="px-6 py-3 text-white bg-green-600 rounded-lg m-3"
                  onClick={() => setMeetingStarted(true)}
                >
                  Iniciar Taller de estudio
                </button>
              </Link>

            </div>
          </div>

          <div className="bg-white w-full rounded-lg shadow-md overflow-hidden p-4">
            <Image
              src={"/images/videocall.jpeg"}
              alt={"videoCall"}
              width={1000}
              height={200}
              className="h-48 w-full object-cover"
              priority
            />
            <div className="text-center p-4 items-center w-ful">
              <h3 className="text-lg font-bold text-green-700">Reunión Instantanea</h3>
              {/* <p className="text-gray-600">XD</p> */}
              <button
                className="px-6 py-3 text-white bg-green-600 rounded-lg m-3"
                onClick={() => setMeetingStarted(true)}
              >
                Iniciar Reunión
              </button>
            </div>
          </div>

          <div className="bg-white w-full rounded-lg shadow-md overflow-hidden p-4">
            <Image
              src={"/images/videos.jpg"}
              alt={"videos"}
              width={1000}
              height={200}
              className="h-48 w-full object-cover"
              priority
            />
            <div className="text-center p-4 items-center">
              <h3 className="text-lg font-bold text-green-700">Videos de Sesiones</h3>
              {/* <p className="text-gray-600">XD</p> */}
              {/* <Link
              href={`/${course.ref}`}
              className="inline-block mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
            >
              Inicia Ahora
            </Link> */}
              <button
                className="px-6 py-3 text-white bg-green-600 rounded-lg m-3"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
        // <MeetingRoom roomName={roomName} />
      )}
    </div>
  );
}
