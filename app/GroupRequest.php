<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupRequest extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'group_id',
        'user_id',
        'rejected',
        'withdrawn',
        'notification_sent',
    ];

    /**
     * Auto cast.
     *
     * @var array
     */
    protected $casts = [
        'withdrawn' => 'boolean',
        'notification_sent' => 'boolean',
    ];

    /**
     * Get the related group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo('App\Group');
    }

    /**
     * Get the user who made the request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Accept a join request.
     *
     * @return bool|null
     * @throws \Exception
     */
    public function accept() {
        $this->group->users()->syncWithoutDetaching($this->user_id);

        return $this->delete();
    }

    /**
     * Reject a join request.
     *
     * @return bool
     */
    public function reject() {
        $this->rejected = true;
        return $this->save();
    }

    /**
     * Unreject a join request.
     *
     * @return bool
     */
    public function unreject() {
        $this->rejected = false;
        return $this->save();
    }
}
