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
        'ash-white': '#FFFFFF',
        'ash-off-white': '#F5F4F2',
        'ash-fog': '#E8E7E4',
        'ash-slate': '#3A3D42',
      },
    },
  },
  plugins: [],
};

export default config;
