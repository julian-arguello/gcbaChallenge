<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Helpers\ApiResponse;

class JWTMiddleware
{
    /**
     * Verifica que el usuario esté autenticado mediante un token JWT.
     *
     * Maneja las respuestas en caso de token expirado, sea inválido
     * o no esté presente, devolviendo mensajes de error.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return ApiResponse::error('El token ha expirado.', [], 401);
        } catch (TokenInvalidException $e) {
            return ApiResponse::error('El token no es válido.', [], 401);
        } catch (JWTException $e) {
            return ApiResponse::error('El token no está presente.', [], 401);
        }

        return $next($request);
    }
}
