module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('@tailwindcss/postcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
}
