<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Order;
use App\Models\Ordered_item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function create(Request $request)
    {
        $formFields = $request->validate([
            'cartItems' => ['required', 'array'],
            'user_id' => ['required', 'integer'],
            'longitude' => ['required', 'numeric'],
            'latitude' => ['required', 'numeric'],
            'city' => ['required', 'string'],
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'state' => ['required', 'string'],
            'phone' => ['required', 'string'],
        ]);

        // Get the restaurant ID from the first cart item
        $firstCartItem = $formFields['cartItems'][0];
        $restaurant_id = $firstCartItem['restaurant_id'];

        // Create the order
        $order = Order::create([
            'restaurant_id' => $restaurant_id, // Assume all items come from the same restaurant
            'user_id' => $formFields['user_id'],
            'longitude' => $formFields['longitude'],
            'latitude' => $formFields['latitude'],
            'city' => $formFields['city'],
            'first_name' => $formFields['first_name'],
            'last_name' => $formFields['last_name'],
            'state' => $formFields['state'],
            'phone' => $formFields['phone'],
        ]);

        // Loop through each cart item and create ordered_items
        foreach ($formFields['cartItems'] as $item) {
            Ordered_item::create([
                'order_id' => $order->id,
                'item_id' => $item['item_id'],
                'restaurant_id' => $item['restaurant_id'],
                'quantity' => $item['qnty'],
                // Add any additional fields you need
            ]);
        }

        return response()->json(['message' => 'Order added successfully']);
    }



    // public function show($orderId)
    // {
    //     // Retrieve the order
    //     $order = Order::findOrFail($orderId);

    //     // Retrieve the user information associated with the order
    //     $user = User::findOrFail($order->user_id);

    //     // Fetch order items along with their quantity
    //     $orderItems = Ordered_item::where('order_id', $order->id)->get();
    //     $itemInfo = [];
    //     foreach ($orderItems as $orderItem) {
    //         $item = Item::findOrFail($orderItem->item_id);
    //         $itemInfo[] = [
    //             'item_id' => $item->id,
    //             'name' => $item->title,
    //             'description' => $item->description,
    //             'price' => $item->price,
    //             'quantity' => $item->quantity,
    //         ];
    //     }

    //     // Prepare the data to return
    //     $orderInfo = [
    //         'order_id' => $order->id,
    //         'restaurant_id' => $order->restaurant_id,
    //         'user_id' => $order->user_id,
    //         'price' => $order->price,
    //         'longitude' => $order->longitude,
    //         'latitude' => $order->latitude,
    //         'state' => $order->state,
    //         'phone' => $order->phone,
    //         'city' => $order->city,
    //     ];

    //     $userInfo = [
    //         'user_id' => $user->id,
    //         'name' => $user->full_name, // Assuming there's a 'full_name' attribute in your User model
    //         'email' => $user->email,
    //     ];

    //     // Optionally, you can combine order and user info into a single array
    //     $orderAndUserInfo = [
    //         'order_info' => $orderInfo,
    //         'user_info' => $userInfo,
    //         'order_items' => $itemInfo, // Include item info in the response
    //     ];

    //     // Return the combined data
    //     return response()->json($orderAndUserInfo);
    // }
    public function show($orderId)
{
    // Retrieve the order
    $order = Order::findOrFail($orderId);

    // Retrieve the user information associated with the order
    $user = User::findOrFail($order->user_id);

    // Fetch order items along with their quantity
    $orderItems = Ordered_item::where('order_id', $order->id)->get();
    $itemInfo = [];
    foreach ($orderItems as $orderItem) {
        $item = Item::findOrFail($orderItem->item_id);
        $itemInfo[] = [
            'item_id' => $item->id,
            'name' => $item->title,
            'description' => $item->description,
            'price' => $item->price,
            'quantity' => $orderItem->quantity,
        ];
    }
    // Prepare the data to return
    $orderInfo = [
        'order_id' => $order->id,
        'restaurant_id' => $order->restaurant_id,
        'user_id' => $order->user_id,
        'price' => $order->price,
        'longitude' => $order->longitude,
        'latitude' => $order->latitude,
        'state' => $order->state,
        'phone' => $order->phone,
        'city' => $order->city,

    ];

    $userInfo = [
        'user_id' => $user->id,
        'name' => $user->full_name, // Assuming there's a 'full_name' attribute in your User model
        'email' => $user->email,
    ];

    // Optionally, you can combine order and user info into a single array
    $orderAndUserInfo = [
        'order_info' => $orderInfo,
        'user_info' => $userInfo,
        'order_items' => $itemInfo, // Include item info in the response
    ];

    // Return the combined data
    return response()->json($orderAndUserInfo);
}


    public function update(Request $request)
    {
        $data = $request->validate([
            "order_id" => "required|integer",
            "state" => "required|string",
        ]);


        $order = Order::findOrFail($data['order_id']);


        $order->state = $data['state'];
        $order->save();

        // Optionally, return a response indicating success
        return response()->json(['message' => 'Order state updated successfully']);
    }
    public function getOrderWithItems($orderId)
    {
        $order = Order::with('orderedItems')->findOrFail($orderId);

        return response()->json($order);
    }
    public function totalOrders($restId)
    {
        $totalOrders = Order::where('restaurant_id', $restId)->count();
        return response()->json(['total_orders' => $totalOrders]);
    }
    public function getNearestPoint($restaurantId)
    {
        // Get all orders for the restaurant
        $orders = Order::where('restaurant_id', $restaurantId)->get();

        // Initialize variables for calculating centroid
        $totalLat = 0.0;
        $totalLon = 0.0;
        $totalOrders = $orders->count();

        // Calculate total latitude and longitude
        foreach ($orders as $order) {
            // Convert latitude and longitude to float
            $lat = floatval($order->latitude);
            $lon = floatval($order->longitude);

            // Add to total
            $totalLat += $lat;
            $totalLon += $lon;
        }

        // Calculate centroid
        $centroidLat = $totalLat / $totalOrders;
        $centroidLon = $totalLon / $totalOrders;

        // Now you have the latitude and longitude of the centroid
        return [
            'latitude' => $centroidLat,
            'longitude' => $centroidLon
        ];
    }
    public function showRestaurantsOrders($resId)
    {
        // Fetch orders along with user's full name
        $orders = DB::table('orders')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select('orders.*', 'users.full_name')
            ->where('orders.restaurant_id', $resId)
            ->get();

        return response()->json($orders);
    }
    public function revenuePerMonth($restaurant)
    {
        $revenuePerMonth = Order::where('orders.restaurant_id', $restaurant)
            ->join('ordered_items', 'orders.id', '=', 'ordered_items.order_id')
            ->join('items', 'ordered_items.item_id', '=', 'items.id')
            ->selectRaw('DATE_FORMAT(orders.created_at, "%Y-%m") as month, SUM(ordered_items.quantity * items.price) as total_revenue')
            ->groupBy('month') // Group by the formatted month
            ->orderBy('month') // Order by month
            ->get();

        return response()->json($revenuePerMonth);
    }


}