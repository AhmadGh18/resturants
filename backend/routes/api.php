<?php

use App\Http\Controllers\ItemsController;
use App\Http\Controllers\RestaurantsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/items/addItem', [ItemsController::class, "create"]);
    Route::get('/restaurant/getByUserId/{userId}', [RestaurantsController::class, "getByUserId"]);
    Route::get('/restaurants/{restaurantId}/items', [ItemsController::class, 'getItemsByRestaurantId']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::post('/user/login', [UserController::class, "login"]);
Route::post('/user/signup', [UserController::class, "store"]);
Route::post('/user/updatelocation', [UserController::class, "updateLocation"]);
Route::post('/restaurant/create', [RestaurantsController::class, "create"]);
Route::post('/items/create', [ItemsController::class, "create"]);