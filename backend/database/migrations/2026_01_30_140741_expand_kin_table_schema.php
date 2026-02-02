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
            $table->text('long_description')->nullable()->after('description');
            $table->json('oracle')->nullable()->after('long_description');
            $table->json('advice')->nullable()->after('oracle');
            $table->text('seal_desc')->nullable()->after('advice');
            $table->text('tone_desc')->nullable()->after('seal_desc');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kines', function (Blueprint $table) {
            $table->dropColumn(['long_description', 'oracle', 'advice', 'seal_desc', 'tone_desc']);
        });
    }
};
