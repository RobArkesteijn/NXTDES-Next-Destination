import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
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
        'copper': {
          50: '#f8f4ee',
          100: '#efe3d2',
          200: '#e0c7a8',
          300: '#cea476',
          400: '#bf8550',
          500: '#b17343',
          600: '#975937',
          700: '#79432f',
          800: '#66392d',
          900: '#58322b',
          950: '#321916',
        },
        'teak': {
          50: '#f6f5f0',
          100: '#eae6d7',
          200: '#d6ceb2',
          300: '#beaf86',
          400: '#ac9665',
          500: '#9c8356',
          600: '#866b48',
          700: '#6c533c',
          800: '#5c4737',
          900: '#503e33',
          950: '#2d211b',
        },
        'shark': {
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
        'scarpa-flow': {
          50: '#f6f6f8',
          100: '#ebeaef',
          200: '#dcdae3',
          300: '#c4c1cf',
          400: '#a8a3b7',
          500: '#938ca5',
          600: '#857b95',
          700: '#786e87',
          800: '#665d70',
          900: '#524c5a',
          950: '#35313a',
        },
      },
      fontFamily: {
        brixton: ['Brixton', 'Brixton fallback', ...defaultTheme.fontFamily.sans],
        thermite: ['Thermite', 'Thermite fallback', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
