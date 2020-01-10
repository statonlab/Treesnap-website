<?php

namespace App\Console\Commands;

use App\Observation;
use App\Services\Geocoder;
use Illuminate\Console\Command;

class AttachAddressToObservationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observation:add-address {observation_id=-1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Given an observation ID, update the address attached to it.';

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
        $observation_id = $this->argument('observation_id');

        if ($observation_id != -1) {
            $observation = Observation::findOrFail($observation_id);

            return $this->fixObservation($observation);
        }

        Observation::whereColumn('created_at', '!=', 'updated_at')
            ->where('location_accuracy', -2)
            ->chunk(10, function ($observations) {
                foreach ($observations as $observation) {
                    $this->fixObservation($observations);
                }

                // Sleep every 10 requests to make sure the API doesn't throttle us
                sleep(.5);
            });

        return 1;
    }

    /**
     * @param \App\Observation $observation
     * @return int
     */
    protected function fixObservation(Observation $observation)
    {
        $address = Geocoder::address($observation->latitude, $observation->longitude);
        if (! $address) {
            $this->error('Unable to update address.');

            return 1;
        }

        $observation->fill([
            'address' => [
                'components' => $address->results[0]->address_components,
                'formatted' => $address->results[0]->formatted_address,
            ],
        ])->save();

        $this->info('Observation address updated: '.$address->results[0]->formatted_address);

        return 0;
    }
}
