import express from "express";
import { getSensorData } from "../controller/mqtt.js";

const sensorRoutes = express.Router();

sensorRoutes.get("/", (req, res) => {
  try {
    const sensorData = getSensorData(); // Ambil data terbaru dari variabel global
    return res.status(200).json({ sensorData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default sensorRoutes;
