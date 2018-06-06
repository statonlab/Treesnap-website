<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Responds;
use App\Role;
use App\SubscriptionTopic;
use App\User;
use Illuminate\Http\Request;

class AdminNotificationsController extends Controller
{
    use Responds;

    public function index()
    {
        $topics = SubscriptionTopic::all();
        $admin_role_id = Role::where('name', 'Admin')->first()->id;
        $users = User::with('subscriptionTopics')->where('role_id', $admin_role_id)->get();

        return $this->success([
            'topics' => $topics,
            'users' => $users,
        ]);
    }

    /**
     * Toggle a subscription.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleSubscription(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|integer|exists:users,id',
            'topic_id' => 'required|integer|exists:subscription_topics,id',
        ]);

        $user = User::findOrFail($request->user_id);

        $user->subscriptionTopics()->toggle($request->topic_id);

        return $this->index();
    }
}
