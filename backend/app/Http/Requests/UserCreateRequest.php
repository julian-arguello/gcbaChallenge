<?php

namespace App\Http\Requests;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

/**
 * Valida los campos necesarios para crear un usuario.
 */
class UserCreateRequest extends FormRequest
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
            'name' => ['required', 'min:' . User::MIN_NAME, 'max:' . User::MAX_NAME],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:' . User::MIN_PASSWORD, 'max:' . User::MAX_PASSWORD]
        ];
    }

    /**
     * Wrapper de validated, para encriptar la contraseña antes de crear el usuario.
     *
     * @return array
     */
    public function validatedWhithPassword(): array
    {
        $validated = $this->validated();
        $validated['password'] = bcrypt($validated['password']);
        return $validated;
    }

    /**
     * Mensajes de error personalizados
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.min' => 'El nombre debe tener al menos ' . User::MIN_NAME . ' caracteres.',
            'name.max' => 'El nombre debe tener como máximo ' . User::MAX_NAME . ' caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico no tiene un formato válido.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos ' . User::MIN_PASSWORD . ' caracteres.',
            'password.max' => 'La contraseña debe tener como máximo ' . User::MAX_PASSWORD . ' caracteres.',
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
