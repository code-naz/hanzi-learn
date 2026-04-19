<?php

namespace Database\Seeders;

use App\Models\HanziEntry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HanziSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('data/HSK3.0_new.csv');
        $lines = file($csvFile);
        $header = array_shift($lines);

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) {
                continue;
            }
            
            $row = str_getcsv($line, ';');
            if (count($row) >= 5) {
                $pinyin = trim($row[3]) ?: '';
                HanziEntry::create([
                    'traditional' => trim($row[1]) ?: null,
                    'simplified'  => trim($row[2]) ?: '',
                    'pinyin'      => $pinyin,
                    'pinyin_normalized' => Str::ascii(strtolower(str_replace(' ', '', $pinyin))),
                    'meaning'     => trim($row[4]) ?: '',
                ]);
            }
        }
    }
}
