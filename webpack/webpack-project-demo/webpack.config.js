module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    other: './src/multiply.js',
  },
  output: {
    filename: '[name].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
}

// 1. entry index
// 2. entry other
// 3. runtimeChunk: "single"
// 4. splitChunks commons
// 5. splitChunks vendor
