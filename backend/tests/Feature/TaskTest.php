<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba la creación de una nueva tarea exitosa.
     *
     * @return void
     */
    public function test_creates_new_task_successfully()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $payload = [
            "title" => "Tarea test",
            "description" => "descripción de la tarea",
            "status" => "pending",
            "due_date" => "2025/08/02"
        ];

        $response = $this->postJson('/api/tasks', $payload, [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'title',
                    'description',
                    'status',
                    'due_date',
                    'updated_at',
                    'created_at',
                    'id'
                ],
            ]);
    }

    /**
     * Prueba la validación de datos incorrectos al crear una tarea.
     *
     * @return void
     */
    public function test_creates_task_with_invalid_data_returns_error()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->postJson('/api/tasks', [], [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Error de validación.',
                'errors' => [
                    'title' => ['El título es obligatorio.'],
                    'status' => ['El estado es obligatorio.'],
                    'due_date' => ['La fecha de vencimiento es obligatoria.']
                ]
            ]);
    }

    /**
     * Prueba la respuesta al consultar una tarea que no existe.
     * 
     * @return void
     */
    public function test_returns_not_found_if_task_does_not_exist()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->getJson('/api/tasks/999999', [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'success'  => false,
                'message' => 'Tarea no encontrada.'
            ]);
    }
}
