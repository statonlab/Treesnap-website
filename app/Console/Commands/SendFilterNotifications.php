<?php

namespace App\Console\Commands;

use App\Filter;
use App\Mail\FilterNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendFilterNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:filters {--print}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify users of new observations that match their filters';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        // Get all filters that are notifiable and last notified was 3 days ago.
        Filter::notifiable()->chunk(200, function ($filters) {
            $count = $filters->count();
            $this->say("Processing {$count} filters.");

            foreach ($filters as $filter) {
                if (empty($filter->notifications_sent_at)) {
                    $filter->notifications_sent_at = Carbon::now();
                    $filter->save();
                }

                // make sure we didn't recently notify the user
                // of new observations (once every 2 days)
                if ($filter->notifications_sent_at->addDays(2)
                    ->greaterThan(Carbon::now())) {
                    $date = $filter->notifications_sent_at->diffForHumans();
                    $this->say("Ignoring '{$filter->name}' because a notification was sent {$date}");
                    continue;
                }

                $this->send($filter);
            }
        });

        return 0;
    }

    /**
     * Send the notifications.
     *
     * @param \App\Filter $filter
     */
    protected function send(Filter $filter)
    {
        $user = $filter->user;

        // if this is broken, it may need json_encode($filter, true) first
        $observations = Filter::apply($filter->rules)
            ->where('observations.created_at', '>', $filter->notifications_sent_at)
            ->where('observations.user_id', '!=', $user->id)
            ->orderBy('collection_date', 'desc')
            ->paginate(4);
        $total = $observations->total();
        if ($total === 0) {
            $this->say("Ignoring '{$filter->name}' because there are 0 observations that fit the criteria");

            return;
        }

        Mail::queue(new FilterNotification($user, $observations, $total, $filter));

        $this->say("Notification for {$filter->name} has been queued.");

        $filter->notifications_sent_at = Carbon::now();
        $filter->save();
    }

    /**
     * Print message if the print option is selected.
     *
     * @param $line
     */
    protected function say($line)
    {
        if (intval($this->option('print')) !== 0) {
            $this->line($line);
        }
    }
}
