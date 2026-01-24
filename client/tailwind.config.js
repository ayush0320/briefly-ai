import tailwind from 'tailwindcss'

export default{

    // Specify the paths to all of the template files in your project
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    // Extend the default Tailwind CSS theme
    theme: {
        extend: {
            colors: {
                "midnight": "#0b0a16",
                "neon-blue": "#4cc3ff",
                "soft-blue": "#76b4ff"
            }
        }
    },
    plugins: [],
}