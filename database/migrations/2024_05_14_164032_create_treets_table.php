<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations. /Users/chancestribling/Sites/Treesnap-website/database/migrations/2024_05_14_164032_create_treets_table.php
     */
    public function up(): void
    {
        Schema::create('treets', function (Blueprint $table) {
            $table->id();
            $table->text('app_name');
            $table->text('image_path');
            $table->text('url');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treets');
    }
};
