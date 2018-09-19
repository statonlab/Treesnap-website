<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DownloadStatistic extends Model
{
    protected $fillable = [
        'user_id',
        'observations_count',
    ];

    /**
     * Get the user who downloaded the file.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
