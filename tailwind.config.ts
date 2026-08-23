import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-2': 'var(--color-ink-2)',
        paper: 'var(--color-paper)',
        'paper-dim': 'var(--color-paper-dim)',
        grey: 'var(--color-grey)',
        line: 'var(--color-line)',
        signal: 'var(--signal)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)'],
        body: ['var(--font-space-grotesk)'],
        mono: ['var(--font-space-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
