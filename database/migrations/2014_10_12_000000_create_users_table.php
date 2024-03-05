<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->string('city', 20)->nullable();
            $table->string('firstname', 150)->nullable();
            $table->string('lastname', 150)->nullable();
            $table->date('DATE_birth')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('user_adress', 150)->nullable();
            $table->string('user_postcode', 20)->nullable();
            $table->enum('user_role',['player', 'club', 'admin','superAdmin'])->default('player');
            $table->foreignId('current_team_id')->nullable();
            $table->string('profile_photo_path', 2048)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
