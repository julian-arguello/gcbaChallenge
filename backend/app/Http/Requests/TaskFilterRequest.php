<?php

namespace App\Http\Requests;

use App\Helpers\ApiResponse;
use App\Models\Task;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Valida los campos necesarios para filtrar una tarea.
 */
class TaskFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', Rule::in(Task::getStatuses())],
            'search' => ['nullable', 'string', 'max:100'],
        ];
    }

    /**
     * Mensajes de error personalizados
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'status.in' => 'El estado seleccionado no es válido.',
            'search.in' => 'El parametro de búsqueda no puede superar los 100 caracteres',
        ];
    }

    /**
     * Maneja la validación fallida lanzando una excepción con un ApiResponse.
     *
     * @param  Validator  $validator
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ApiResponse::error('Error de validación.', $validator->errors())
        );
    }
}
