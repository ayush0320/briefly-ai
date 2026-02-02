import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import { handleUserSighup } from "../controllers/userController.js";

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Protected

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/user/preferences
// @desc    Update user news preferences
// @access  Protected

router.put("/preferences", auth, async (req, res) => {
  try {
    const { topics, refreshMinutes } = req.body;

    // Validate input
    if (!Array.isArray(topics) || typeof refreshMinutes !== "number") {
      return res.status(400).json({
        message: "Topics must be an array and refreshMinutes must be a number",
      });
    }

    // Update user preferences
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        preferences: {
          topics,
          refreshMinutes: refreshMinutes ?? 60,
        },
      },
      { new: true }, // return the updated document
    ).select("-password"); // exclude password from returned user

    return res.json({
      message: "Preferences updated successfully",
      preferences: user.preferences,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// Get saved articles
router.get("/saved", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("savedArticles");
    return res.json({ savedArticles: user?.savedArticles || [] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// Save an article
router.post("/saved", auth, async (req, res) => {
  try {
    const { title, url, image, content } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Article URL is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadySaved = user.savedArticles.some((a) => a.url === url);

    if (!alreadySaved) {
      user.savedArticles.unshift({ title, url, image, content });
      await user.save();
    }

    return res.json({ savedArticles: user.savedArticles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// Remove an article
router.delete("/saved", auth, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Article URL is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedArticles = user.savedArticles.filter((a) => a.url !== url);
    await user.save();

    return res.json({ savedArticles: user.savedArticles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export default router;
