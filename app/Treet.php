<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treet extends Model
{
    use HasFactory;

    protected $fillable = [
        'app_name',
        'title',
        'description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
