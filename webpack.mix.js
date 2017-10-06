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
mix.browserSync('treesnap.app')

mix.react('resources/assets/js/app.jsx', 'public/js')
  .react('resources/assets/js/admin/admin.jsx', 'public/js/admin.js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .extract(['react', 'react-dom', 'jquery', 'react-router-dom', 'lodash', 'axios'])
  .version()
