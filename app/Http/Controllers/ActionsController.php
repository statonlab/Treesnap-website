<?php

namespace App\Http\Controllers;

use App\Action;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;

class ActionsController extends Controller
{
    use Responds;

    /**
     * Show an action's details.
     *
     * @param \App\Action $action
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Action $action) {
        $this->authorize('view', $action);

        return $this->success($action);
    }

    /**
     * Delete an action.
     *
     * @param \App\Action $action
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Action $action) {
        $this->authorize('delete', $action);

        $action->delete();
        return $this->created('Action deleted successfully.');
    }
}
