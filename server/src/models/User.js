import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Identity
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // Preferences for personalized news
    preferences: {
      topics: { type: [String], default: [] },
      refreshMinutes: { type: Number, default: 60 },
    },

    // Saved articles per user
    savedArticles: [
      {
        title: String,
        url: { type: String, required: true },
        image: String,
        content: String,
        savedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
