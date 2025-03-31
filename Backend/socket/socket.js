import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
const app = express()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST"]
    }
})


export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}; //userId: socketId
// io.on is simply server instance and it is listening for events related to the entire Socket.IO connections
io.on('connection', (socket) => {
    console.log("A user is connected", socket.id)

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("User Disconnects", socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

export { app, io, server }

// io.on("connection", callback) → Listens when a new client connects.
// The callback function receives a socket object representing that specific user.
// Inside this function, you can listen for events from that specific socket (e.g., message, disconnect