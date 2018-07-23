<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

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
        'units',
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
        'units' => 'string'
    ];

    /**
     * IDs of users who share a group with the current user.
     *
     * @var array
     */
    protected $friends = [];

    /**
     * Whether a list of friends have been generated.
     *
     * @var bool
     */
    protected $firendsGenerated = false;

    /**
     * Get the observations of a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function observations()
    {
        return $this->hasMany(Observation::class);
    }

    /**
     * Get the user's access tokens.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function accessTokens()
    {
        return $this->hasMany(AccessToken::class);
    }

    /**
     * Get actions.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    /**
     * Get user role.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get user groups.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class)->withPivot(['share']);
    }

    /**
     * Get all groups a user owns.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ownedGroups()
    {
        return $this->hasMany(Group::class);
    }

    /**
     * Determine if a user is an admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return (bool)$this->role->is_admin;
    }

    /**
     * Get user owned collections and those that are shared with them.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function collections()
    {
        return $this->belongsToMany(Collection::class)->withPivot(['can_customize']);
    }

    /**
     * Get only the collections that the user owns.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ownedCollections()
    {
        return $this->hasMany(Collection::class);
    }

    /**
     * Get collections that the user is allowed to customize.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function customizableCollections()
    {
        return $this->belongsToMany(Collection::class)->withPivot(['can_customize'])->wherePivot('can_customize', true);
    }

    /**
     * Determine if a user is a scientist.
     *
     * @return bool
     */
    public function isScientist()
    {
        return $this->role->name === 'Scientist';
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
            return in_array(strtolower($user->role->name), array_map(function ($role) {
                return strtolower($role);
            }, $role));
        }

        return strtolower($user->role->name) === strtolower(trim($role));
    }

    /**
     * Get filters owed by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function filters()
    {
        return $this->hasMany(Filter::class);
    }

    /**
     * Get related confirmations.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function confirmations()
    {
        return $this->hasMany(Confirmation::class);
    }

    /**
     * Get related notes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    /**
     * Check whether a user shares a group with another
     * user with user_id.
     *
     * @param $user_id
     * @return bool
     */
    public function hasFriend($user_id)
    {
        if (empty($this->friends)) {
            $this->generateFriends();
        }

        return in_array($user_id, $this->friends);
    }

    /**
     * Generate friends list.
     */
    protected function generateFriends()
    {
        $groups = $this->groups()->wherePivot('share', true)->with('users')->get();

        foreach ($groups as $group) {
            foreach ($group->users as $user) {
                $this->friends[] = $user->id;
            }
        }

        $this->firendsGenerated = true;
    }

    public function friends() {
        if(!$this->friendsGenerated) {
            $this->generateFriends();
        }

        return $this->friends;
    }

    /**
     * If the user shares group with another user whose id is $user_id.
     *
     * @param int $user_id the user id.
     * @return bool
     */
    public function sharesGroupWith($user_id)
    {
        $groups = $this->groups()->withCount([
            'users' => function ($query) use ($user_id) {
                $query->where('users.id', $user_id);
            },
        ])->get();

        foreach ($groups as $group) {
            if ($group->users_count > 0) {
                return true;
            }
        }

        return false;
    }

    public function subscriptionTopics()
    {
        return $this->belongsToMany(SubscriptionTopic::class, 'subscription_topics_user', 'user_id',
            'subscription_topic_id');
    }
}
