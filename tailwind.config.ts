import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blueGray: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        primaryBlue: '#3D47E8',
      },
      fontSize: {
        xxs: '0.625rem',
      },
      boxShadow: {
        default: '0px 2px 8px 0px rgba(30, 41, 59, 0.06)',
      },
    },
  },
  plugins: [],
}
export default config
