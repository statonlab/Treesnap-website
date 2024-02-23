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
    protected $description = 'Updates old answers to the Hemlock survey to ensure compatibility with updated filters';

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
        // updates prior versions of the hemlock protocol to the final version
        $this->updateField('collectionPurpose',
            'Landscape Genomics project',
            'Landscape Genomics project with University of Connecticut');
        $this->updateField('collectionPurpose',
            'Other research project',
            'Other Research Project');
        $this->updateField('lingeringWoollyAdesCoverage',
            'No = 0% infested',
            'No HWA present');
        $this->updateField('elongateHemlockScaleCoverage',
            'No = 0% infested',
            'No EHS present');
        $this->updateField('recentGrowth',
            'Branch tips are healthy, with green new growth present',
            'Branch tips are healthy with green needles');


        // updates very old HWA answers to work in the new filters

        $this->updateAttributeName('woollyAdesCoverage', 'lingeringWoollyAdesCoverage');
        // updates old woollyAdesCoverage data (now lingeringWoollyAdesCoverage)
        $this->updateField('lingeringWoollyAdesCoverage',
            '75-100%',
            'Yes, H = Heavily infested');
        $this->updateField('lingeringWoollyAdesCoverage',
            '50-74%',
            'Yes, H = Heavily infested');
        $this->updateField('lingeringWoollyAdesCoverage',
            '25-49%',
            'Yes, M = Moderately infested');
        $this->updateField('lingeringWoollyAdesCoverage',
            '1-24%',
            'Yes, L = Lightly infested');
        $this->updateField('lingeringWoollyAdesCoverage',
            '0%',
            'No HWA present');


        $this->updateAttributeName('crownClassification', 'crownPosition');
        // updates very old crownClassification data (now crownPosition)
        $this->updateField('crownPosition',
            'Dominant. This tree\'s crown extends above others in the area.',
            'Dominant, this tree’s crown extends above other nearby trees');
        $this->updateField('crownPosition',
            'Codominant. This tree\'s crown is level with or slightly below other nearby trees.',
            'Codominant, this tree’s crown is level with or slightly below other nearby trees');
        $this->updateField('crownPosition',
            'Overtopped. This tree\'s crown is entirely below other trees nearby.',
            'Overtopped, this tree’s crown is entirely below other nearby trees');
        $this->updateField('crownPosition',
            'Not applicable (Tree is isolated)',
            'Not applicable (e.g., tree is isolated, tree is on the edge, etc)');


        $this->updateAttributeName('crownHealth', 'hemlockCrownHealth');
        // updates old crownHealth data (now hemlockCrownHealth)
        $this->updateField('hemlockCrownHealth',
            '1 - Healthy',
            'H = Healthy (>80% healthy crown; deep green, dense foliage; skylight is mostly blocked when you look at the tree)',);
        $this->updateField('hemlockCrownHealth',
            '2 - Thinning',
            'I = In Decline (<80% - >20% healthy crown; foliage beginning to thin; foliage green-to-greyish; some skylight visible when looking at the tree)');
        $this->updateField('hemlockCrownHealth',
            '3 - Some dead branches (less than 50%)',
            'I = In Decline (<80% - >20% healthy crown; foliage beginning to thin; foliage green-to-greyish; some skylight visible when looking at the tree)');
        $this->updateField('hemlockCrownHealth',
            '4 - Many dead branches (more than 50%)',
            'S = Severe Decline (<20% crown; many limbs dead, foliage sparse; skylight very visible when looking at the tree)');
        $this->updateField('hemlockCrownHealth',
            '5 - Completely dead',
            'S = Severe Decline (<20% crown; many limbs dead, foliage sparse; skylight very visible when looking at the tree)');
        $this->updateField('hemlockCrownHealth',
            'I\'m not sure',
            'I\'m not sure (please describe in next field)');

        $this->info('Hemlock observations updated successfully');

        return 0;
    }

    public function updateField($fieldName, $oldValue, $newValue)
    {
        Observation::where("observation_category", "Hemlock")
            ->whereJsonContains("data->" . $fieldName, $oldValue)
            ->chunk(200, function ($observations) use ($fieldName, $oldValue, $newValue) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data[$fieldName] = $newValue;
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Updated $i observations: " . $oldValue . " -> " . $newValue);
            });
    }

    public function updateAttributeName($old, $new) {
        Observation::where("observation_category", "Hemlock")
            ->whereNotNull("data->".$old)
            ->chunk(200, function ($observations) use ($old, $new) {
                $i = 0;
                foreach ($observations as $observation) {
                    $data = $observation->data;
                    $data[$new] = $data[$old];
                    unset($data[$old]);
                    $observation->data = $data;
                    $observation->save();
                    $i++;
                }
                $this->info("Renamed attribute in $i observations: " . $old . " -> " . $new);
            });
    }
}





