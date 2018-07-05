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

        \App\Observation::chunk(500, function ($observations) use ($converter) {
            /** @var \App\Observation $observation */
            foreach ($observations as $observation) {
                // Extract meta data
                $data = $observation->data;
                if (isset($data['heightFirstBranch'])) {
                    if (! isset($data['heightFirstBranch_units'])) {
                        $data['heightFirstBranch_units'] = 'Feet';
                    }

                    $data['heightFirstBranch_values'] = [
                        'US_unit' => 'Feet',
                        'US_value' => $data['heightFirstBranch'],
                        'metric_unit' => 'Meters',
                        'metric_value' => $converter->feetToMeters(floatval($data['heightFirstBranch'])),
                    ];
                }

                if (isset($data['diameterNumeric'])) {
                    if (! isset($data['diameterNumeric_units'])) {
                        $data['diameterNumeric_units'] = 'Inches';
                    }

                    $data['diameterNumeric_values'] = [
                        'US_unit' => 'Inches',
                        'US_value' => $data['diameterNumeric'],
                        'metric_unit' => 'cm',
                        'metric_value' => $converter->inchesToCentimeters(floatval($data['diameterNumeric'])),
                    ];
                }

                if (isset($data['heightNumeric'])) {
                    if (! isset($data['heightNumeric_units'])) {
                        $data['heightNumeric_units'] = 'Feet';
                    }

                    $data['heightNumeric_values'] = [
                        'US_unit' => 'Feet',
                        'US_value' => $data['heightNumeric'],
                        'metric_unit' => 'Meters',
                        'metric_value' => $converter->feetToMeters(floatval($data['heightNumeric'])),
                    ];
                }

                $observation->data = $data;
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
