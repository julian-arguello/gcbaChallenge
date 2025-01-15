<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Autentica a un usuario mediante sus credenciales y genera un token JWT.
     *
     * @param LoginRequest $request Petición de login que valida las credenciales de inicio de sesión.
     * @return ApiResponse Respuesta que incluye el token y los datos del usuario, o un mensaje de error.
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return ApiResponse::error('Credenciales inválidas', 400);
            }
        } catch (JWTException $e) {
            return ApiResponse::error('No se pudo generar el token.', 500);
        }

        return ApiResponse::success(
            [
                'token' => $token,
                'user' => auth('api')->user()
            ],
            [],
            'Inicio de sesión exitoso.'
        );
    }
}
