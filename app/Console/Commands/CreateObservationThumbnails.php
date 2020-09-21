<?php

namespace App\Console\Commands;

use App\Observation;
use App\Services\Thumbnail;
use Illuminate\Console\Command;

class CreateObservationThumbnails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observation:thumbnails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create thumbnails for observations';

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
        Observation::chunk(200, function ($observations) {
            foreach ($observations as $observation) {
                $thumbnail = new Thumbnail($observation);
                $observation->thumbnail = $thumbnail->make();
                $observation->save();
            }
        });

        $this->info('Thumbnails created successfully');

        return 0;
    }
}
