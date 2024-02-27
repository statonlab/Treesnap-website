<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'user_id',
        'start_date',
        'end_date',
        'link',
        'platform',
        'description',
        'location',
        'timezone',
        'has_start_time',
        'has_end_time',
    ];

    /**
     * Dates.
     *
     * @var array
     */
    protected $casts = [
        'created_at',
        'updated_at',
        'start_date',
        'end_date',
    ];

    /**
     * Casts columns.
     *
     * @var array
     */
    protected $casts = [
        'has_start_time' => 'boolean',
        'has_end_time' => 'boolean',
    ];

    /**
     * Get the creator.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
