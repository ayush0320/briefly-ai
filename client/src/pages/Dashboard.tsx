import React from "react";

const Dashboard = () => {
  const articles = [
    {
      title: "AI firms race to open-source safer models",
      summary:
        "Major labs are publishing safety-aligned models as competition intensifies.",
      credibility: "High",
      score: 92,
      tag: "Technology",
    },
    {
      title: "Global markets react to energy price shifts",
      summary:
        "Energy futures dipped after revised supply forecasts from key producers.",
      credibility: "Medium",
      score: 74,
      tag: "Finance",
    },
    {
      title: "New guidelines for AI in education",
      summary:
        "Schools receive a framework for responsible AI usage in classrooms.",
      credibility: "High",
      score: 88,
      tag: "Education",
    },
  ];
  return (
    <div>
      {/* Main layout */}
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[2fr_1fr]">
        {/* Left column: news cards */}
        <section>
          <h1 className="text-2xl font-semibold">Your AI‑powered brief</h1>
          <p className="mt-2 text-sm text-gray-300">
            Summarized articles with credibility signals, updated every hour.
          </p>

          <div className="mt-6 space-y-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {article.tag}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      article.credibility === "High"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                    }`}
                  >
                    Credibility: {article.credibility}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold">{article.title}</h2>
                <p className="mt-2 text-sm text-gray-300">{article.summary}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>Confidence score</span>
                  <span className="text-white font-semibold">
                    {article.score}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-[color:var(--color-neon-blue)] shadow-[0_0_10px_rgba(76,195,255,0.6)]"
                    style={{ width: `${article.score}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right column: sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <h3 className="text-lg font-semibold">Today’s insight</h3>
            <p className="mt-2 text-sm text-gray-300">
              Most articles about AI governance now cite independent safety
              audits.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <h3 className="text-lg font-semibold">Topics you follow</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-300">
              {["AI", "Finance", "Climate", "Health", "Education"].map(
                (topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/10 px-3 py-1 hover:bg-white/10"
                  >
                    {topic}
                  </span>
                ),
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
