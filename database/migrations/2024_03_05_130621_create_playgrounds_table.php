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
            $table->boolean('is_covered');
            $table->boolean('is_booked');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
            $table->string('city', 20)->nullable();
            $table->string('adress', 150)->nullable();
            $table->string('postcode', 20)->nullable();
            $table->float('coordgpsx', 10, 6);
            $table->float('coordgpsy', 10, 6);
            
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
