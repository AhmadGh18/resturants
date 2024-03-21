<?php

namespace App\Http\Controllers;

use App\Http\Requests\Restaurantrequest;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;

class RestaurantsController extends Controller
{

    public function create(Restaurantrequest $request)
    {
        $data = $request->validated();

        $restaurantData = [
            'user_id' => $data['user_id'],
            'name' => $data['name'],
            'city' => $data['city'],
            'longitude' => $data['longitude'],
            'latitude' => $data['latitude'],
            'type' => $data['type'],
            'phoneNumber' => $data['phoneNumber'],
        ];


        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $fileName = now()->format('His') . $file->getClientOriginalName();

            $path = $file->store('images', 'public');

            // Assign the path to the 'image' field in $restaurantData
            $restaurantData['profile_picture'] = $path; // Use $restaurantData instead of $data
        }

        $restaurant = Restaurant::create($restaurantData);


        return response()->json([
            'message' => 'User registered successfully',
            "restaurant" => $restaurant
        ]);
    }
}
