<?php

namespace App\Http\Controllers\Admin;

use App\Flag;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FlagsController extends Controller
{
    use Responds;

    /**
     * List flags.
     * Accessible to admins only.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'per_page' => 'nullable|in:6,12,24,48',
            'page' => 'nullable|integer',
        ]);

        $flags = Flag::with([
            'observation' => function ($query) {
                $query->with('user');
            },
            'user' => function ($query) {
                $query->select(['id', 'name', 'email', 'created_at', 'updated_at']);
            },
        ])->paginate($request->per_page ?: 10);

        return $this->success($flags);
    }
}
