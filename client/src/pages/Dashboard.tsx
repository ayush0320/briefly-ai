import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";

// News item shape based on the /api/news/public response

type NewsItem = {
  title: string;
  url: string;
  image: string | null;
  content: string | null;
};

// A helper type for the grid:
// each topic maps to one chosen article (or null if not found)
type TopicArticleMap = Record<string, NewsItem | null>;

const Dashboard = () => {
  const topics = [
    "India",
    "International",
    "Technology",
    "Sports",
    "Entertainment",
    "Science",
  ];

  // Basic loading + error states for a clean UX.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Topic article map state:
   * - Each topic points to one chosen article (or null).
   * - This powers the grid in the UI.
   */
  const [topicArticles, setTopicArticles] = useState<TopicArticleMap>({});

  /**
   * Simple keyword matcher:
   * - looks in the title or content
   * - ignores case
   */
  const matchesTopic = (article: NewsItem, topic: string) => {
    const haystack =
      `${article.title ?? ""} ${article.content ?? ""}`.toLowerCase();
    return haystack.includes(topic.toLowerCase());
  };

  /**
   * Picks a single article for each topic.
   * Strategy:
   * 1) Find a match by keyword.
   * 2) If no match, fall back to the next unused article.
   */
  const buildTopicMap = (articles: NewsItem[]): TopicArticleMap => {
    const usedUrls = new Set<string>();
    const fallbackQueue = [...articles];

    return topics.reduce<TopicArticleMap>((acc, topic) => {
      const matched = articles.find(
        (article) => !usedUrls.has(article.url) && matchesTopic(article, topic),
      );

      const chosen =
        matched ?? fallbackQueue.find((a) => !usedUrls.has(a.url)) ?? null;

      if (chosen) {
        usedUrls.add(chosen.url);
      }

      acc[topic] = chosen;
      return acc;
    }, {});
  };

  /**
   * Fetch public news once when the Dashboard loads.
   */
  useEffect(() => {
    const loadTopicNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/api/news/public");
        const articles: NewsItem[] = res.data?.articles || [];

        setTopicArticles(buildTopicMap(articles));
      } catch (err: any) {
        console.error("Dashboard API error:", err);
        setError(err?.response?.data?.message || "Failed to load topic news.");
        setError(err?.response?.data?.message || "Failed to load topic news.");
      } finally {
        setLoading(false);
      }
    };

    loadTopicNews();
  }, []);

  return (
    <div>
      {/* Main layout */}
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-6 py-10 ">
        {/* Left column: topic grid */}
        <section>
          <h1 className="text-2xl font-semibold">Topic-wise highlights &gt;</h1>

          {/* Loading / error states */}
          {loading && (
            <p className="mt-6 text-sm text-gray-300">Loading topics…</p>
          )}

          {error && <p className="mt-6 text-sm text-red-300">{error}</p>}

          {!loading && !error && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {topics.map((topic) => {
                const article = topicArticles[topic];

                return (
                  <div
                    key={topic}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_25px_rgba(0,0,0,0.35)]"
                  >
                    {/* Image */}
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={
                          article?.image ||
                          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={article?.title || `${topic} news`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                        {topic}
                      </span>

                      <h3 className="mt-3 text-sm font-semibold text-white">
                        {article?.title || "No headline available yet"}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
