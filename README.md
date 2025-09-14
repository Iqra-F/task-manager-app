# Task Manager App

A real-time task management application built with Next.js (App Router) and MongoDB, featuring JWT authentication and persistent websockets via a separate Socket.IO server(Node.js).

## Features

- User registration and login with JWT authentication
- Dashboard displaying tasks with title, description, creation date/time, and priority
- Create, read, update, and delete tasks
- Real-time task updates via Socket.IO
- Loader skeletons for smooth UX
- Dark/light mode compatible

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, React
- **Backend:** Next.js API Routes, Node.js, Express, Socket.IO
- **Database:** MongoDB Atlas with Mongoose
- **State Management:** Redux Toolkit + RTK Query
- **Authentication:** JWT, bcryptjs
- **Animations:** Framer Motion
- **HTTP Client:** Axios
**Security:** bcryptjs, input validation, secret headers
## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install

### Tasks UI

- Add, edit, delete tasks directly from dashboard
- Fields: Title, Description, Status, Priority, Due Date
- Responsive design with Tailwind CSS
- Integrates with Redux Toolkit RTK Query for state & API
- Loading states & toast notifications included
Install dependencies:

npm install
cd socket-server
npm install


Set environment variables:

Frontend/root .env.local

MONGODB_URI=<your-mongo-uri>
JWT_SECRET=<jwt-secret>
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
SOCKET_API_SECRET=<socket-secret>


Socket-server .env

PORT=4000
SOCKET_API_SECRET=<socket-secret>


Run development servers:

# Socket server
cd socket-server
npm run dev

# Frontend
cd ..
npm run dev
Testing

Socket /emit endpoint

# PowerShell
$headers = @{ "x-api-secret" = "<socket-secret>"; "Content-Type" = "application/json" }
$body = '{ "event": "test-event", "payload": { "msg": "hello" } }'
Invoke-RestMethod http://localhost:4000/emit -Method POST -Headers $headers -Body $body


Socket client

import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

socket.on("connect", () => console.log("Connected:", socket.id));
socket.on("presence:update", console.log);
socket.on("test-event", console.log);