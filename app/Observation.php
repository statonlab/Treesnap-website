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

    /**
     * Get related confirmations.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function confirmations()
    {
        return $this->hasMany('App\Confirmation');
    }

    /**
     * Get related private notes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function notes()
    {
        return $this->hasMany('App\Note');
    }
}
