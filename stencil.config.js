const sass = require('@stencil/sass');

exports.config = {
  outputTargets: [{
    type: 'www',
    serviceWorker: {
      swSrc: 'src/sw.js',
      globPatterns: [
        '**/*.{html,js,css,json,ico,png}'
      ]
    }
  }],
  globalStyle: ['src/global/app.css'],
  globalScript: 'src/global/index.ts',
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
