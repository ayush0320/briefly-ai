import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import { toExcerpt } from "../utils/text";

type NewsItem = {
  title: string;
  url: string;
  image: string | null;
  content: string | null;
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const topicQuery = (searchParams.get("q") ?? "").trim();

  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      if (!topicQuery) {
        setError("Please enter a topic to search.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/api/news/search?q=${encodeURIComponent(topicQuery)}`,
        );
        setArticles(res.data.articles || []);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          setError("Please log in to search topics.");
        } else {
          setError(err?.response?.data?.message || "Search failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [topicQuery]);

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Search results</h1>
          <p className="text-sm text-gray-300">
            Topic: <span className="text-white">{topicQuery || "—"}</span>
          </p>
        </div>

        <Link
          to="/"
          className="rounded-full border border-white/20 px-4 py-2 text-xs text-white hover:bg-white/10"
        >
          Back to Home
        </Link>
      </div>

      {loading && <p className="mt-6 text-sm text-gray-300">Searching…</p>}

      {error && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-red-300">
          {error}{" "}
          {error.includes("log in") && (
            <Link
              to="/login"
              className="ml-2 underline text-[color:var(--color-neon-blue)]"
            >
              Go to login
            </Link>
          )}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.url}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)]"
            >
              <img
                src={
                  article.image ||
                  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80"
                }
                alt={article.title}
                className="h-40 w-full rounded-xl object-cover"
              />

              <h3 className="mt-4 text-sm font-semibold text-white">
                <Link
                  to="/credibility"
                  state={{
                    title: article.title,
                    image: article.image,
                    content: article.content,
                    url: article.url,
                  }}
                  className="hover:underline text-[color:var(--color-neon-blue)]"
                >
                  {article.title}
                </Link>
              </h3>

              {article.content && (
                <p className="mt-2 text-xs text-gray-300">
                  {toExcerpt(article.content, 90)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
