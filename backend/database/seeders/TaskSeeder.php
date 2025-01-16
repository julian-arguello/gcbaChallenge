<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('es_ES');

        Task::create([
            'title' => 'Finalizar presentación del proyecto',
            'description' => 'Revisar diapositivas y ajustar los datos del análisis financiero.',
            'status' => Task::STATUS_COMPLETED,
            'due_date' => $faker->dateTimeBetween('-2 days', 'now')->format('Y-m-d'),
            'user_id' => 1
        ]);

        Task::create([
            'title' => 'Redactar informe semanal',
            'description' => 'Compilar los avances de los equipos y enviar a la dirección.',
            'status' => Task::STATUS_IN_PROGRESS,
            'due_date' => $faker->dateTimeBetween('now', '+2 days')->format('Y-m-d'),
            'user_id' => 1
        ]);

        Task::create([
            'title' => 'Planificar reunión con clientes',
            'description' => 'Definir agenda y enviar invitaciones para la próxima semana.',
            'status' => Task::STATUS_PENDING,
            'due_date' => $faker->dateTimeBetween('+1 day', '+3 days')->format('Y-m-d'),
            'user_id' => 1
        ]);

        Task::create([
            'title' => 'Actualizar base de datos de contactos',
            'description' => 'Agregar nuevos clientes y corregir errores en los registros existentes.',
            'status' => Task::STATUS_COMPLETED,
            'due_date' => $faker->dateTimeBetween('-5 days', '-1 day')->format('Y-m-d'),
            'user_id' => 2
        ]);

        Task::create([
            'title' => 'Preparar informe para junta directiva',
            'description' => 'Recopilar datos financieros del último trimestre y generar gráficos.',
            'status' => Task::STATUS_IN_PROGRESS,
            'due_date' => $faker->dateTimeBetween('now', '+3 days')->format('Y-m-d'),
            'user_id' => 2
        ]);

        Task::create([
            'title' => 'Responder correos urgentes',
            'description' => 'Revisar bandeja de entrada y dar prioridad a los correos importantes.',
            'status' => Task::STATUS_PENDING,
            'due_date' => $faker->dateTimeBetween('now', '+1 day')->format('Y-m-d'),
            'user_id' => 2
        ]);
    }
}
