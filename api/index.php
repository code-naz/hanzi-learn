<?php
// api/index.php

// 1. Paksa tampilkan error PHP mentah (karena Laravel-mu belum bangun)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 2. Panggil bootstrap Laravel
require __DIR__ . '/../public/index.php';
