<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Responds;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    use Responds;

    /**
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::select([
            'users.id',
            'users.name',
            'email',
            'is_over_thirteen',
            'class',
            'zipcode',
            'is_anonymous',
            'is_admin',
            'role_id',
            DB::raw('(SELECT COUNT(id) FROM observations WHERE users.id=observations.user_id) as observations'),
        ])->join('roles', 'roles.id', '=', 'users.role_id')->get();

        return $this->success($users);
    }

    public function show($id)
    {
        $user = User::with(['observations', 'groups', 'role'])->findOrFail($id);

        return $this->success($user);
    }

    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);

        $rules = [];
        if ($request->email != $user->email) {
            $rules['email'] = 'required|email|unique:users';
        }

        $this->validate($request, array_merge([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email',
            'class' => 'required|min:3|max:50',
            'is_anonymous' => 'required|boolean',
            'is_over_thirteen' => 'required|boolean',
            'groups.*' => 'nullable|exists:groups,id',
            'role' => 'required|exists:roles,id',
            'zipcode' => [
                'nullable',
                'min:5',
                'max:10',
                'regex:/^([0-9]{5})(-[0-9]{4})?$/i',
            ],
        ], $rules));

        $user->fill([
            'name' => $request->name,
            'role_id' => $request->role,
            'email' => $request->email,
            'class' => $request->class,
            'is_anonymous' => $request->is_anonymous,
            'is_over_thirteen' => $request->is_over_thirteen,
            'zipcode' => $request->zipcode,
        ])->save();

        $user->groups()->sync($request->groups);

        return $this->created([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_over_thirteen' => $user->is_over_thirteen,
            'class' => $user->class,
            'zipcode' => $user->zipcode,
            'is_admin' => $user->role->is_admin,
        ]);
    }
}
