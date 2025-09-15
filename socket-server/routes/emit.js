import express from "express";

export default function emitRouter(io) {
  const router = express.Router();

  router.post("/", (req, res) => {
    const secret = req.headers["x-api-secret"];
    if (secret !== process.env.SOCKET_API_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { event, payload, room } = req.body;
    if (room) {
      io.to(room).emit(event, payload);
    } else {
      io.emit(event, payload);
    }
console.log("Emitting event:", event, "to room:", room || "ALL");
    return res.status(200).json({ ok: true });
  });

  return router;
}
