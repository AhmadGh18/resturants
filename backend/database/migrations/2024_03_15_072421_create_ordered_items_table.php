<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('ordered_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id'); // Add order_id as foreign key
            $table->unsignedBigInteger('item_id'); // Add item_id as foreign key
            $table->timestamps();
            $table->integer('quantity');
            $table->unsignedBigInteger('restaurant_id'); // Add restaurant_id column

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordered_items');
    }
};