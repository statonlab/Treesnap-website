<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomIdentifier extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'observation_id',
        'identifier',
    ];

    /**
     * Get the observation attached to this identifier.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observation()
    {
        return $this->belongsTo(Observation::class);
    }
}
