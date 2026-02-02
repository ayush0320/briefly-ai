import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import { fetchNewsByTopic } from "../utils/fetchNews.js";
import { summarizeWithGemini } from "../utils/gemini.js";

const router = express.Router();

// @route   GET /api/news/ai-feed
// @desc    Get personalized AI summarized news feed
// @access  Protected

router.get("/ai-feed", auth, async (req, res) => {
  try {
    // 1. Retrieve user preferences
    const user = await User.findById(req.user.id).select("preferences");
    const topics = user?.preferences?.topics || ["technology"];

    // 2. Fetch news articles based on topics
    const articles = await fetchNewsByTopic(topics);

    // 3. Summarize each article using Gemini AI
    // Use Promise.all to handle multiple async summarizations
    const aiEnhanced = await Promise.all(
      articles.slice(0, 5).map(async (a) => {
        const ai = await summarizeWithGemini(a.content || a.title);
        return {
          ...a,
          summary: ai.summary,
          credibility: ai.credibility,
        };
      }),
    );

    // 4. Return the AI-enhanced news feed
    return res.json({
      topics,
      count: aiEnhanced.length,
      articles: aiEnhanced,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
});

// @route   POST /api/news/credibility
// @desc    Get AI credibility score for one article
// @access  Public (no auth required)

router.post("/credibility", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Title or content is required" });
    }

    const ai = await summarizeWithGemini(content || title);

    return res.json({
      summary: ai.summary,
      credibility: ai.credibility,
      credibilityScore: ai.credibilityScore,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
});

export default router;
