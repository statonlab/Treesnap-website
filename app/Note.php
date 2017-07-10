<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'user_id',
        'observation_id',
        'note'
    ];

    /**
     * Get related observation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observation() {
        return $this->belongsTo('App\Observation');
    }

    /**
     * Get related user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() {
        return $this->belongsTo('App\User');
    }
}
