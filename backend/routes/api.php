<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KinController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Social Routes
    Route::get('/social/friends', [App\Http\Controllers\Api\SocialController::class, 'index']);
    Route::get('/social/search', [App\Http\Controllers\Api\SocialController::class, 'search']);
    Route::post('/social/request', [App\Http\Controllers\Api\SocialController::class, 'sendRequest']);
    Route::post('/social/accept/{requestId}', [App\Http\Controllers\Api\SocialController::class, 'acceptRequest']);
    Route::get('/social/combined/{friendId}', [App\Http\Controllers\Api\SocialController::class, 'getCombinedKin']);

    // Synastry Route
    Route::post('/synastry/calculate', [App\Http\Controllers\Api\SynastryController::class, 'calculate']);
});

Route::get('/livekit/token', [App\Http\Controllers\LiveKitController::class, 'getToken']);

Route::get('/kines', [KinController::class, 'index']);
Route::get('/kines/today', [KinController::class, 'today']);
Route::get('/kines/{kin_number}', [KinController::class, 'show']);

Route::post('/assistant/ask', [App\Http\Controllers\Api\OracleController::class, 'ask']);
Route::post('/oracle/prophesy', [App\Http\Controllers\Api\OracleController::class, 'prophesy']);
