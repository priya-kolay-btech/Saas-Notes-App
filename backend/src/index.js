import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import tenantRoutes from "./routes/tenants.js";
import noteRoutes from "./routes/notes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/tenants", tenantRoutes);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "SaaS Notes API is running 🚀" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
