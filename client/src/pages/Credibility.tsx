import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../utils/api";

type ArticleState = {
  title: string;
  image: string | null;
  content: string | null;
  url: string;
};

type CredibilityResponse = {
  summary: string;
  credibility: string;
  credibilityScore: number;
};

const clampScore = (value: number) => Math.min(100, Math.max(0, value));

const Credibility = () => {
  const location = useLocation();
  const article = (location.state as ArticleState | undefined) ?? null;

  const [score, setScore] = useState(50); // fallback if API fails
  const [analysis, setAnalysis] = useState<CredibilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!article) return;

    const loadCredibility = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.post("/api/news/credibility", {
          title: article.title,
          content: article.content,
        });

        const data: CredibilityResponse = res.data;
        setAnalysis(data);
        setScore(clampScore(data.credibilityScore));
      } catch (err: any) {
        setError("Failed to load AI credibility score.");
      } finally {
        setLoading(false);
      }
    };

    loadCredibility();
  }, [article]);

  if (!article) {
    return (
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)]">
          <h2 className="text-xl font-semibold">No article selected</h2>
          <p className="mt-2 text-sm text-gray-300">
            Go back and click a headline to view its credibility details.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-[color:var(--color-neon-blue)] px-6 py-2 text-sm text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* LEFT: Article */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)]">
          <img
            src={
              article.image ||
              "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80"
            }
            alt={article.title}
            className="h-64 w-full rounded-xl object-cover"
          />

          <h1 className="mt-6 text-2xl font-semibold">{article.title}</h1>

          <p className="mt-4 text-sm text-gray-300 leading-7 whitespace-pre-line">
            {article.content ||
              "Full article content isn’t available from the news API, so we’re showing the best summary we received. Use the link below to read the original source."}
          </p>

          {analysis && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
              <div className="font-semibold">AI Summary</div>
              <p className="mt-2">{analysis.summary}</p>
              <div className="mt-4 font-semibold">Credibility analysis</div>
              <p className="mt-2">{analysis.credibility}</p>
            </div>
          )}
        </section>

        {/* RIGHT: Credibility meter */}
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)]">
          <h2 className="text-lg font-semibold">Credibility meter</h2>
          <p className="mt-1 text-xs text-gray-400">
            Shows a confidence score from 0%–100%.
          </p>

          {loading ? (
            <p className="mt-6 text-sm text-gray-300">Analyzing…</p>
          ) : error ? (
            <p className="mt-6 text-sm text-red-300">{error}</p>
          ) : (
            <>
              <div className="mt-6 h-3 w-full rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-[color:var(--color-neon-blue)] shadow-[0_0_15px_rgba(76,195,255,0.6)]"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="mt-4 text-3xl font-bold">{score}%</div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Credibility;
