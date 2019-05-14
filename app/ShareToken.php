<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShareToken extends Model
{
    /**
     * Fillable fields.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'observation_id',
        'expired_at',
        'value',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $casts = [
        'expired_at' => 'date',
    ];

    /**
     * Get the related user (sender).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the related observation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observation()
    {
        return $this->belongsTo('App\Observation');
    }
}
