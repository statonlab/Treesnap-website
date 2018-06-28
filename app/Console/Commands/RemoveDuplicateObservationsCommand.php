<?php

namespace App\Console\Commands;

use App\Observation;
use Illuminate\Console\Command;

class RemoveDuplicateObservationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observations:flush-duplicates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Removes duplicate observations from the database. Note that this will keep the most recent observation only.';

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
     * @return mixed
     */
    public function handle()
    {
        $sql = 'SELECT mobile_id, user_id 
                  FROM observations 
                  WHERE mobile_id IN (
                      SELECT mobile_id
                        FROM observations
                        GROUP BY mobile_id
                        HAVING COUNT(*) > 1
                  )';
        $duplicates = collect(\DB::select(\DB::raw($sql)));

        $duplicates = $duplicates->unique(function ($observation) {
            return "{$observation->user_id}-{$observation->mobile_id}";
        });

        $count = $duplicates->count();
        $deleted = 0;

        $this->line("Found $count duplicate entries.");

        foreach ($duplicates as $duplicate) {
            $observations = Observation::where([
                'user_id' => $duplicate->user_id,
                'mobile_id' => $duplicate->mobile_id,
            ])->orderBy('created_at', 'desc')->get();
            $observations->shift();
            foreach ($observations as $observation) {
                $deleted++;
                $observation->delete();
            }
        }

        $this->info("Deleted $deleted duplicate observation(s)");
    }
}
