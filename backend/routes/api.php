<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KinController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/kines', [KinController::class, 'index']);
Route::get('/kines/today', [KinController::class, 'today']);
Route::get('/kines/{kin_number}', [KinController::class, 'show']);
