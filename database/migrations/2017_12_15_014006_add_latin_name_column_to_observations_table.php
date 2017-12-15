<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLatinNameColumnToObservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('observations', function (Blueprint $table) {
            $table->unsignedInteger('latin_name_id')->default(1);
        });

        $this->associateObservationsWithTheirLatinNames();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('observations', function (Blueprint $table) {
            $table->dropColumn('latin_name_id');
        });
    }

    /**
     * We could write a super efficient query here but we only have 200 observations so not worth it.
     *
     * @return void
     */
    protected function associateObservationsWithTheirLatinNames()
    {
        // Loop through observations and link the latin_name_id column
        \App\Observation::chunk(200, function ($observations) {
            foreach ($observations as $observation) {
                try {
                    // Find the appropriate latin name
                    switch ($observation->observation_category) {
                        case 'Ash':
                            $commonName = key_exists('ashSpecies',
                                $observation->data) ? $observation->data['ashSpecies'] : 'Green ash';
                            break;
                        case 'Other':
                            $commonName = key_exists('otherLabel',
                                $observation->data) ? $observation->data['otherLabel'] : 'Unknown';
                            break;
                        case 'American Elm':
                            $commonName = 'American or white elm';
                            break;
                        default:
                            $commonName = $observation->observation_category;
                            break;
                    }

                    // Find the latin name
                    $latinName = \App\LatinName::where('common', trim($commonName))->first();
                    if ($latinName) {
                        $observation->latin_name_id = $latinName->id;
                        $observation->save();
                    }
                } catch (Exception $exception) {
                    echo $exception->getMessage();
                    echo "\n";
                    echo "The observation in question is: $observation->id: $observation->observation_category\n";
                }
            }
        });
    }
}
