<?php

namespace App\Http\Controllers;

use App\Http\Requests\Restaurantrequest;
use App\Models\Feedback;
use App\Models\Item;
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
        $feedbacks = Feedback::where('restaurant_id', $restaurant->id)->get();

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
    // public function getNearbyRestaurants(Request $request)
    // {
    //     $latitude = $request->input('latitude');
    //     $longitude = $request->input('longitude');
    //     $radius = 5;

    //     $nearbyRestaurants = DB::table('restaurants')
    //         ->select('*')
    //         ->selectRaw('( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
    //         ->having('distance', '<', $radius)
    //         ->get();
    //         $restaurants = $nearbyRestaurants->map(function ($restaurant) {
    //             $feedbacks = Feedback::where('restaurant_id', $restaurant->id)->get();

    //             $ratingCount = $feedbacks->count();
    //             $totalRating = $feedbacks->sum('stars');
    //             $averageRating = $ratingCount > 0 ? $totalRating / $ratingCount : 0;

    //             $restaurant->rating = $averageRating; // Adding average rating to each restaurant
    //             return $restaurant;
    //         });




    //     return response()->json($nearbyRestaurants);


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

    $restaurants = $nearbyRestaurants->map(function ($restaurant) {
        $feedbacks = Feedback::where('restaurant_id', $restaurant->id)->get();

        $ratingCount = $feedbacks->count();
        $totalRating = $feedbacks->sum('stars');
        $averageRating = $ratingCount > 0 ? $totalRating / $ratingCount : 0;

        $restaurant->rating = $averageRating; // Adding average rating to each restaurant
        $restaurant->rating_count = $ratingCount; // Adding rating count to each restaurant
        return $restaurant;
    });

    return response()->json($restaurants);
}

    // }
    // public function getNearbyRestaurants(Request $request)
    // {
    //     $latitude = $request->input('latitude');
    //     $longitude = $request->input('longitude');
    //     $radius = 5;

    //     $nearbyRestaurants = DB::table('restaurants')
    //         ->select('restaurants.*')
    //         ->selectRaw('( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
    //         ->selectRaw('IFNULL(AVG(feedbacks.stars), 0) AS average_rating') // Calculate average rating
    //         ->leftJoin('feedbacks', 'restaurants.id', '=', 'feedbacks.restaurant_id') // Join feedbacks table
    //         ->groupBy('restaurants.id')
    //         ->having('distance', '<', $radius)
    //         ->get();

    //     return response()->json($nearbyRestaurants);
    // }


    public function update(Request $request, Restaurant $resIt)
    {
        $validatedData = $request->validate([
            'city' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
            'name' => 'nullable|string',
            'type' => 'nullable|string',
            'bio' => 'nullable|string',
            "deleviery_range" => 'nullable|numeric',
        ]);
        $resIt->update($validatedData);

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

    $ratingCount = $feedbacks->count();
    $totalRating = $feedbacks->sum('stars');
    $averageRating = $ratingCount > 0 ? $totalRating / $ratingCount : 0;


    return response()->json([
        'restaurant' => $restaurant,
        'items' => $items,
        'averageRating' => $averageRating,
        'ratingCount' => $ratingCount,
    ]);
}

public function getRestaurantsByIds(Request $request)
{
    try {
        $ids = $request->input('ids'); // Fetch the ids from the request

        $restaurants = Restaurant::whereIn('id', $ids)->get();
        return response()->json($restaurants);
    } catch (\Exception $e) {
        // If an error occurs, return an error response
        return response()->json(['error' => 'An error occurred while fetching restaurants.'], 500);
    }
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
    public function getRestaurantbyproductId($productId)
    {

        $product = Item::findOrFail($productId);


        $restaurant = $product->restaurant;

        // Return the restaurant data
        return response()->json($restaurant);
    }
    public function getRatingwithperctetage($restId)
    {
        // Get all feedbacks for the restaurant
        $feedbacks = Feedback::where('restaurant_id', $restId)->get();


        $ratingCounts = $feedbacks->groupBy('stars')
            ->mapWithKeys(function ($group, $rating) use ($feedbacks) {
                $percentage = ($group->count() / $feedbacks->count()) * 100;
                return [$rating => round($percentage, 2)];
            });

        return response()->json($ratingCounts);
    }
    public function TopOrderdItems($restId)
    {
        $topOrderedItems = DB::table('ordered_items as oi')
            ->select(
                'oi.item_id',
                'i.title',
                'i.price',
                'i.description',
                'i.thumbnail',
                DB::raw('SUM(oi.quantity) AS total_quantity_ordered')
            )
            ->join('items as i', 'oi.item_id', '=', 'i.id')
            ->where('oi.restaurant_id', $restId)
            ->groupBy('oi.item_id', 'i.title', 'i.price', 'i.description', 'i.thumbnail')
            ->orderByDesc('total_quantity_ordered')
            ->limit(5)
            ->get();

        return response()->json($topOrderedItems);
    }


}