import express from "express";
import { getAllPatient, addPatients } from "../controller/patient.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const patientRoutes = express.Router();

patientRoutes.get("/get-all-patient", authMiddleware, async (req, res) => {
  try {
    const patient = await getAllPatient();

    return res.status(200).json({ data: patient });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

patientRoutes.post("/add-patient", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      address,
      bodyWeight,
      bodyHeight,
      bloodType,
      allergies,
    } = req.body;

    const patient = await addPatients(
      name,
      age,
      gender,
      address,
      bodyWeight,
      bodyHeight,
      bloodType,
      allergies ?? null
    );

    return res
      .status(200)
      .json({ message: "Patient added successfully", data: patient });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default patientRoutes;
