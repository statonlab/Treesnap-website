<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'path',
        'auto_delete',
    ];

    /**
     * Auto casting columns.
     *
     * @var array
     */
    protected $casts = [
        'auto_delete' => 'Boolean',
    ];

    /**
     * Get the file owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
