<?php

namespace App\Http\Controllers;

use App\Models\Saved_item;
use App\Models\Saved_restaurant;
use App\Models\User;
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
    public function userSavedRestaurants(Request $req)
    {
        $userId = $req->input('id');

        try {
            // Check if the user exists
            $user = User::find($userId);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404); // Not Found
            }

            // Fetch the user's saved restaurants along with their info
            $savedRestaurants = $user->savedRestaurants()->with('restaurant')->get();

            // Return the saved restaurants with name and profile picture
            return response()->json([
                'success' => true,
                'savedRestaurants' => $savedRestaurants
            ]);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }



}