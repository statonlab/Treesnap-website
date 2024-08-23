<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    protected $fillable = [
        'user_id',
        'group_id',
        'email',
        'status',
        'token',
        'expires_at',
    ];

    protected $casts = [
        'expires_at',
        'created_at',
        'updated_at',
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
     * Get the related group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo('App\Group');
    }

    public function invitee()
    {
        return $this->belongsTo('App\User', 'email', 'email');
    }
}
