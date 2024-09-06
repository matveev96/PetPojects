const path = require('path');
module.exports = {
  entry: './shelter/pages/main/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};