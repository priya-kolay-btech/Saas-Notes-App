import express from "express";
import prisma from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = signToken({ id: user.id, role: user.role, tenantId: user.tenantId });
  res.json({ token, user });
});

// Register new user (only for Admins)
router.post("/register", async (req, res) => {
  const { email, password, name, tenantId, role } = req.body;

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, name, tenantId, role },
  });

  res.json(user);
});

export default router;
