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

    /**
     * A flag is owned by a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
