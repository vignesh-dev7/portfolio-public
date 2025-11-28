import express from "express";
import { sendContactMail } from "../utils/sendMail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    await sendContactMail({ name, email, message });
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("SES Error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
