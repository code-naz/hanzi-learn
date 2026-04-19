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
        Schema::create('hanzi_entries', function (Blueprint $table) {
            $table->id();
            $table->string('traditional')->nullable()->index();
            $table->string('simplified')->index();
            $table->string('pinyin')->index();
            $table->text('meaning');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hanzi_entries');
    }
};
