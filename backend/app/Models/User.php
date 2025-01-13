<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['id', 'name', 'email', 'password'];

    protected $hidden = ['password'];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
