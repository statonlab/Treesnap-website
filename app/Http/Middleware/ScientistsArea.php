<?php

namespace App\Http\Middleware;

use Closure;

class ScientistsArea
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();

        if (! $user) {
            return redirect('/login');
        }

        if (! $user->isAdmin() && ! $user->isScientist()) {
            return abort(401, 'Unauthorized');
        }

        return $next($request);
    }
}
