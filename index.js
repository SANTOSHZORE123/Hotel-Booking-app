import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import register from "./routes/registrations.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.error("Error connecting to mongoDB:", error);
    throw error;
  }
};

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("close", () => {
  console.log("mongoDB connection closed!");
  // Optionally, you can attempt to reconnect here.
});


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/registrations",register)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// client is connected from here
app.use(express.static("client/build"));
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
