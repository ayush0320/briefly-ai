import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import { toExcerpt } from "../utils/text.ts";
import search from "../assets/react.svg";

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
                    className="group relative h-70 w-16 md:w-25 mt-0 overflow-hidden rounded-[25px] bg-white/10 shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all duration-400 hover:w-72"
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
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-200">
                        {toExcerpt(item.content)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="mt-4 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-xs text-white hover:bg-white/20 transition">
              <img
                src={search}
                alt="Search icon"
                className="inline-block w-4 h-4 mr-2"
              />
              Search for topics
            </button>
          </div>
        </div>
      </div>

      {/* CTA Panel */}
      {/* <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-[0_0_40px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">
              The easiest way to power your news with AI
            </h2>
            <p className="mt-2 text-sm text-gray-300 max-w-xl">
              Summarize articles, check credibility, and deliver personalized
              feeds in seconds.
            </p>
          </div>
          <button className="rounded-full bg-white/10 px-6 py-2 text-xs text-white shadow-[0_0_15px_rgba(76,195,255,0.4)] hover:bg-white/20">
            Get started
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
