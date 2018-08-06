<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddVitisSppDataToLatinNamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $latinNames = [
            'Vitis rotundifolia' => 'Muscadine',
            'Vitis aestivalis' => 'Summer grape',
            'Vitis riparia' => 'Frost grape',
            'Vitis labrusca' => 'Fox grape',
            'Vitis mustangensis' => 'Mustang grape',
            'Vitis rupestris' => 'Sand grape',
        ];

        foreach ($latinNames as $latin => $common) {
            $latinArray = explode(' ', $latin);
            $genus = $latinArray[0];
            $species = $latinArray[1];

            // Insert to the newly created table
            \App\LatinName::create([
                'genus' => trim($genus),
                'species' => trim($species),
                'common' => trim($common),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $latinNames = [
            'Vitis rotundifolia' => 'Muscadine',
            'Vitis aestivalis' => 'Summer grape',
            'Vitis riparia' => 'Frost grape',
            'Vitis labrusca' => 'Fox grape',
            'Vitis mustangensis' => 'Mustang grape',
            'Vitis rupestris' => 'Sand grape',
        ];

        foreach ($latinNames as $latin => $common) {
            $latinArray = explode(' ', $latin);
            $genus = $latinArray[0];
            $species = $latinArray[1];

            // Insert to the newly created table
            $found = \App\LatinName::where([
                'genus' => trim($genus),
                'species' => trim($species),
                'common' => trim($common),
            ])->first();

            if ($found) {
                $found->delete();
            }
        }
    }
}
