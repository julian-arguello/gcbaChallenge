<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateTaskId
{
    /**
     * Valida que el parámetro "id" de la ruta sea un número entero.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $id = $request->route('id');

        if (!ctype_digit($id)) {
            return ApiResponse::error('El id debe ser un número entero.');
        }

        return $next($request);
    }
}
