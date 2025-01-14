<?php

namespace App\Http\Requests;

use App\Helpers\ApiResponse;
use App\Models\Task;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use App\Traits\ValidationTaskMessagesTrait;


class TaskCreateRequest extends FormRequest

{
    use ValidationTaskMessagesTrait;

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
            'user_id' => ['required', 'numeric'],
            'title' => ['required', 'min:' . Task::MIN_TITLE, 'max:' . Task::MAX_TITLE],
            'description' => ['nullable', 'max:' . Task::MAX_DESCRIPTION],
            'status' => ['required', Rule::in(Task::getStatuses())],
            'due_date' => ['required', 'date', 'after:today']
        ];
    }

    public function messages(): array
    {
        return $this->validationMessages();
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ApiResponse::error('Error de validación.', $validator->errors())
        );
    }
}
