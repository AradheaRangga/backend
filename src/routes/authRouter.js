import express from "express";
import bcrypt from "bcrypt";
import { getUserByEmail, insertUser } from "../controller/user.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { insertBlacklistToken } from "../controller/token.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password, phone, patientId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "request nama tidak ditemukan" });
    } else if (!email) {
      return res.status(400).json({ message: "request email tidak ditemukan" });
    } else if (!password) {
      return res
        .status(400)
        .json({ message: "request password tidak ditemukan" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser(
      name,
      email,
      hashedPassword,
      phone ?? null,
      patientId ?? null
    );

    return res.status(201).json({ message: "User berhasil dibuat", user });
  } catch (error) {
    console.error("Terjadi error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
});

authRoutes.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    message: "Login successful",
    data: {
      accessToken: token,
    },
  });
});

authRoutes.post("/sign-out", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["Authorization"].split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    await insertBlacklistToken(token, userId);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "logout failed", error });
  }
});

export default authRoutes;
