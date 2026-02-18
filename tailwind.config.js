/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1e2a5a',
                'primary-dark': '#141d42',
                'primary-light': '#2a3a6e',
                accent: '#f5a623',
                'accent-light': '#ffc107',
                bg: '#eef2f7',
                card: '#ffffff',
                sidebar: '#ffffff',
                'sidebar-active': '#1e2a5a',
                text: '#333333',
                'text-light': '#777777',
                'text-muted': '#aaaaaa',
                border: '#e5e9f0',
                success: '#28a745',
                danger: '#dc3545',
                warning: '#ffc107',
                info: '#17a2b8',
                'status-authorized': '#28a745',
                'status-awaiting': '#f5a623',
                'status-revoked': '#dc3545',
                'status-expired': '#e8a050',
                'status-suspended': '#bbb',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
