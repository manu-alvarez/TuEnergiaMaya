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
            $table->string('seal_name')->after('name')->nullable();
            $table->string('tone_name')->after('seal_name')->nullable();
            $table->string('color')->after('tone_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kines', function (Blueprint $table) {
            $table->dropColumn(['seal_name', 'tone_name', 'color']);
        });
    }
};
