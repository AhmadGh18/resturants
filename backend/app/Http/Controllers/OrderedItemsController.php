<?php

namespace App\Http\Controllers;

use App\Models\Ordered_item;
use Illuminate\Http\Request;

class OrderedItemsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
            'item_id' => 'required|integer|exists:items,id',
        ]);

        // Create the ordered item
        $orderedItem = Ordered_item::create($data);

        return response()->json(['message' => 'Ordered item created successfully']);
    }
    public function show($orderedItemId)
    {

        $orderedItem = Ordered_item::findOrFail($orderedItemId);


        return response()->json($orderedItem);
    }
}