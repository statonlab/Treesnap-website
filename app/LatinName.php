<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LatinName extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'genus',
        'species',
        'common',
    ];

    /**
     * Get the latin name from the common name.
     *
     * @param $category
     * @param $data
     * @return int|mixed
     */
    public static function getID($category, $data)
    {
        $data = (array) $data;
        // Find the appropriate latin name
        switch ($category) {
            case 'Ash':
                $commonName = key_exists('ashSpecies', $data) ? $data['ashSpecies'] : 'Green ash';
                break;
            case 'Other':
                $commonName = key_exists('otherLabel', $data) ? $data['otherLabel'] : 'Unknown';
                break;
            case 'American Elm':
                $commonName = 'American or white elm';
                break;
            default:
                $commonName = $category;
                break;
        }

        // Find the latin name
        $latinName = static::where('common', trim($commonName))->first();

        return $latinName ? $latinName->id : 1;
    }
}
