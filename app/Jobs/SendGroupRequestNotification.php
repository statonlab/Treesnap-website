<?php

namespace App\Jobs;

use App\GroupRequest;
use App\Notifications\GroupRequestNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendGroupRequestNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The group request.
     *
     * @var \App\GroupRequest
     */
    protected $group_request;

    /**
     * Create a new job instance.
     *
     * @param \App\GroupRequest $group_request
     * @return void
     */
    public function __construct($group_request)
    {
        $this->group_request = $group_request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Refresh the group request data from the db
        $request = GroupRequest::find($this->group_request->id);
        if ($request && ! $request->withdrawn && ! $request->notification_sent) {
            $request->group->owner->notify(new GroupRequestNotification($request));
            $request->fill([
                'notification_sent' => true,
            ])->save();
        }
    }
}
