const {mix} = require('laravel-mix')

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
    .react('resources/assets/js/scenes/ObservationScene.jsx', 'public/js/observation.js')
    .react('resources/assets/js/landing.jsx', 'public/js/landing.js')
    .react('resources/assets/js/admin/admin.jsx', 'public/js/admin.js')
    .react('resources/assets/js/welcome.jsx', 'public/js/welcome.js')
    .sass('resources/assets/sass/app.scss', 'public/css')

if (mix.config.inProduction) {
    mix.version()
}