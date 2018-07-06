<?php

use Illuminate\Database\Migrations\Migration;

class AttachUnitsToExistingObservations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $converter = new \App\Services\UnitsConverter();
        $attach = new \App\Services\AttachUnits();

        \App\Observation::chunk(500, function ($observations) use ($converter, $attach) {
            /** @var \App\Observation $observation */
            foreach ($observations as $observation) {
                $observation = $attach->attach($observation);
                $observation->save();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Observation::chunk(500, function ($observations) {
            /** @var \App\Observation $observation */
            foreach ($observations as $observation) {
                // Extract meta data
                $data = $observation->data;
                if (isset($data['heightFirstBranch_values'])) {
                    unset($data['heightFirstBranch_values']);
                }

                if (isset($data['diameterNumeric_values'])) {
                    unset($data['diameterNumeric_values']);
                }

                if (isset($data['heightNumeric_values'])) {
                    unset($data['heightNumeric_values']);
                }

                $observation->data = $data;
                $observation->save();
            }
        });
    }
}
