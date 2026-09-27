import express from "express";
import { callGroq } from "../llm.js";

const router = express.Router();
const TIMEOUT_MS = 15000;

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), ms)
  );
  return Promise.race([promise, timeout]);
}

function safeParse(rawText) {
  try {
    return JSON.parse(rawText);
  } catch {
    return null;
  }
}

function isValidShape(data) {
  if (!data || typeof data !== "object") return false;
  if (typeof data.title !== "string") return false;
  if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) return false;
  if (!Array.isArray(data.quiz) || data.quiz.length === 0) return false;

  const flashcardsOk = data.flashcards.every(
    (c) => typeof c.question === "string" && typeof c.answer === "string"
  );
  const quizOk = data.quiz.every(
    (q) =>
      typeof q.question === "string" &&
      Array.isArray(q.options) &&
      q.options.length >= 2 &&
      typeof q.answer === "string"
  );
  return flashcardsOk && quizOk;
}

router.post("/", async (req, res) => {
  const { input } = req.body;

  if (!input || typeof input !== "string" || input.trim().length === 0) {
    return res.status(400).json({ success: false, error: "Input is required" });
  }

  try {
    const rawText = await withTimeout(callGroq(input), TIMEOUT_MS);
    const parsed = safeParse(rawText);

    if (!parsed) {
      return res.status(422).json({ success: false, error: "AI returned malformed JSON" });
    }
    if (!isValidShape(parsed)) {
      return res.status(422).json({ success: false, error: "AI response had unexpected shape" });
    }

    return res.json({ success: true, data: parsed });
  } catch (err) {
    if (err.message === "timeout") {
      return res.status(504).json({ success: false, error: "AI request timed out" });
    }
    return res.status(500).json({ success: false, error: "AI request failed" });
  }
});

export default router;