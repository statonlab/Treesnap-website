<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LatinName extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'genus',
        'species',
        'common',
    ];
}
