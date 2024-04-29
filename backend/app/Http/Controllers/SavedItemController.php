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
    public function getUserSavedItems(Request $request)
    {
        $userId = $request->input('id');

        try {
            // Fetch user's saved items along with item details
            $savedItems = Saved_item::where('user_id', $userId)
                ->with('item') // Load the related item data
                ->get();

            // Return the saved items along with item details
            return response()->json([
                'success' => true,
                'savedItems' => $savedItems
            ]);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500); // Internal Server Error
        }
}


    public function unlike(Request $request, $userId, $itemId)
    {
        try {
            // Find the saved item by user ID and item ID
            $savedItem = Saved_item::where('user_id', $userId)
                ->where('item_id', $itemId)
                ->first();

            if ($savedItem) {
                // Delete the saved item if found
                $savedItem->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Item unliked successfully'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Saved item not found'
                ], 404); // Not Found
            }
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }


    public function checkifItemissaved(Request $request, $userId, $itemId)
    {
        try {
            // Check if the item is saved for the user
            $savedItem = Saved_item::where('user_id', $userId)
                ->where('item_id', $itemId)
                ->first();

            // Return 1 if saved, 0 if not
            if ($savedItem) {
                return response()->json([
                    'success' => true,
                    'saved' => 1
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'saved' => 0
                ]);
            }
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }



}