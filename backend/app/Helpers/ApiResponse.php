<?php

namespace App\Helpers;

class ApiResponse
{
    /**
     * Retorna una respuesta JSON exitosa.
     *
     * @param  mixed   $data            Contenido principal de la respuesta.
     * @param  array   $additionalData  Datos adicionales que se agregan al cuerpo de la respuesta.
     * @param  string  $message         Mensaje de estado.
     * @param  integer $statusCode      Código HTTP.
     *
     * @return \Illuminate\Http\JsonResponse Respuesta JSON.
     */
    public static function success($data, array $additionalData = [], string $message = 'ok', $statusCode = 200)
    {
        $response = array_merge([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $additionalData);


        return response()->json($response, $statusCode);
    }

    /**
     * Retorna una respuesta JSON de error.
     *
     * @param string $message   Mensaje de estado.
     * @param array $errors        Listado de errores
     * @param integer $statusCode Código HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON.
     */
    public static function error($message = 'error', $errors = [], $statusCode = 400)
    {
        $response  = [
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ];

        return response()->json($response, $statusCode);
    }
}
