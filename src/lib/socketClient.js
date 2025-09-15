// src/lib/socketClient.js
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"], // force ws, avoids polling issues
});

export default socket;
