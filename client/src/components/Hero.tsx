import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import { toExcerpt } from "../utils/text.ts";
import { useNavigate } from "react-router-dom";

// Represents the structure of a news article object returned by the server
type NewsItem = {
  title: string;
  image: string | null;
  content: string | null;
  url: string;
};

const Hero = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    // Send user to credibility page with pasted content
    navigate("/credibility", {
      state: {
        title: "User submitted article",
        content: trimmed,
        url: null,
        image: null,
      },
    });
  };

  // Track login status (cookie-based auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Track the input text (keeps the input controlled)
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Fetch public news for homepage
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/api/news/public");
        setNews(res.data.articles || []);
      } catch (error: any) {
        setError(error?.response?.data?.message || "Failed to load news.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Check login state using the cookie
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        // If this request succeeds, the user is logged in
        await api.get("/api/user/profile");
        if (isMounted) setIsAuthenticated(true);
      } catch {
        // If it fails, user is not logged in
        if (isMounted) setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="relative z-12 mx-auto max-w-6xl px-6 py-14">
        {/* Background heading */}
        <div className="text-center relative z-10 lg:space-y-8 sm:space-y-13">
          <p className="text-[80px] md:text-[170px] font-bold text-white/10 leading-none select-none">
            News, briefly
          </p>

          {/* News tiles */}
          <div className="mx-auto -mt-16 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <h1 className="flex text-xl">Top stories &gt;</h1>

            <hr className="opacity-16 mt-3" />

            {/* Loading / error states */}
            {loading && (
              <p className="mt-6 text-center text-sm text-gray-300">
                Loading news…
              </p>
            )}

            {error && (
              <p className="mt-6 text-center text-sm text-red-300">{error}</p>
            )}

            {/* Hover Cards */}
            {!loading && !error && (
              <div className="mt-10 flex items-center justify-center gap-5">
                {news.slice(0, 5).map((item, idx) => (
                  <div
                    key={`${item.url}-${idx}`}
                    tabIndex={0}
                    className="group relative h-70 w-16 md:w-25 overflow-hidden rounded-[25px] bg-white/10 shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all duration-400 md:hover:w-72 focus:w-72 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-neon-blue)]"
                  >
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-200 line-clamp-3">
                        {toExcerpt(item.content)}
                      </p>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-xs underline text-[color:var(--color-neon-blue)]"
                      >
                        Read full article →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search section */}
          <form
            onSubmit={handleAnalyzeSubmit}
            className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <div className="relative w-full max-w-lg">
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  isAuthenticated
                    ? "Paste a full news article here to analyze credibility..."
                    : "Log in to paste and analyze news content"
                }
                rows={4}
                disabled={!isAuthenticated}
                aria-disabled={!isAuthenticated}
                className={`w-full rounded-xl border border-white/20 bg-white/10 p-4 pr-24 text-xs text-white shadow-[0_0_15px_rgba(76,195,255,0.4)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-neon-blue)] resize-none ${
                  !isAuthenticated ? "cursor-not-allowed opacity-60" : ""
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={!isAuthenticated || !query.trim()}
              className={`rounded-full border border-white/20 px-4 py-2 text-xs text-white transition ${
                !isAuthenticated || !query.trim()
                  ? "cursor-not-allowed opacity-60"
                  : "hover:bg-white/20"
              }`}
            >
              Analyze
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
