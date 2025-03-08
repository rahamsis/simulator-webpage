"use client";

import { useState } from "react";
import MeetingRoom from "../components/meeting/meetingRoom";

export default function VideoCallPage() {
  const [meetingStarted, setMeetingStarted] = useState(false);
  const roomName = "mi-sala-de-reunion"; // Puedes generar dinámicamente un nombre único

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!meetingStarted ? (
        <button
          className="px-6 py-3 text-white bg-blue-600 rounded-lg"
          onClick={() => setMeetingStarted(true)}
        >
          Iniciar Reunión
        </button>
      ) : (
        <MeetingRoom roomName={roomName} />
      )}
    </div>
  );
}
