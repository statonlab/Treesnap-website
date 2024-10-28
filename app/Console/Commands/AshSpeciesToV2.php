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
    protected $signature = 'observation:ash-species-to-v2';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update all Ash observations to include ashSpeciesV2';
    protected $updatedDescription = '';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // update observations to include ashSpeciesV2
        $this->ashSpeciesToAshSpeciesV2();
    }

    public function ashSpeciesToAshSpeciesV2()
    {
        //for each observation
        Observation::where("observation_category", 'Ash')
            //200 observations at a time
            ->chunk(200, function ($observations) use ($updatedDescription){
                
                

                $i = 0;
                foreach ($observations as $observation) {

                    //...if ashSpecies is set and ashSpeciesV2 isn't set, add the new field to data
                    if(isset($observation->data['ashSpecies']) && !isset($observation->data['ashSpeciesV2'])){
                        if($observation->data['ashSpecies'] == 'White ash'){
                            $updatedDescription = 'White ash (Fraxinus americana)';
                        }
                        else if($observation->data['ashSpecies'] == 'Green ash'){
                            $updatedDescription = 'Green ash (F. pennsylvanica)';

                        }
                        else if($observation->data['ashSpecies'] == 'Blue ash'){
                            $updatedDescription = 'Blue ash (F. nigra)';

                        }
                        else if($observation->data['ashSpecies'] == 'Black ash'){
                            $updatedDescription = 'Black ash (F. quadrangulata)';

                        }
                        else if($observation->data['ashSpecies'] == 'Uncertain'){
                            $updatedDescription = 'Not sure if this is ash';

                        }

                        $ashSpeciesV2 = array(
                            'ashSpeciesV2' => $updatedDescription,
                        );
                        $observation->data = array_merge($observation->data, $ashSpeciesV2);

                        $i++;
                    }
                    // else if(isset($observation->data['ashSpecies']) && isset($observation->data['ashSpeciesV2'])){
                    //     if($observation->data['ashSpecies'] == 'White ash'){
                    //         $updatedDescription = 'White ash (Fraxinus americana)';
                    //     }
                    //     else if($observation->data['ashSpecies'] == 'Green ash'){
                    //         $updatedDescription = 'Green ash (F. pennsylvanica)';

                    //     }
                    //     else if($observation->data['ashSpecies'] == 'Blue ash'){
                    //         $updatedDescription = 'Blue ash (F. nigra)';

                    //     }
                    //     else if($observation->data['ashSpecies'] == 'Black ash'){
                    //         $updatedDescription = 'Black ash (F. quadrangulata)';

                    //     }
                    //     else if($observation->data['ashSpecies'] == 'Uncertain'){
                    //         $updatedDescription = 'Not sure if this is ash';

                    //     }

                    //     $ashSpeciesV2 = array(
                    //         "ashSpeciesV2" => $updatedDescription,
                    //     );

                    //     $observationToUpdate = Observation::where('id', $observation->id)->first();

                    //     dd($observationToUpdate);
                    //     $i++;
                    // }
                }
                if($i==0){
                    $this->info($i.' entries has been updated.');
                }
                else if($i==1){
                    $this->info($i.' entry has been updated.');
                }
                else{
                    $this->info($i.' entries have been updated.');
                }
                
            });
    }
}
