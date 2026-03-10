
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import express from 'express';


const app = express();
const server = createServer(app);

const io = new Server(server, {
    // Allow CORS requests from local frontend in development
    cors: {
        origin: ["http://localhost:5173"]
    }
});

// Send a new message to all connected users
const emitNewMessage = (message) => {
    io.emit("new-message", message);
};

export { io, app, server, emitNewMessage };
