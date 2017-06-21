<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Confirmation extends Model
{
    protected $fillable = [
        'user_id',
        'observation_id',
        'correct',
    ];

    protected $casts = [
        'correct' => 'boolean',
    ];

    /**
     * The user who created the confirmation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * The confirmed observation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observation()
    {
        return $this->belongsTo('App\Observation');
    }
}
