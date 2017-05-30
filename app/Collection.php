<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = [
        'label',
        'description',
    ];

    /**
     * Get the user who owns this list
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Return users who are shared on this list.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     *
     */
    public function shared()
    {
        return $this->hasMany('App\User');
    }

    /**
     * Return trees in this list.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function observations()
    {
        return $this->hasMany('App\User');
    }
}
