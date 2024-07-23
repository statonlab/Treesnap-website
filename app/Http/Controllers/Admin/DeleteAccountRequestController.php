<?php

namespace App\Http\Controllers\Admin;

use App\DeleteAccountRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Responds;
use App\Jobs\SendAccountRequestDeletionNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeleteAccountRequestController extends Controller
{
    use Responds;

    /**
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', DeleteAccountRequest::class);

        return $this->success(DeleteAccountRequest::orderByDesc('id')->paginate(20));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function myIndex(): JsonResponse
    {
        return $this->success(DeleteAccountRequest::where('user_id', auth()->id())
            ->orderByDesc('id')
            ->paginate(20));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function create(Request $request): JsonResponse
    {
        $this->authorize('create', DeleteAccountRequest::class);

        $deleteAccountRequest = DeleteAccountRequest::create($request->only([
                'reason',
            ]) + [
                'user_id' => $request->user()->id,
            ]);

        dispatch(new SendAccountRequestDeletionNotification($deleteAccountRequest));

        return $this->success($deleteAccountRequest);
    }

    /**
     * @param \App\DeleteAccountRequest $deleteRequest
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function delete(DeleteAccountRequest $deleteRequest): JsonResponse
    {
        $this->authorize('delete', $deleteRequest);

        $deleteRequest->delete();

        return $this->created();
    }
}
