import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected with ID:", socket.id);
  // Optional: join presence or rooms
  socket.emit("presence:join", { userId: "123", name: "Iqra" });
});

socket.on("presence:update", (data) => {
  console.log("Online users:", data);
});

socket.on("test-event", (data) => {
  console.log("Received test-event:", data);
});
