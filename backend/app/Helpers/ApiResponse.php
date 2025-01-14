<?php

namespace App\Helpers;


class ApiResponse
{

    public static function success($data, array $additionalData = [], string $message = 'ok', $statusCode = 200)
    {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
            ...$additionalData
        ];


        return response()->json($response, $statusCode);
    }

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
