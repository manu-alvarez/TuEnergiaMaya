<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('kines', function (Blueprint $table) {
            $table->foreignId('seal_id')->nullable()->constrained('seals')->onDelete('cascade')->after('kin_number');
            $table->foreignId('tone_id')->nullable()->constrained('tones')->onDelete('cascade')->after('seal_id');

            // We can drop the redundant columns now since we are starting fresh with a seeder
            $table->dropColumn(['seal_name', 'tone_name', 'color']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kines', function (Blueprint $table) {
            $table->dropForeign(['seal_id']);
            $table->dropForeign(['tone_id']);
            $table->dropColumn(['seal_id', 'tone_id']);

            $table->string('seal_name')->nullable();
            $table->string('tone_name')->nullable();
            $table->string('color')->nullable();
        });
    }
};
