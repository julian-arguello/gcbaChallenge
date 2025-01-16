<?php

namespace App\Traits;

use App\Models\Task;

trait ValidationTaskMessagesTrait
{
    public function validationMessages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'title.min' => 'El título debe tener al menos ' . Task::MIN_TITLE . ' caracteres.',
            'title.min' => 'El título no puede tener más de ' . Task::MAX_TITLE . ' caracteres.',
            'description.max' => 'La descripción no puede tener mas de ' . Task::MAX_DESCRIPTION . ' caracteres.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado seleccionado no es válido.',
            'due_date.required' => 'La fecha de vencimiento es obligatoria.',
            'due_date.date' => 'Debe proporcionar una fecha válida.',
            'due_date.after' => 'La fecha de vencimiento debe ser posterior a hoy.',
            'due_date.after_or_equal' => 'El campo fecha de vencimiento debe ser una fecha igual o posterior a la fecha previa.',
        ];
    }
}
