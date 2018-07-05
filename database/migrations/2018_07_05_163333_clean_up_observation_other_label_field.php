<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CleanUpObservationOtherLabelField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Observation::chunk(500, function ($observations) {
            /** @var \App\Observation $observation */
            foreach ($observations as $observation) {
                $data = $observation->data;
                if (isset($data['otherLabel'])) {
                    $data['otherLabel'] = trim($data['otherLabel']);
                    $observation->fill([
                        'data' => $data,
                    ])->save();
                }
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
        //
    }
}
