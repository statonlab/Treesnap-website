<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'rules',
        'notify_user',
    ];

    protected $casts = [
        'rules' => 'array',
    ];

    /**
     * Get the owner of the filter.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
