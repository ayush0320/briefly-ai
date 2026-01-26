import React from 'react'

const Footer = () => {

    const mainLinks = ["Home", "About", "Pages", "Contact"];
  const utilityLinks = [
    "Start here",
    "Styleguide",
    "404 not found",
    "Password protected",
    "Changelog"
  ];

  return (
    <div>
      <footer className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
          <div className="grid gap-10 md:grid-cols-3 text-sm text-gray-300">
            <div>
              <h3 className="text-white font-semibold">Briefly AI</h3>
              <p className="mt-3 text-xs leading-relaxed">
                AI-powered news briefs with credibility signals, designed for
                modern readers.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Main pages</h4>
              <ul className="mt-3 space-y-2 text-xs">
                {mainLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold">Utility pages</h4>
              <ul className="mt-3 space-y-2 text-xs">
                {utilityLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-500">
            <p>© 2026 Briefly AI. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <span className="h-6 w-6 rounded-full border border-white/10" />
              <span className="h-6 w-6 rounded-full border border-white/10" />
              <span className="h-6 w-6 rounded-full border border-white/10" />
            </div>
          </div>
        </footer>

    </div>
  )
}

export default Footer
