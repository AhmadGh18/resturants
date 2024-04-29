<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\User;
use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ViewsController extends Controller
{
    public function profileview($userId, $restId)
    {
        $user = User::findOrFail($userId);
        $restaurant = Restaurant::findOrFail($restId);
        $view = View::create([
            'user_id' => $user->id,
            'restaurant_id' => $restaurant->id,

        ]);

        return response()->json(['message' => 'Profile view created successfully'], 200);
    }
    public function profileviewOfrestuarant($restId)
    {
        // Retrieve the profile views of the restaurant for each month
        $profileViews = View::where('restaurant_id', $restId)
            ->selectRaw('YEAR(created_at) AS year, MONTH(created_at) AS month, COUNT(*) AS total')
            ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
            ->get();

        return $profileViews;
    }


    public function profileviewForPost(Request $req)
{
    $data = $req->validate([
        "user_id" => "integer|required",
        "restaurant_id" => "integer|required",
        "created_at" => "nullable|date_format:Y-m-d H:i:s", // Adjust format as needed
    ]);

    // Set default value for created_at if not provided
    $data['created_at'] = $data['created_at'] ?? now()->format('Y-m-d H:i:s');

    $view = View::create($data);

    return response()->json(['message' => 'Profile view created successfully'], 201);
}
// public function topCustomers($restId)
// {

//     $userCountsByCity = View::join('users', 'views.user_id', '=', 'users.id')
//         ->select('users.city', DB::raw('COUNT(DISTINCT views.user_id) as user_count'))
//         ->where('views.restaurant_id', $restId)
//         ->groupBy('users.city')
//         ->get();

//     // Transform the results into a formatted array
//     $formattedCounts = $userCountsByCity->map(function ($item) {
//         return [
//             'city' => $item->city,
//             'user_count' => $item->user_count,
//         ];
//     });

//     // Return the formatted array
//     return response()->json($formattedCounts);
// }

public function topCustomers($restId)
{
    $userCountsByCity = View::join('users', 'views.user_id', '=', 'users.id')
        ->select('users.city', DB::raw('COUNT(DISTINCT views.user_id) as user_count'))
        ->where('views.restaurant_id', $restId)
        ->groupBy('users.city')
        ->orderByDesc('user_count') // Order by user_count to get the top cities first
        ->limit(5) // Limit the results to the top 5 cities
        ->get();

    // Return the formatted array directly
    return response()->json($userCountsByCity);
}
public function totalViews($restId)
{
    $totalViews = View::where('restaurant_id', $restId)->count();
    return response()->json(['total_views' => $totalViews]);
}
}