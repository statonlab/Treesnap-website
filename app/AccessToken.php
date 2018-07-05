<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\Token;

class AccessToken extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'token_id',
        'token',
    ];

    /**
     * Owner of the tokens.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Passport OAuth Tokens.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function OAuthToken() {
        return $this->belongsTo(Token::class, 'token_id', 'id');
    }
}
