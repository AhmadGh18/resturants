<?php

namespace App\Http\Controllers;

use App\Models\Saved_restaurant;
use Illuminate\Http\Request;

class Saved_restaurant_Controller extends Controller
{
    public function create(Request $request)
    {
        // Validate the request data
        $data = $request->validate([
            'user_id' => 'required|integer',
            'restaurant_id' => 'required|integer',
        ]);

        Saved_restaurant::create($data);


        $savedRestaurants = Saved_restaurant::where('user_id', $data['user_id'])->get();

        return response()->json([
            'message' => 'Restaurant saved successfully',
            'saved_restaurants' => $savedRestaurants,
        ]);
    }

    public function checkIfUserSavedThisRestaurant($userId, $restaurantId)
    {
        $savedRestaurant = Saved_restaurant::where('user_id', $userId)
            ->where('restaurant_id', $restaurantId)
            ->exists();


        $result = $savedRestaurant ? 1 : 0;

        // Return the response with the status
        return response()->json([
            'result' => $result,
            'savedRestaurant'=>$savedRestaurant,
        ]);
    }
    public function removeSavedItem($userId, $restaurantId)
    {

        Saved_restaurant::where('user_id', $userId)
            ->where('restaurant_id', $restaurantId)
            ->delete();


        return response()->json([
            'message' => 'Saved item removed successfully',
        ]);
    }

}