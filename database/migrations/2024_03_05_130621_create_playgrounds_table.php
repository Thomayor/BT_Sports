<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaygroundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('playgrounds', function (Blueprint $table) {
            $table->id(); 
            $table->string('name', 50)->unique();
            $table->string('surface_type', 20);
            $table->string('playground_type');
            $table->string('is_covered');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
            $table->string('city',50);
            $table->string('adress', 150)->nullable();
            $table->string('postcode', 20);
            $table->float('coordgpsx', 10, 6)->nullable();
            $table->float('coordgpsy', 10, 6)->nullable();
            $table->string('equipment_id');
            $table->string('installation_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('playgrounds');
    }
}
