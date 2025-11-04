/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        border: 'var(--border)'
      },
      borderRadius: {
        xl: '16px'
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,.25)'
      }
    }
  },
  plugins: [],
}



