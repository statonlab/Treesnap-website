<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\UnitsConverter;
use App\Services\AttachUnits;
use App\Observation;

class ObservationsAttachUnits extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observations:attach-units';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Attaches units to all existing observations.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $converter = new UnitsConverter();
        $attach = new AttachUnits();

        $observations = 0;

        Observation::chunk(500, function ($observations) use ($converter, $attach) {
            /** @var \App\Observation $observation */
            foreach ($observations as $observation) {
                $observation = $attach->attach($observation);
                $observation->save();
                $observations++;
            }
        });

        $this->info("Attached units to $observations observations.");
    }
}
