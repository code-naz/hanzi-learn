<?php

namespace App\Http\Controllers;

use App\Models\HanziEntry; // Pastikan Model sudah dibuat
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HanziController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('search');
        $normalizedQuery = $query ? str_replace(' ', '', Str::ascii(strtolower($query))) : null;

        $results = HanziEntry::when($query, function ($q) use ($query, $normalizedQuery) {
            $q->where('simplified', 'like', "%{$query}%")
              ->orWhere('traditional', 'like', "%{$query}%")
              ->orWhere('pinyin', 'like', "%{$query}%")
              ->orWhere('meaning', 'like', "%{$query}%");

            if ($normalizedQuery) {
                $q->orWhere('pinyin_normalized', 'like', "%{$normalizedQuery}%");
            }
        })
        ->paginate(20);

        return Inertia::render('home', [
            'results' => $results,
            'filters' => $request->only(['search'])
        ]);
    }
}