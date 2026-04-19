<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HanziEntry extends Model
{
    protected $fillable = [
        'traditional',
        'simplified',
        'pinyin',
        'pinyin_normalized',
        'meaning'
    ];
}
