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
        Schema::create('saved_restaurants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id'); // Add restaurant_id as foreign key
            $table->unsignedBigInteger('user_id'); // Add user_id as foreign key
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_restaurants');
    }
};