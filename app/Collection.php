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
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Get the user who owns this list
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    /**
     * Return users who are shared on this list.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     *
     */
    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot(['can_customize', 'is_shared_with_group']);
    }

    /**
     * Get groups that this collection was shared with.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany('App\Group')->withPivot(['can_customize']);
    }

    /**
     * Return trees in this list.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function observations()
    {
        return $this->belongsToMany('App\Observation');
    }

    /**
     * Update this collection's permissions for a specific user.
     *
     * @param $user_id
     * @param $can_customize
     */
    public function updatePermissions($user_id, $can_customize)
    {
        $collection_id = $this->id;

        \DB::table('collection_user')->where([
            'collection_id' => $collection_id,
            'user_id' => $user_id,
        ])->update([
            'can_customize' => $can_customize ? 1 : 0,
        ]);

        return $this;
    }
}
