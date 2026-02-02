import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import { fetchNewsByTopic } from "../utils/fetchNews.js";
import e from "express";

const router = express.Router();

// Public endpoint without JWT authentication
// Use default topics when user is not logged in
// Load the homepage news feed
// GET /api/news/public

router.get("/public", async (req, res) => {
  try {
    // Use default topics
    const topics = [
      "India",
      "Technology",
      "Sports",
      "Business",
      "Science",
      "Health",
    ];
    const articles = await fetchNewsByTopic(topics);

    return res.json({
      topics,
      count: articles.length,
      articles,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
});

/**
 * Protected endpoint with JWT authentication
 * 1) Load the logged-in user's preferences
 * 2) Decide which topics to search
 * 3) Fetch relevant news articles
 * 4) Return results as JSON
 */

router.get("/feed", auth, async (req, res) => {
  try {
    // 1. Retrieve user preferences
    const user = await User.findById(req.user.id).select("preferences");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Determine topics of interest
    const topics = user?.preferences?.topics || ["technology"];

    // 3. Get news articles
    const articles = await fetchNewsByTopic(topics);

    return res.json({
      topics,
      count: articles.length,
      articles,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
});

export default router;
