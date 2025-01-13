<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public const STATUS_PENDING = 'pendiente';
    public const STATUS_IN_PROGRESS = 'en progreso';
    public const STATUS_COMPLETED = 'completada';

    protected $fillable = ['title', 'description', 'status', 'due_date', 'user_id'];

    protected $hidden = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
