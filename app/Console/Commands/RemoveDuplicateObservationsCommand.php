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
     * @return void
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

        $deleted = 0;

        foreach ($duplicates as $duplicate) {
            $observations = Observation::where([
                'user_id' => $duplicate->user_id,
                'mobile_id' => $duplicate->mobile_id,
            ])->orderBy('created_at', 'desc')->get();

            /** @var Observation $toKeep */
            $toKeep = $observations->shift();

            foreach ($observations as $observation) {
                if ($observation->observation_category !== $toKeep->observation_category) {
                    continue;
                }

                if($observation->latitude !== $toKeep->latitude || $observation->longitude !== $toKeep->longitude) {
                    continue;
                }

                // Ensure images are not lost
                if ($this->countImages($observation->images) > 0) {
                    $this->mergeImages($toKeep, $observation);
                }

                $deleted++;
                $observation->delete();
            }
        }

        $this->info("Deleted $deleted duplicate observation(s)");
    }

    /**
     * Count number of images.
     *
     * @param array $images
     * @return int
     */
    protected function countImages(array $images)
    {
        $count = 0;

        foreach ($images as $key => $list) {
            $count += count($list);
        }

        return $count;
    }

    /**
     * Merge images of observations.
     *
     * @param Observation $toKeep
     * @param Observation $toDelete
     */
    protected function mergeImages($toKeep, $toDelete)
    {
        $images = $toKeep->images;
        foreach ($toDelete->images as $key => $list) {
            if (! isset($images[$key])) {
                $images[$key] = [];
            }

            $images[$key] = array_unique(array_merge($images[$key], $list));
        }

        $toKeep->images = $images;
        $toKeep->save();
    }
}
