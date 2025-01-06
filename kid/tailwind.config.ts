import type { Config } from 'tailwindcss';

const colors = {
  'bright-pink-50': '#fef1f6',
  'bright-pink-500': '#f83C80',
  'bright-pink-600': '#e81a5a',
  'leaf-green-50': '#f1fce9',
  'leaf-green-100': '#dff7d0',
  'leaf-green-400': '#40941c',
  'leaf-green-700': '#32711a',
  'regent-gray-50': '#fafafb',
  'regent-gray-100': '#edeeef',
  'regent-gray-200': '#d9dbdd',
  'regent-gray-400': '#a4aaae',
  'regent-gray-500': '#8b9298',
  'regent-gray-600': '#767f86',
  'regent-gray-700': '#505b64',
  'regent-gray-900': '#23313c',
  'regent-gray-950': '#02121f',
  'sky-blue-50': '#eff9ff',
  'sky-blue-100': '#dff1ff',
  'sky-blue-400': '#48c2ff',
  'sky-blue-500': '#0391dd',
  'sky-blue-600': '#0073b8',
  'sky-blue-700': '#0067a7',
  'sky-blue-900': '#084872',
  'energetic-red-50': '#fff3f1',
  'energetic-red-200': '#ffcdc5',
  'energetic-red-600': '#ec3416',
  'energetic-red-700': '#c7280e',
};

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
        'noto-sans-jp': ['"Noto Sans JP"', 'sans-serif'],
      },
      fontSize: {
        'one-line14': ['14px', { lineHeight: '14px' }],
        'one-line14B': ['14px', { lineHeight: '14px', fontWeight: 700 }],
        'one-line16': ['16px', { lineHeight: '16px' }],
        body14: ['14px', { lineHeight: '20px' }],
        body14B: ['14px', { lineHeight: '20px', fontWeight: 700 }],
        body16: ['16px', { lineHeight: '24px' }],
        body16B: ['16px', { lineHeight: '24px', fontWeight: 700 }],
        heading16B: ['16px', { lineHeight: '20px', fontWeight: 700 }],
        heading20B: ['20px', { lineHeight: '28px', fontWeight: 700 }],
        heading24B: ['24px', { lineHeight: '32px', fontWeight: 700 }],
        heading30B: ['30px', { lineHeight: '36px', fontWeight: 700 }],
      },
      colors: {
        ...colors,
        primary: colors['sky-blue-500'],
        error: colors['energetic-red-600'],
        success: colors['leaf-green-400'],
        'color-border': colors['regent-gray-200'],
        'color-text': colors['regent-gray-950'],
        'color-text-muted': colors['regent-gray-700'],
        'color-icon': colors['regent-gray-900'],
      },
      zIndex: {
        fullScreenLoader: '2000',
        modal: '1999',
        'modal-backdrop': '1998',
      },
      boxShadow: {
        popper: '0px 2px 4px -2px #0000001a, 0px 4px 6px -1px #0000001a',
      },
    },
  },
  plugins: [],
};
export default config;
