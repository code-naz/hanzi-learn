<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hanzi_entries', function (Blueprint $table) {
            $table->string('pinyin_normalized')->nullable()->index();
        });

        DB::table('hanzi_entries')->orderBy('id')->cursor()->each(function ($entry) {
            DB::table('hanzi_entries')
                ->where('id', $entry->id)
                ->update([
                    'pinyin_normalized' => Str::ascii(strtolower(str_replace(' ', '', $entry->pinyin ?? ''))),
                ]);
        });
    }

    public function down(): void
    {
        Schema::table('hanzi_entries', function (Blueprint $table) {
            $table->dropColumn('pinyin_normalized');
        });
    }
};
