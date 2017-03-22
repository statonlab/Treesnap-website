<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\App;

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
      'zip_code',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
      'password',
      'remember_token',
      'api_token',
    ];

    /**
     * Default casts
     *
     * @var array
     */
    protected $casts = [
      'is_over_thirteen' => 'boolean',
      'is_anonymous' => 'boolean',
    ];

    /**
     * Get the observations of a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function observations() {
        return $this->hasMany('App\Observation');
    }
}
