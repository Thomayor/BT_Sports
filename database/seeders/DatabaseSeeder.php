<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'firstname' => 'Thomas',
            'lastname' => 'Mayor',
            'role' => "ADMIN",
            'email' => 'thomas@btsports.fr',
        ]);

        \App\Models\User::factory()->create([
            'firstname' => 'Bastien',
            'lastname' => 'Fauveau',
            'role' => "ADMIN",
            'email' => 'bastien@btsports.fr',
        ]);

        
        \App\Models\User::factory()->create([
            'firstname' => 'Jean',
            'lastname' => 'LeSportif',
            'email' => 'customer@btsports.fr',
        ]);
    }
}
