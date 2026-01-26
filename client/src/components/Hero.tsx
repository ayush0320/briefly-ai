import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

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

  return (
    <div>
      <main className="relative mx-auto max-w-6xl px-6 py-14">
        {/* Background heading */}
        <div className="text-center">
          <p className="text-[160px] md:text-[220px] font-bold text-white/10 leading-none select-none">
            Briefly
          </p>
        </div>

        {/* Loading / error states */}
        {loading && (
          <p className="mt-6 text-center text-sm text-gray-300">
            Loading news…
          </p>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-red-300">{error}</p>
        )}

        {/* News tiles */}
        {!loading && !error && (
          <div className="mt-10 flex items-center justify-center gap-5">
            {news.slice(0, 6).map((item, idx) => (
              <div
                key={`${item.url}-${idx}`}
                className="group relative h-64 w-16 md:w-20 overflow-hidden rounded-[40px] bg-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:w-72"
              >
                {/* Image */}
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-200">
                    {toExcerpt(item.content)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <p className="text-[180px] md:text-[240px] font-bold text-white/10 leading-none select-none">
            Briefly
          </p>

          <div className="mx-auto -mt-16 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-[0_0_40px_rgba(0,0,0,0.4)]">
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p className="mt-2 text-sm text-gray-300">
              The page you’re looking for doesn’t exist or was moved. Try
              heading back to the dashboard.
            </p>

            <button className="mt-4 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-xs text-white hover:bg-white/20 transition">
              Go back home
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
