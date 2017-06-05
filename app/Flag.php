<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flag extends Model
{
    protected $fillable = [
        'observation_id',
        'user_id',
        'reason',
        'comments',
    ];

    /**
     * Get the observation in question.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observation()
    {
        return $this->belongsTo('App\Observation');
    }
}
