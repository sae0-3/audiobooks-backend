import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./database/database.js";

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/api", (_, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
