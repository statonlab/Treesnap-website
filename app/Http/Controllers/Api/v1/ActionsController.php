<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Action;

class ActionsController extends Controller
{
    use Responds;

    /**
     * Get all actions related to the authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $actions = $user->actions()->where('completed', false)->orderBy('id', 'asc')->get();

        return $this->success($actions);
    }

    /**
     * Mark an action as completed.
     *
     * @param \App\Action $action
     * @return \Illuminate\Http\JsonResponse
     */
    public function completed(Action $action)
    {
        $this->authorize('update', $action);

        $action->completed = true;
        $action->save();

        return $this->success('Action has been marked as completed successfully.');
    }
}
