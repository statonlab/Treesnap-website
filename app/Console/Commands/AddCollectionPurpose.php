<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Observation;


class AddCollectionPurpose extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observation:add-collection-purpose {category}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add collectionPurpose to older observations.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // update observations to include collectionPurpose
        $category = $this->argument('category');
        $this->addCollectionPurpose($category);
    }
    
    public function addCollectionPurpose($category)
    {
        $categories = Observation::select('observation_category')->distinct()->get();
        if(!$categories->contains('observation_category',$category)){
            $this->info("Invalid category/species.\r\nNo changes made.");
        }
        //for each observation
        Observation::where("observation_category", $category)
            //200 observations at a time
            ->chunk(200, function ($observations) use ($category) {
                
                $collectionPurpose = array(
                    "collectionPurpose" => "Not Available",
                );
                $ashCollectionPurpose = array(
                    "ashCollectionPurpose" => "Not Available",
                );
                $i = 0;
                foreach ($observations as $observation) {
                    //...if collectionPurpose isn't set, add that field to data
                    if(!isset($observation->data['collectionPurpose']) && $category !== 'Ash'){
                        $i++;
                        $observation->data = array_merge($observation->data, $collectionPurpose);
                        $observation->save();
                    }
                    //...if ashCollectionPurpose isn't set, add that field to data
                    elseif(!isset($observation->data['ashCollectionPurpose']) && $category == 'Ash'){
                        $i++;
                        $observation->data = array_merge($observation->data, $ashCollectionPurpose);
                        $observation->save();
                    }
                }
                $this->info($category);
                if($i==1){
                    $this->info($i.' entry has been updated.');
                }
                else{
                    $this->info($i.' entries have been updated.');
                }
                
            });
    }
}
