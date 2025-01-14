<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
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
}
