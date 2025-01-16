<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'name' => 'Julián Argüello',
            'email' => 'julian.andres.arguello@gmail.com',
            'password' => bcrypt('asdasd')
        ]);
        User::create([
            'id' => 2,
            'name' => 'sistemaytecno',
            'email' => 'sistemaytecno.dghc@gmail.com',
            'password' => bcrypt('asdasd')
        ]);
    }
}
