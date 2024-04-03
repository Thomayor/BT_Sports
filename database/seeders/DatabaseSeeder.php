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
   
    \App\Models\User::factory(1)
      ->create([
        'firstname' => 'Thomas',
        'lastname' => 'Mayor',
        'account_type' => 'ADMIN',
        'email' => 'thomas@btsports.fr',
      ])->each(function ($user) {
        $user->teams()->save(\App\Models\Team::factory()->make());
    });
     

    \App\Models\User::factory(1)
      ->create([
        'firstname' => 'Bastien',
        'lastname' => 'Fauveau',
        'account_type' => 'ADMIN',
        'email' => 'bastien@btsports.fr',
      ])->each(function ($user) {
        $user->teams()->save(\App\Models\Team::factory()->make());
    });
  

    \App\Models\User::factory(1)
      ->create([
        'firstname' => 'Jean',
        'lastname' => 'LeSportif',
        'email' => 'customer@btsports.fr',
      ])->each(function ($user) {
        $user->teams()->save(\App\Models\Team::factory()->make());
    });

    \App\Models\Sport::factory()
    ->create([
      'name' => 'Basketball',
    ]);
    \App\Models\Sport::factory()
    ->create([
      'name' => 'Football',
    ]);
    \App\Models\Sport::factory()
    ->create([
      'name' => 'Tennis',
    ]);
    \App\Models\Sport::factory()
    ->create([
      'name' => 'Padel',
    ]);
    
    \App\Models\Sport::factory()
    ->create([
      'name' => 'Running',
    ]);


  }
}
