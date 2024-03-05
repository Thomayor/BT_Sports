<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayOnTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('play_on', function (Blueprint $table) {
            $table->foreignId('team_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('playground_id')->constrained()->onDelete('cascade'); 
            $table->primary(['team_id', 'playground_id']); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('play_on');
    }
}