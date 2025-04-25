const path = require('path');

module.exports = {
  inputDir: './src/incontrol-icons/source/',
  outputDir: './src/incontrol-icons/',
  fontTypes: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  assetTypes: ['css', 'html'],
  name: 'incontrol-icons',
  prefix: 'icon',
  codepoints: require('./src/incontrol-icons/codepoints.json'),
  normalize: true,
};