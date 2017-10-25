<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    /**
     * Override the observations property of group.
     *
     * @param string $key
     * @return \Illuminate\Database\Eloquent\Collection|mixed|static[]
     */
    public function __get($key)
    {
        if ($key === 'observations') {
            return $this->observations()->get();
        }

        return parent::__get($key);
    }

    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'user_id',
    ];

    /**
     * Get users that belong to this group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot(['share']);
    }

    /**
     * Get the owner of the group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    /**
     * Get group shared observations.
     *
     * @return \App\Observation
     */
    public function observations()
    {
        $users = $this->users()->wherePivot('share', true)->get()->map(function ($user) {
            return $user->id;
        });

        return Observation::whereIn('user_id', $users)->where('is_private', false);
    }
}
