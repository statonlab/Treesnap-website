<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class GroupsController extends Controller
{
    use Responds;

    /**
     * Get list of groups.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->success(Group::select([
            'id',
            'name',
            'created_at',
            DB::raw('(SELECT COUNT(*) FROM group_user WHERE groups.id=group_user.group_id) as users')
        ])->get());
    }

    /**
     * Create a new group.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3|max:255',
        ]);

        $group = Group::create([
            'name' => $request->name,
        ]);

        return $this->created($group);
    }
}
