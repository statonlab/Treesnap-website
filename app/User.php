<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'api_token',
        'is_over_thirteen',
        'is_anonymous',
        'zipcode',
        'class'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Default casts
     *
     * @var array
     */
    protected $casts = [
        'is_over_thirteen' => 'boolean',
        'is_anonymous' => 'boolean',
        'zipcode' => 'string',
    ];

    /**
     * Get the observations of a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function observations()
    {
        return $this->hasMany('App\Observation');
    }

    /**
     * Get user role.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
    {
        return $this->belongsTo('App\Role');
    }

    /**
     * Get user groups.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups() {
        return $this->belongsToMany('App\Group');
    }

    /**
     * Determine if a user is an admin.
     *
     * @return bool
     */
    public function isAdmin() {
        return $this->role()->first()->is_admin;
    }
}
