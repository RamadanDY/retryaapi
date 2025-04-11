import express from "express";
import blocksRouter from "./routes/blocks.js";
import { configDotenv } from "dotenv";

configDotenv(); // ✅ Load .env first

const API_URL = process.env.API_URL;
const PORT = 6070;

const app = express(); // ✅ You missed this line earlier!

// we import the db connection to make sure it runs
import("./db/taskdb.js");

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use(`${API_URL}/blocks`, blocksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
// 675c0c4b06cf29e3a5d6555b
