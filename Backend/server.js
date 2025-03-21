// Package Imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Route Imports
import appRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js"
import userRoutes from "./routes/user.routes.js"

// Database Imports
import connectToMongoDB from "./db/connectToMongoDB.js";

const PORT = process.env.PORT || 5000 //Either Port Value should be 5000 or it should be taken from dotenv file
const app = express();

app.use(express.json()); // Add this to parse JSON request bodies
app.use(cookieParser());

dotenv.config()

app.use('/api/auth', appRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`)
});