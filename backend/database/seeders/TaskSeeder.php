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
            'title' => $faker->realText(50),
            'description' => $faker->realText(150),
            'status' => Task::STATUS_COMPLETED,
            'due_date' => $faker->dateTimeBetween('now', '+1 week')->format('Y-m-d'),
            'user_id' => 1
        ]);

        Task::create([
            'title' => $faker->realText(50),
            'description' => $faker->realText(150),
            'status' => Task::STATUS_COMPLETED,
            'due_date' => $faker->dateTimeBetween('now', '+2 week')->format('Y-m-d'),
            'user_id' => 1
        ]);

        Task::create([
            'title' => $faker->realText(50),
            'description' => $faker->realText(150),
            'status' => Task::STATUS_IN_PROGRESS,
            'due_date' => $faker->dateTimeBetween('now', '+2 day')->format('Y-m-d'),
            'user_id' => 1
        ]);

        Task::create([
            'title' => $faker->realText(50),
            'description' => $faker->realText(150),
            'status' => Task::STATUS_PENDING,
            'due_date' => $faker->dateTimeBetween('now', '+1 day')->format('Y-m-d'),
            'user_id' => 1
        ]);
    }
}
