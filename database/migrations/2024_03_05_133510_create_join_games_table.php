<?php

use App\Models\Game;
use App\Models\Team;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJoinMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('join_games', function (Blueprint $table) {
            $table
                ->foreignIdFor(Game::class, 'game_id')
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table
                ->foreignIdFor(Team::class, 'team_id')
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->primary(['game_id', 'team_id']); 
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
        Schema::dropIfExists('join_matches');
    }
}