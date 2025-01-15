<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;

    public const MIN_NAME = 3;
    public const MAX_NAME = 50;
    public const MIN_PASSWORD = 4;
    public const MAX_PASSWORD = 10;

    protected $fillable = ['id', 'name', 'email', 'password'];

    protected $hidden = ['password'];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
