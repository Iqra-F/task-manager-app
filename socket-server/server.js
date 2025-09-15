import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import emitRouter from "./routes/emit.js";
import { presenceStore } from "./lib/presence.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://task-manager-app-five-flax.vercel.app/",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Mount /emit route
app.use("/emit", emitRouter(io));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join room by userId if sent
  socket.on("presence:join", ({ userId, name }) => {
    if (!userId) return;

    // Join the socket.io "room" for that user
    try {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room ${userId}`);
    } catch (err) {
      console.error("socket.join error:", err?.message || err);
    }

    presenceStore.addUser(socket.id, userId, name);

    // Emit presence update to all clients (or you can emit to a specific room)
    io.emit("presence:update", presenceStore.getAll());
  });

  socket.on("disconnect", () => {
    presenceStore.removeUser(socket.id);
    io.emit("presence:update", presenceStore.getAll());
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Optional debug route
app.get("/presence", (req, res) => {
  res.json(presenceStore.getAll());
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
