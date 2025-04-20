/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        class: '#8EE26B', // 오전/오후반 태그 색상
        categoryA: '#97DEFF', // 카테고리 A 태그 색상
        categoryB: '#FFACAC', // 카테고리 B 태그 색상
        categoryC: '#FFE69A', // 카테고리 C 태그 색상
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'grid': 'grid-template-columns, grid-template-rows, grid-column, grid-row',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}; 