<?php

namespace App\Console;

use App\Console\Commands\CreateObservationThumbnails;
use App\Console\Commands\DeleteOldDownloadableFiles;
use App\Console\Commands\ImageFixOrientation;
use App\Console\Commands\PopulateAddresses;
use App\Console\Commands\SendFilterNotifications;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('notify:filters')->dailyAt('08:00');
        $schedule->command('files:flush-old')->hourly();
        $schedule->command('address:get')->dailyAt('01:00');
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
