<?php

use App\Http\Controllers\RestaurantsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/restaurant/create', [RestaurantsController::class, "create"]);


    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::post('/user/login', [UserController::class, "login"]);
Route::post('/user/signup', [UserController::class, "store"]);
Route::post('/user/updatelocation', [UserController::class, "updateLocation"]);
