import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        shark: {
          50: '#f5f6f6',
          100: '#e4e9e9',
          200: '#ccd5d3',
          300: '#a9b7b4',
          400: '#7e928e',
          500: '#637774',
          600: '#556665',
          700: '#495655',
          800: '#404a49',
          900: '#394040',
          950: '#232929',
        },

        'boston-blue': {
          50: '#f1f9fa',
          100: '#dbedf2',
          200: '#bcdce5',
          300: '#8dc3d3',
          400: '#57a0b9',
          500: '#4394b1',
          600: '#346c86',
          700: '#305a6e',
          800: '#2e4c5c',
          900: '#2a414f',
          950: '#182934',
        },
      },
      fontFamily: {
        thermite: ['Thermite', 'Thermite fallback', ...defaultTheme.fontFamily.sans],
        brixton: ['Brixton', 'Brixton fallback', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
