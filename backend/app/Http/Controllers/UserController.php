<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();

        return ApiResponse::success($user);
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->validated());

        return ApiResponse::success($user, [], 'Usuario creado exitosamente.', 201);
    }
}
