<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('games', function (Blueprint $table) {
      $table->id();
      $table->date('date_game');
      $table->time('hour_begin_game');
      $table->time('hour_finish_game');
      $table->integer('max_players');
      $table
        ->foreignId('sport_id')
        ->constrained()
        ->onDelete('cascade');
      $table
        ->foreignId('user_id')
        ->constrained()
        ->onDelete('cascade');
      $table
        ->foreignId('playground_id')
        ->constrained()
        ->onDelete('cascade');
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
    Schema::dropIfExists('games');
  }
}
