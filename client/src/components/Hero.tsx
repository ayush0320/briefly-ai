import React from 'react'

const Hero = () => {
  return (
    <div>
       <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <p className="text-[180px] md:text-[240px] font-bold text-white/10 leading-none select-none">
            Briefly
          </p>

          <div className="mx-auto -mt-16 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h1 className="text-2xl font-semibold">Search News</h1>
            <p className="mt-2 text-sm text-gray-300">
              The page you’re looking for doesn’t exist or was moved.
              Try heading back to the dashboard.
            </p>

            <button className="mt-4 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-xs text-white hover:bg-white/20 transition">
              Go back home
            </button>
          </div>
        </div>
        </main>
    </div>
  )
}

export default Hero
