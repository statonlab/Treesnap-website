<?php

namespace App\Console\Commands;

use App\Observation;
use Illuminate\Console\Command;

class UpdateOldHemlockAnswers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observation:update-hemlock-answers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates old answers to the Hemlock survey';

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
     * @return int
     */
    public function handle()
    {

        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->collectionPurpose", "Landscape Genomics project")
            ->chunk(200, function ($observations) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data['collectionPurpose'] = "Landscape Genomics project with University of Connecticut";
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: Landscape Genomics project -> Landscape Genomics project with University of Connecticut");
            });

        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->collectionPurpose", "Other research project")
            ->chunk(200, function ($observations) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data['collectionPurpose'] = "Other Research Project";
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: Other research project -> Other Research Project");
            });

        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->collectionPurpose", "No = 0% infested")
            ->chunk(200, function ($observations) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data['collectionPurpose'] = "No HWA present";
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: No = 0% infested -> No HWA present");
            });

        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->collectionPurpose", "No = 0% infested")
            ->chunk(200, function ($observations) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data['collectionPurpose'] = "No EHS present";
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: No = 0% infested -> No EHS present");
            });

        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->collectionPurpose", "Medium (>30% - < 70% canopy closure, patches of light would reach the lingering tree’s foliage in the summer)")
            ->chunk(200, function ($observations) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data['collectionPurpose'] = "Medium (>30% to < 70% canopy closure, patches of light would reach the lingering tree’s foliage in the summer)";
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: Medium (>30% - < 70% canopy closure, patches of light would reach the lingering tree’s foliage in the summer) -> Medium (>30% to < 70% canopy closure, patches of light would reach the lingering tree’s foliage in the summer)");
            });

        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->collectionPurpose", "Branch tips are healthy, with green new growth present")
            ->chunk(200, function ($observations) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data['collectionPurpose'] = "Branch tips are healthy with green needles";
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: Branch tips are healthy, with green new growth present -> Branch tips are healthy with green needles");
            });

        $this->info('Hemlock observations updated successfully');

        return 0;
    }
}
