<?php

namespace App\Http\Controllers;

use App\Services\Geocoder;
use Faker\Generator;
use Illuminate\Http\Request;
use App\User;
use App\Services\MetaLabels;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->check() ? auth()->user() : false;

        $TreeSnap = [
            'csrfToken' => csrf_token(),
            'loggedIn' => $user ? true : false,
            'role' => $user ? $user->role->name : null,
            'user' => false,
            'metaLabels' => (new MetaLabels())->toObject(),
        ];

        if ($user) {
            $TreeSnap['user'] = [
                'name' => $user->name,
                'id' => $user->id,
            ];
        }

        return view('home')->with(compact('TreeSnap'));
    }
}
