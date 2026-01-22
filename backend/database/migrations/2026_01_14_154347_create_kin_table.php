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
        Schema::create('kines', function (Blueprint $table) {
            $table->id();
            $table->integer('kin_number')->unique();
            $table->string('name');
            $table->text('affirmation');
            $table->text('description')->nullable(); // Detailed A4 description
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kines');
    }
};
