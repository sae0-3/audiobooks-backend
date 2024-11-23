import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./database/database.js";
import { audioRoutes, authRoutes, userRoutes } from "./routes/index.js";

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/api", (_, res) => res.send("Hello World!"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/audios", audioRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
