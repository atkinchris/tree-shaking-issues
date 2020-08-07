const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    react: 'react',
    recompose: 'recompose',
  },
  // optimization: {
  //   concatenateModules: false,
  //   minimize: false,
  //   usedExports: true,
  // }
}
