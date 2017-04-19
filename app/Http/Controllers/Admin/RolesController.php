<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Responds;
use App\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RolesController extends Controller
{
    use Responds;

    public function index()
    {
        return $this->success(Role::select(['id', 'name', 'is_admin'])->get());
    }
}
