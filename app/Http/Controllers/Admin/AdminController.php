<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
        ];

        return view('admin.index')->with(compact('TreeSnap'));
    }
}
