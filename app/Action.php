<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'data',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
