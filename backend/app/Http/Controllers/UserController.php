<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;

class UserController extends Controller
{

    /**
     * Crea un nuevo usuario.
     *
     * @param  UserCreateRequest  $request  Petición que contiene los datos para crear un usuario.
     * @return ApiResponse                  Respuesta con el usuario creado o un mensaje de error.
     */
    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->validatedWhithPassword());

        return ApiResponse::success($user, [], 'Usuario creado exitosamente.', 201);
    }
}
