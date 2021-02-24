<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SamplingProject extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'has_public_coordinates',
        'name',
        'traits',
    ];

    /**
     * Auto casting fields.
     *
     * @var array
     */
    protected $casts = [
        'has_public_coordinates' => 'bool',
    ];

    /**
     * Get the owner of the group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
