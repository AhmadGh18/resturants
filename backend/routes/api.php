<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\RestaurantsController;
use App\Http\Controllers\Saved_restaurant_Controller;
use App\Http\Controllers\SavedItemController;
use App\Http\Controllers\UserController;
use App\Models\Saved_restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {


    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::post('/items/addItem', [ItemsController::class, "create"]);
Route::get('/restaurant/getByUserId/{userId}', [RestaurantsController::class, "getByUserId"]);
Route::get('/restaurants/{restaurantId}/items', [ItemsController::class, 'getItemsByRestaurantId']);
Route::delete("/feedbacks/delete/{id}", [FeedbackController::class, 'delete']);
Route::post('/user/login', [UserController::class, "login"]);
Route::post('/user/signup', [UserController::class, "store"]);
Route::post('/user/updatelocation', [UserController::class, "updateLocation"]);
Route::post('/restaurant/create', [RestaurantsController::class, "create"]);
Route::post('/items/create', [ItemsController::class, "create"]);
Route::get('/restaurant/getnearbyrestaurants', [RestaurantsController::class, "getnearbyrestaurants"]);
Route::post('/images/add',[ImageController::class, "create"]);
Route::put('/restaurant/update',[RestaurantsController::class, "update"]);
Route::post('/orders/create',[OrdersController::class, "create"]);
Route::put('/orders/update',[OrdersController::class, "update"]);
Route::put('/orders/getItems',[OrdersController::class, "getOrderWithItems"]);
Route::get('/orders/{orderId}', [OrdersController::class, 'show']);
Route::post('/feedback/create', [FeedbackController::class, 'create']);
Route::put('/feedback/update/{id}', [FeedbackController::class, 'update']);
Route::put('/restaurant/update', [RestaurantsController::class, "update"]);
Route::get('/restaurant/getAll', [RestaurantsController::class, "getAll"]);
Route::get('/items/getAll', [ItemsController::class, "getAll"]);
Route::get('/items/{itemId}', [ItemsController::class, 'singleitem']);
Route::get('/restaurantsItems/{id}', [RestaurantsController::class, 'getRestaurantWithItems']);
Route::post('/user/likeitem', [SavedItemController::class, 'saveItem']);
Route::get('/user/getUserRatingOfRestaurant/{userId}/{restaurantId}', [FeedbackController::class, 'getUserRatingOfRestaurant']);
Route::get('/feedback/getAll/{restaurantId}', [FeedbackController::class, 'GetAllFeedbackOfSingleRestaurant']);
Route::post('/saverestaurant', [Saved_restaurant_Controller::class, 'create']);
Route::get('/allsavedofuser/{id}/{restaurantId}', [Saved_restaurant_Controller::class, 'checkIfUserSavedThisRestaurant']);
Route::post('/unsaveitem/{id}/{restaurantId}', [Saved_restaurant_Controller::class, 'removeSavedItem']);
Route::get('/items/categories/{category}', [ItemsController::class, "getbyCategory"]);
Route::get('/restaurants/type/{type}', [RestaurantsController::class, "getbyType"]);
Route::get('/CheckoutItems', [ItemsController::class, 'CheckoutItems']);