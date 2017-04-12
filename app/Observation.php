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
        'data' => 'array'
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
}
