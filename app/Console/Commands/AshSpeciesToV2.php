<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Observation;

class AshSpeciesToV2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observation:ash-update-species-and-location';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update all Ash observations to include ashSpeciesV2 and ashLocationCharacterirstics';
    
    /**
     * Execute the console command.
     */
    public function handle()
    {        
        $this->ashSpeciesToAshSpeciesV2();
        $this->locationToAshLocation();
    }

    public function ashSpeciesToAshSpeciesV2()
    {
        //for each observation
        Observation::where("observation_category", 'Ash')
            //200 observations at a time
            ->chunk(200, function ($observations) {              

                $i = 0;

                foreach ($observations as $observation) {

                    //...if ashSpecies is set and ashSpeciesV2 isn't set, add the new field to data
                    if(isset($observation->data['ashSpecies']) && !isset($observation->data['ashSpeciesV2'])){
                        if($observation->data['ashSpecies'] == 'White ash'){
                            $ashSpeciesV2 = array(
                                'ashSpeciesV2' => 'White ash (Fraxinus americana)',
                            );
                            $observation->data = array_merge($observation->data, $ashSpeciesV2);
                            $observation->save();

                        }
                        else if($observation->data['ashSpecies'] == 'Green ash'){
                            $ashSpeciesV2 = array(
                                'ashSpeciesV2' => 'Green ash (F. pennsylvanica)',
                            );
                            $observation->data = array_merge($observation->data, $ashSpeciesV2);
                            $observation->save();

                        }
                        else if($observation->data['ashSpecies'] == 'Blue ash'){
                            $ashSpeciesV2 = array(
                                'ashSpeciesV2' => 'Blue ash (F. nigra)',
                            );
                            $observation->data = array_merge($observation->data, $ashSpeciesV2);
                            $observation->save();

                        }
                        else if($observation->data['ashSpecies'] == 'Black ash'){
                            $ashSpeciesV2 = array(
                                'ashSpeciesV2' => 'Black ash (F. quadrangulata)',
                            );
                            $observation->data = array_merge($observation->data, $ashSpeciesV2);
                            $observation->save();

                        }
                        else if($observation->data['ashSpecies'] == 'Uncertain'){
                            $ashSpeciesV2 = array(
                                'ashSpeciesV2' => 'Not sure if this is ash',
                            );
                            $observation->data = array_merge($observation->data, $ashSpeciesV2);
                            $observation->save();

                        }

                        $i++;
                    }
                }
                if($i==0){
                    $this->info($i.' entries has been updated. (Ash Species)');
                }
                else if($i==1){
                    $this->info($i.' entry has been updated. (Ash Species)');
                }
                else{
                    $this->info($i.' entries have been updated. (Ash Species)');
                }
                
            });
    }
    public function locationToAshLocation()
    {
        //for each observation
        Observation::where("observation_category", 'Ash')
            //200 observations at a time
            ->chunk(200, function ($observations) {              

                $i = 0;

                foreach ($observations as $observation) {

                    //...if locationCharacteristics is set, add the new field to data with same response
                    if(isset($observation->data['locationCharacteristics']) && !isset($observation->data['ashLocationCharacteristics'])){
                       
                        $ashLocationCharacteristics = array(
                            'ashLocationCharacteristics' => $observation->data['locationCharacteristics'],
                        );
                        $observation->data = array_merge($observation->data, $ashLocationCharacteristics);
                        $observation->save();

                        $i++;
                    }
                }

                if($i==0){
                    $this->info($i.' entries has been updated. (Location Characteristics)');
                }
                else if($i==1){
                    $this->info($i.' entry has been updated. (Location Characteristics)');
                }
                else{
                    $this->info($i.' entries have been updated. (Location Characteristics)');
                }
                
            });
    }
}
