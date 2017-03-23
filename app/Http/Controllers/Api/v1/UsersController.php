<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\v1\Responds;

class UsersController extends Controller
{
    use Responds;

    public function show(Request $request)
    {
        $user = $request->user();
        return $this->success([
          'id' => $user->id,
          'name' => $user->name,
          'is_over_thirteen' => $user->is_over_thirteen,
          'zipcode' => $user->zipcode,
          'email' => $user->email,
          'is_anonymous' => $user->is_anonymous,
        ]);
    }

    public function create(Request $request)
    {
    }

    public function update(Request $request)
    {
    }
}
