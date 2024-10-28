<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AshSpeciesToV2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:ash-species-to-v2';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
    public function ashSpeciesToAshSpeciesV2()
    {
        //for each observation
        Observation::where("observation_category", 'Ash')
            //200 observations at a time
            ->chunk(200, function ($observations) {
                
                $ashSpeciesV2 = array(
                    "ashSpeciesV2" => "Not Available",
                );
                
                $i = 0;
                foreach ($observations as $observation) {

                    //...if ashSpecies isn't set, add that field to data
                    if(!isset($observation->data['ashSpeciesV2'])){
                        $observation->data = array_merge($observation->data, $ashSpeciesV2);
                        $observation->save();
                        $i++;
                    } else{
                        $this->info($observation->data['ashSpeciesV2']);
                    }
                }

                if($i==1){
                    $this->info($i.' entry has been updated.');
                }
                else{
                    $this->info($i.' entries have been updated.');
                }
                
            });
    }
}
