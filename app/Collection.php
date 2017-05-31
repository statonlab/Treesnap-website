<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = [
        'user_id',
        'label',
        'description',
    ];


    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];


    /**
     * Get the user who owns this list
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Return users who are shared on this list.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     *
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * Return trees in this list.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function observations()
    {
        return $this->belongsToMany('App\Observation');
    }
}
