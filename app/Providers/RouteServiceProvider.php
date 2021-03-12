<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        Route::pattern('limit', '[0-9]+');

        $routes = [
            'account',
            'account/observations',
            'account/collections',
            'account/groups',
            'account/group/([0-9]+)',
            'account/filters',
            'observation/([0-9]+)',
            'map',
            'contact',
            'developer',
            'about',
            'privacy-policy',
            'terms-of-use',
            'faq',
            'trees',
            'partners',
            'events',
            'users',
            'user/([0-9]+)',
            'filters',
            'groups',
            'group/([0-9]+)',
            'collections',
            'observations',
            'curate',
            'notifications',
            'flags',
            'observations-by-state',
            '404',
            '500',
            'scientific-sampling',
            'scientific-sampling/([0-9]+)',
        ];
        $pattern = implode('|', $routes);
        Route::pattern('react', "$pattern");

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebServicesRoutes();

        $this->mapWebRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }

    /**
     * Define the "web-services" routes for the application.
     *
     * There routes are typically stateless.
     *
     * @return void
     */
    protected function mapWebServicesRoutes()
    {
        Route::prefix('web-services')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/web-services.php'));
    }
}
