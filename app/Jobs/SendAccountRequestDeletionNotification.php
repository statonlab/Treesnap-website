<?php

namespace App\Jobs;

use App\DeleteAccountRequest;
use App\Notifications\AccountDeleteRequestNotification;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendAccountRequestDeletionNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(protected DeleteAccountRequest $request)
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     * @throws \Throwable
     */
    public function handle(): void
    {
        if (DeleteAccountRequest::where('created_at', '>=', now()->subDay())
            ->where('user_id', $this->request->user_id)
            ->exists()) {
            return;
        }

        User::whereHas('roles', function ($query) {
            $query->where('is_admin', true);
        })->get()->map(function (User $user) {
            $user->notify(new AccountDeleteRequestNotification($this->request));
        });
    }
}
