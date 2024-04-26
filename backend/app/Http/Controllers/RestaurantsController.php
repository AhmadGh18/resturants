<?php

namespace App\Http\Controllers;

use App\Http\Requests\Restaurantrequest;
use App\Models\Feedback;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantsController extends Controller
{
    public function getByUserId($userId)
{
    // Retrieve the restaurant based on the user ID
    $restaurant = Restaurant::where('user_id', $userId)->first();

    if ($restaurant) {
        $feedbacks = Feedback::where('user_id', $userId)->get();

        $ratingCount = $feedbacks->count();
        $totalRating = $feedbacks->sum('stars');
        $averageRating = $ratingCount > 0 ? $totalRating / $ratingCount : 0;


        return response()->json([
            'restaurant' => $restaurant,
            'rating_count' => $ratingCount,
            'average_rating' => $averageRating,
        ]);
    } else {
        // Handle the case where no restaurant is found for the given user ID
        return response()->json(['error' => 'Restaurant not found'], 404);
    }
}


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
            "deleviery_range"=>$data['deleviery_range']
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
    public function getNearbyRestaurants(Request $request)
    {
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        $radius = 5;

        $nearbyRestaurants = DB::table('restaurants')
            ->select('*')
            ->selectRaw('( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
            ->having('distance', '<', $radius)
            ->get();

        return response()->json($nearbyRestaurants);
    }


    public function update(Request $request)
    {
        $validatedData = $request->validate([

            'longitude' => 'nullable|numeric',
            'latitude' => 'nullable|numeric',
            'city' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
            'name' => 'nullable|string',
            'type' => 'nullable|string',
            'bio' => 'nullable|string',
            'profile_picture' => 'file|nullable',
            'user_id' => 'required|integer',
        ]);
        $restaurant = Restaurant::findOrFail($validatedData['user_id']);


        if ($restaurant->user_id != $validatedData['user_id']) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Update the restaurant item with the validated data
        $restaurant->update($validatedData);

        // Return a response indicating success
        return response()->json(['message' => 'Restaurant item updated successfully']);
    }



public function deleteRestaurant(Request $request){

 $validatedData = $request->validate([
    'restaurantId' => 'required|integer',
]);


$restaurant = Restaurant::find($validatedData['restaurantId']);

// Check if the restaurant exists
if (!$restaurant) {
    return response()->json(['error' => 'Restaurant not found'], 404);
}

$restaurant->delete();

return response()->json(['message' => 'Restaurant deleted successfully']);
}
public function getAll()
{
    $restaurants = Restaurant::all()->map(function ($restaurant) {
        $feedbacks = Feedback::where('restaurant_id', $restaurant->id)

        ->get();

$ratingCount = $feedbacks->count();
$totalRating = $feedbacks->sum('stars');
$averageRating = $ratingCount > 0 ? $totalRating / $ratingCount : 0;


        return [
            'id' => $restaurant->id,
            'name' => $restaurant->name,
            'city' => $restaurant->city,
            'phone' => $restaurant->phone,
            'email' => $restaurant->email,
            'rating_count' => $ratingCount,
            'profile_picture' => $restaurant->profile_picture,
            'average_rating' => $averageRating,
            "type" =>$restaurant->type
        ];
    });

    return response()->json(['restaurants' => $restaurants]);
}

public function getRestaurantWithItems($id)
{
    $restaurant = Restaurant::findOrFail($id);
    $items = $restaurant->items;

    $feedbacks = Feedback::where('restaurant_id', $id)->get();

    // Filter out feedbacks with a rating of 0
    $filteredFeedbacks = $feedbacks->filter(function ($feedback) {
        return $feedback->stars > 0;
    });

    $ratingCount = $filteredFeedbacks->count();
    $totalRating = $filteredFeedbacks->sum('stars');
    $averageRating = $ratingCount > 0 ? $totalRating / $ratingCount : 0;

    return response()->json([
        'restaurant' => $restaurant,
        'items' => $items,
        'averageRating' => $averageRating,
        'ratingCount' => $ratingCount,
    ]);
}

    public function getByType($type)
    {
        try {
            $restaurants = Restaurant::where('type', $type)
                                     ->inRandomOrder()
                                     ->limit(5)
                                     ->get();
            return response()->json($restaurants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

}