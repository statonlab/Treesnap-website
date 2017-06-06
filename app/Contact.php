<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'user_id',
        'recipient_id',
        'to',
        'from',
        'subject',
        'message',
        'observation_id',
        'include_observation',
    ];

    protected $casts = [
        'cc' => 'array'
    ];

    /**
     * Get the sender.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the receiver.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function recipient()
    {
        return $this->belongsTo('App\User', 'recipient_id');
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
