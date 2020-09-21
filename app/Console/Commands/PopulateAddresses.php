<?php

namespace App\Console\Commands;

use App\Observation;
use Illuminate\Console\Command;
use App\Services\Geocoder;

class PopulateAddresses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'address:get {-o|--observation=-1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        if (intval($this->option('observation')) !== -1) {
            $observations = [Observation::findOrFail($this->option('observation'))];
        } else {
            $observations = Observation::whereNull('address')->get();
        }

        foreach ($observations as $observation) {
            $this->line($observation->id . ' ' . $observation->observation_category);
            $this->getAddress($observation);
        }

        return 0;
    }

    /**
     * Populate address field.
     *
     * @param $observation
     */
    protected function getAddress($observation)
    {
        $address = Geocoder::address($observation->latitude, $observation->longitude);
        if (! $address) {
            return;
        }

        $observation->fill([
            'address' => [
                'components' => $address->results[0]->address_components,
                'formatted' => $address->results[0]->formatted_address,
            ],
        ])->save();
    }
}
