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
    protected $signature = 'address:get {-o|--observation=}';

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
        $observation = Observation::findOrFail($this->option('observation'));
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
