/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2b3674', // Deep Navy
                'primary-dark': '#1a2251',
                'primary-light': '#4c5daa',
                secondary: '#a3aed0', // Soft Grey-Blue
                accent: '#4318FF',    // Vibrant Blue/Purple
                'accent-light': '#6AD2FF',
                'bg-app': '#F4F7FE',  // Very Light Grey-Blue
                glass: 'rgba(255, 255, 255, 0.4)',
                'glass-border': 'rgba(255, 255, 255, 0.7)',
                text: '#1B254B',
                'text-secondary': '#A3AED0',
                success: '#05CD99',
                warning: '#FFB547',
                danger: '#EE5D50',
                info: '#11CDEF',
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'], // Modern geometric sans
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'neumorph': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
                'neumorph-inset': 'inset 20px 20px 60px #d9d9d9, inset -20px -20px 60px #ffffff',
                'glow': '0 0 20px rgba(67, 24, 255, 0.5)',
            },
            backgroundImage: {
                'mesh-gradient': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
            }
        },
    },
    plugins: [],
}

