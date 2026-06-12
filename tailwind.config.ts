import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ash-white': 'var(--ash-white)',
        'ash-off-white': 'var(--ash-off-white)',
        'ash-fog': 'var(--ash-fog)',
        'ash-slate': 'var(--ash-slate)',
      },
    },
  },
  plugins: [],
};

export default config;
