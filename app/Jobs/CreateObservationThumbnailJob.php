<?php

namespace App\Jobs;

use App\Observation;
use App\Services\Thumbnail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateObservationThumbnailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var \App\Observation
     */
    protected $observation;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Observation $observation)
    {
        $this->observation = $observation;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $observation = $this->observation;
        $thumbnail = new Thumbnail($observation);
        $observation->thumbnail = $thumbnail->make();
        $observation->save();
    }
}
