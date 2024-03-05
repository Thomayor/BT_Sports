<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaygroundsMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('playgrounds_matches', function (Blueprint $table) {
            $table->foreignId('match_id')->constrained()->onDelete('cascade');
            $table->foreignId('playground_id')->constrained()->onDelete('cascade');
            $table->primary(['match_id', 'playground_id']); 
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
        Schema::dropIfExists('playgrounds_matches');
    }
}