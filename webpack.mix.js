const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Watch configuration
mix.browserSync({
  proxy: 'treesnap.test',
  port : 3000,
  files: [
    'resources/assets/sass/**/*.scss',
    'resources/assets/js/**/*.js',
    'app/**/*.php',
    'public/js/**/*.js',
    'public/css/**/*.css'
  ]
})

// Webpack code splitting config
mix.webpackConfig({
  output: {
    publicPath   : '/',
    // chunkFilename: 'js/[name].[chunkhash].js',
    chunkFilename: `js/[name]${mix.inProduction() ? '.[chunkhash].js' : '.js'}`
  }
})

// JS and CSS configuration
mix.react('resources/assets/js/app.jsx', 'public/js')
  .react('resources/assets/js/admin/admin.jsx', 'public/js/admin.js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .extract(['react', 'lodash', 'axios', 'moment'])

if (mix.inProduction()) {
  mix.version()
}
