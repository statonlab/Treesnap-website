<?php

namespace App\Console\Commands;

use App\Observation;
use Illuminate\Console\Command;

class RemoveDuplicaetObservationsCommand extends Command
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

        foreach ($duplicates as $duplicate) {
            $observations = Observation::where([
                'user_id' => $duplicate->user_id,
                'mobile_id' => $duplicate->mobile_id
            ])->orderBy('created_at', 'desc')->get();
            echo "==== To Keep ====\n";
            $observation_to_keep = $observations->shift();
            dump(['name' => $observation_to_keep->observation_category, 'date' => $observation_to_keep->created_at]);
            echo "==== To Delete ====\n";
            dump($observations->map(function($f) {
                return $f->observation_category;
            })->toArray());
        }
    }
}
