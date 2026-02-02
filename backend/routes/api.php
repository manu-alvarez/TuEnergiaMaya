<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KinController;
use App\Http\Controllers\Api\OracleController;

// Public Kin Endpoints
Route::get('/kines', [KinController::class, 'index']);
Route::get('/kines/today', [KinController::class, 'today']);
Route::get('/kines/{kin_number}', [KinController::class, 'show']);

// AI Assistant Endpoints
Route::post('/assistant/ask', [OracleController::class, 'ask']);
Route::post('/oracle/prophesy', [OracleController::class, 'prophesy']);

// Protected Routes (for future user features)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
