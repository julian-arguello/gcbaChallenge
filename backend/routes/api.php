<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\JWTMiddleware;
use App\Http\Middleware\ValidateTaskId;

Route::post('/auth', [AuthController::class, 'login']);

Route::middleware(JWTMiddleware::class)->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::get('/tasks/{id}', [TaskController::class, 'show'])->middleware(ValidateTaskId::class);
    Route::put('/tasks/{id}', [TaskController::class, 'update'])->middleware(ValidateTaskId::class);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->middleware(ValidateTaskId::class);
    Route::post('/tasks', [TaskController::class, 'store']);
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
