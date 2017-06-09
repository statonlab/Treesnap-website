<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    /**
     * Fillable fields.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'observation_category',
        'images',
        'longitude',
        'latitude',
        'data',
        'collection_date',
        'location_accuracy',
        'is_private',
        'address',
        'fuzzy_coords',
        'mobile_id',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'collection_date',
    ];

    /**
     * Auto casting fields.
     *
     * @var array
     */
    protected $casts = [
        'images' => 'array',
        'data' => 'array',
        'address' => 'array',
        'fuzzy_coords' => 'array',
    ];

    /**
     * Get the user who owns the observation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Create noised coordinates based on the real coordinates.  Coordinates are noised by randomly adding a number between -.333 to 0.333: translating to roughly 50miles fuzzying for both latitude and longitude.
     *
     */

    protected function fuzzify(Observation $observation, $miles = 5)
    {
        //345000 = 69 miles per lat/2 for radius*10000
        $range = $miles / 345000;
        $latitude = $observation->latitude * 10000 + mt_rand($range * (-1), $range);
        $longitude = $observation->longitude * 10000 + mt_rand($range * (-1), $range);

        $observation->fuzzy_coords = [
            'latitude' => $latitude/10000,
            'longitude' => $longitude/10000,
        ];
        $observation->save();
    }

    /**
     * Return lists observation belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     *
     */
    public function collections()
    {
        return $this->belongsToMany('App\Collection');
    }

    /**
     * Get all flags.
     *
     * @return mixed
     */
    public function flags()
    {
        return $this->hasMany('App\Flag');
    }
}
