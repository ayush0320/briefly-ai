import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import { toExcerpt } from "../utils/text.ts";
import { Link } from "react-router-dom";

type NewsItem = {
  title: string;
  url: string;
  image: string | null;
  content: string | null;
};

type TopicArticleMap = Record<string, NewsItem | null>;

const Dashboard = () => {
  const [topics, setTopics] = useState([
    "India",
    "International",
    "Technology",
    "Sports",
    "Entertainment",
    "Science",
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [topicArticles, setTopicArticles] = useState<TopicArticleMap>({});

  const matchesTopic = (article: NewsItem, topic: string) => {
    const haystack =
      `${article.title ?? ""} ${article.content ?? ""}`.toLowerCase();
    return haystack.includes(topic.toLowerCase());
  };

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

  useEffect(() => {
    const loadTopicNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Try personalized feed first
        let res;
        try {
          res = await api.get("/api/news/feed");
        } catch (err: any) {
          if (err?.response?.status === 401) {
            res = await api.get("/api/news/public");
          } else {
            throw err;
          }
        }

        const articles: NewsItem[] = res.data?.articles || [];
        const apiTopics = res.data?.topics;

        if (Array.isArray(apiTopics) && apiTopics.length) {
          setTopics(apiTopics);
        }

        setTopicArticles(buildTopicMap(articles));
      } catch (err: any) {
        console.error("Dashboard API error:", err);
        setError(err?.response?.data?.message || "Failed to load topic news.");
      } finally {
        setLoading(false);
      }
    };

    loadTopicNews();
  }, []);

  return (
    <div>
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-6 py-10 ">
        <section>
          <h1 className="text-2xl font-semibold">Topic-wise highlights &gt;</h1>

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

                    <div className="p-4">
                      <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                        {topic}
                      </span>

                      <h3 className="mt-3 text-sm font-semibold text-white">
                        {article ? (
                          <Link
                            to="/credibility"
                            state={{
                              title: article.title,
                              image: article.image,
                              content: article.content,
                              url: article.url,
                              credibilityScore: 70, // placeholder score (replace later with AI)
                            }}
                            className="hover:underline text-[color:var(--color-neon-blue)]"
                          >
                            {article.title}
                          </Link>
                        ) : (
                          "No headline available yet"
                        )}
                      </h3>

                      {article?.content && (
                        <p className="mt-2 text-xs text-gray-300">
                          {toExcerpt(article.content, 90)}
                        </p>
                      )}

                      {article && (
                        <div className="mt-4 flex items-center gap-3">
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline text-[color:var(--color-neon-blue)]"
                          >
                            Read full article
                          </a>
                        </div>
                      )}
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
