<?php

namespace App\Providers;

use App\Action;
use App\Filter;
use App\Policies\ActionsPolicy;
use App\Policies\FiltersPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Filter::class => FiltersPolicy::class,
        Action::class => ActionsPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
