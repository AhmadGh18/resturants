<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Order;
use App\Models\Ordered_item;
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
            'state' => 'required|string',
            'items' => 'required|array', // Assuming 'items' is an array of item_ids
        ]);

        // Create the order
        $order = Order::create($formFields);

        // Create order items
        foreach ($formFields['items'] as $item_id) {
            Ordered_item::create([
                'order_id' => $order->id,
                'item_id' => $item_id,
            ]);
        }

        return response()->json(['message' => 'Order added successfully']);
    }
    public function show($orderId)
    {
        // Retrieve the order
        $order = Order::findOrFail($orderId);

        // Retrieve the user information associated with the order
        $user = User::findOrFail($order->user_id);

        // Retrieve order items associated with the order
        $orderItems = Ordered_item::where('order_id', $order->id)->get();

        // Retrieve item information for each order item
        $itemInfo = [];
        foreach ($orderItems as $orderItem) {
            $item = Item::findOrFail($orderItem->item_id);
            $itemInfo[] = [
                'item_id' => $item->id,
                'name' => $item->title,
                'description' => $item->description,
                'price' => $item->price,
                // Add other item attributes you want to include in the response
            ];
        }

        // Prepare the data to return
        $orderInfo = [
            'order_id' => $order->id,
            'restaurant_id' => $order->restaurant_id,
            'user_id' => $order->user_id,
            'price' => $order->price,
            'destination' => $order->destination,
            'state' => $order->state,
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
}