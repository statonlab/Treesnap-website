<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

class VersionController extends Controller
{
    /**
     * Get the current version of the mobile application.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'version' => env('MOBILE_APP_VERSION', '1.21.0'),
        ], 200);
    }
}
