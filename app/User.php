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
        'is_anonymous',
        'is_private',
        'zipcode',
        'class',
        'birth_year',
        'role_id',
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
        'is_anonymous' => 'boolean',
        'is_private' => 'boolean',
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
    public function groups()
    {
        return $this->belongsToMany('App\Group');
    }

    /**
     * Determine if a user is an admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role()->first()->is_admin;
    }

    /**
     * Get user collections that are shared with them
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function collections()
    {
        return $this->belongsToMany('App\Collection');
    }

    /**
     * Determine if a user is a scientist.
     *
     * @return bool
     */

    public function isScientist()
    {
        return $this->role()->first()->name === 'Scientist';
    }

    /**
     * Checks a user's role.
     *
     * @param string|array $role the possible role
     * @param $user
     * @return bool
     */
    public static function hasRole($role, $user)
    {
        if (is_array($role)) {
            return in_array(strtolower($user->role()->first()->name), array_map(function ($r) {
                return strtolower($r);
            }, $role));
        }

        return strtolower($user->role()->first()->name) === strtolower(trim($role));
    }

    /**
     * Get filters owed by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function filters()
    {
        return $this->hasMany('App\Filter');
    }

    /**
     * Get related confirmations.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function confirmations()
    {
        return $this->hasMany('App\Confirmation');
    }

    /**
     * Get related notes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function notes()
    {
        return $this->hasMany('App\Note');
    }
}
