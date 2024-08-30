<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Treet extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'app_name',
        'image_path',
        'description',
        'url'
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
