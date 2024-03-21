<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function create(Request $request)
    {
        $formFields = $request->validate([
            'restaurant_id' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
            'price' => ['required'],
            'destination' => 'required|string',
            "has_restaurant" => "required|integer",
        ]);
    }
    public function show($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Retrieve the user information associated with the order
        $user = User::findOrFail($order->user_id);

        // Prepare the data to return
        $orderInfo = [
            'order_id' => $order->id,
            'restaurant_id' => $order->restaurant_id,
            'user_id' => $order->user_id,
            'price' => $order->price,
            'destination' => $order->destination,
            "state" => $order->state,
        ];

        $userInfo = [
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];

        // Optionally, you can combine order and user info into a single array
        $orderAndUserInfo = [
            'order_info' => $orderInfo,
            'user_info' => $userInfo,
        ];

        // Return the combined data
        return response()->json($orderAndUserInfo);
    }
    public function updateState(Request $request)
    {
        $data = $request->validate([
            "order_id" => "required|integer",
            "state" => "required|string",
        ]);


        $order = Order::findOrFail($data['order_id']);

        // Update the state
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
}
