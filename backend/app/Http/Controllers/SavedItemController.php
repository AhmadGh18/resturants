<?php

namespace App\Http\Controllers;

use App\Models\Saved_item;
use Illuminate\Http\Request;

class SavedItemController extends Controller
{
    public function saveItem(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'item_id' => 'required|exists:items,id',
        ]);

        // Check if the item is already saved for the user
        $existingSavedItem = Saved_item::where('user_id', $request->user_id)
                                        ->where('item_id', $request->item_id)
                                        ->first();

        // If the item is already saved, delete it to "unsave" it
        if ($existingSavedItem) {
            $existingSavedItem->delete();
            return response()->json(['message' => 'Item unsaved successfully'], 200);
        } else {
            // If the item is not saved, create a new Saved_item instance to "save" it
            $savedItem = Saved_item::create([
                'user_id' => $request->user_id,
                'item_id' => $request->item_id,
            ]);

            // Return a response indicating success
            return response()->json(['message' => 'Item saved successfully'], 200);
        }
    }



}