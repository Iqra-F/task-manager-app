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
    origin: process.env.FRONTEND_URL || "*", // Replace * with your Next.js URL in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Mount /emit route
app.use("/emit", emitRouter(io));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join room by userId if sent
  socket.on("presence:join", ({ userId, name }) => {
    presenceStore.addUser(socket.id, userId, name);
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
