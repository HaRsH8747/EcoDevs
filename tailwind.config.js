const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT(
  {
    content: [
      'node_modules/flowbite-react/lib/esm/**/*.js',
      './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          'custom-orange': '#ffa500',
          'custom-purple': '##b08bf8',
        },
      },
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
)