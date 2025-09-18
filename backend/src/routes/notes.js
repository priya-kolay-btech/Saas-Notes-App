import express from "express";
const router = express.Router();

// define your routes
router.get("/", (req, res) => {
  res.json({ message: "Notes API working" });
});

export default router;
