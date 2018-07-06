<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\MetaLabels;

class AdminController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $TreeSnap = [
            'csrfToken' => csrf_token(),
            'loggedIn' => $user ? true : false,
            'isAdmin' => $user->isAdmin(),
            'isScientist' => $user->isScientist(),
            'role' => $user->role->name,
            'units' => $user->units,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'metaLabels' => (new MetaLabels())->toObject(),
        ];

        return view('admin.index')->with(compact('TreeSnap'));
    }
}
