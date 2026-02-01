import React, { useEffect, useState } from "react";
import api from "../utils/api";

const AVAILABLE_TOPICS = [
  "India",
  "International",
  "Technology",
  "Sports",
  "Entertainment",
  "Science",
  "Health",
  "Business",
];

const Preferences = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [refreshMinutes, setRefreshMinutes] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPreferences() {
      try {
        setLoading(true);
        setMessage("");
        const res = await api.get("/api/user/me");
        const prefs = res.data?.preferences || {};
        setSelectedTopics(prefs.topics || []);
        setRefreshMinutes(prefs.refreshMinutes || 60);
      } catch {
        setMessage("Could not load preferences.");
      } finally {
        setLoading(false);
      }
    }
    loadPreferences();
  }, []);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((topics) =>
      topics.includes(topic)
        ? topics.filter((t) => t !== topic)
        : [...topics, topic],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.put("/api/user/preferences", {
        topics: selectedTopics,
        refreshMinutes,
      });
      setMessage("Preferences updated!");
    } catch {
      setMessage("Failed to save. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="bg-white/10 backdrop-blur-md max-w-md w-full p-8 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-xl font-bold mb-6">Your Preferences</h2>
        {message && (
          <div
            className={`mb-4 text-sm ${
              message.includes("updated") ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {message}
          </div>
        )}
        {loading ? (
          <div>Loading…</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mb-2 font-semibold">News Topics</div>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TOPICS.map((topic) => (
                  <button
                    type="button"
                    key={topic}
                    className={`px-4 py-1 rounded-full border border-white/20 transition ${
                      selectedTopics.includes(topic)
                        ? "bg-[color:var(--color-neon-blue)] text-white"
                        : "bg-white/5 text-gray-200"
                    }`}
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block font-semibold">
                Refresh Frequency (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="180"
                value={refreshMinutes}
                onChange={(e) => setRefreshMinutes(Number(e.target.value))}
                className="w-20 rounded bg-white/10 px-2 py-1 border border-white/10 text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-[color:var(--color-neon-blue)] text-white shadow px-8 py-2 w-full"
            >
              Save Preferences
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Preferences;
