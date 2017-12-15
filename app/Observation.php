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
        'thumbnail',
        'longitude',
        'latitude',
        'data',
        'collection_date',
        'location_accuracy',
        'is_private',
        'address',
        'fuzzy_coords',
        'mobile_id',
        'latin_name_id'
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
        'thumbnails' => 'array',
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

    public function latinName() {
        return $this->belongsTo('App\LatinName', 'latin_name_id', 'id');
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

    /**
     * @param $bounds
     */
    public function scopeBounds($query, $bounds)
    {
        if ($bounds->southWest->lat < $bounds->northEast->lat) {
            $query->whereBetween('latitude', [$bounds->southWest->lat, $bounds->northEast->lat]);
        } else {
            $query->whereBetween('latitude', [$bounds->northEast->lat, $bounds->southWest->lat]);
        }

        $left_edge =$bounds->southWest->lng;
        $right_edge = $bounds->northEast->lng;

        if($right_edge < $left_edge) {
            $query->where(function ($query) use ($left_edge, $right_edge) {
                $query->whereBetween('longitude', [$left_edge, 180]);
                $query->orWhere(function ($query) use ($right_edge) {
                    $query->whereBetween('longitude', [-180, $right_edge]);
                });
            });
        } else {
            $query->whereBetween('longitude', [$left_edge, $right_edge]);
        }
    }
}
