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

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
