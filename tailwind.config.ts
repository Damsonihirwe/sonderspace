import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0a',
        'ink-2': '#141412',
        paper: '#ece8e1',
        'paper-dim': '#c9c4ba',
        grey: '#79766f',
        line: '#2a2a26',
        signal: '#e1402c',
      },
      fontFamily: {
        display: ['var(--font-anton)'],
        body: ['var(--font-space-grotesk)'],
        mono: ['var(--font-space-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
