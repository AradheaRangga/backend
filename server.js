import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import authRoutes from "./src/routes/authRouter.js";
import patientRoutes from "./src/routes/patientRouter.js";
import sensorRoutes from "./src/routes/sensorRoutes.js";
import initializeMQTT from "./src/controller/mqtt.js";

const app = express();
const PORT = process.env.PORT || 5000;

initializeMQTT();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API routes
app.use("/api/auth/", authRoutes);
app.use("/api/patient/", patientRoutes);
app.use("/api/sensor-data/", sensorRoutes);

//serve react frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
