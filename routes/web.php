<?php

use Inertia\Inertia;
use App\Http\Controllers\HanziController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HanziController::class, 'index'])->name('home');