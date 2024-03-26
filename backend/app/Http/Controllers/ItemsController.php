<?php

namespace App\Http\Controllers;

use App\Http\Requests\Itemrequest;
use App\Models\Image;
use App\Models\Item;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ItemsController extends Controller
{

    public function getItemsByRestaurantId(Request $request, $restaurantId)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant) {
            return response()->json(['error' => 'Restaurant not found'], 404);
        }

        // Fetch items associated with the restaurant along with their images
        $items = Item::with('images')->where('restaurant_id', $restaurantId)->get();

        return response()->json(['items' => $items]);

    }


 public function create(ItemRequest $request)
 {
     try {
         // Validate the request data
         $itemData = $request->validated();

         // Handle thumbnail upload if present
         if ($request->hasFile('thumbnail')) {
             $thumbnailFile = $request->file('thumbnail');
             $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
             $itemData['thumbnail'] = $thumbnailPath;
         }

         // Create the item record
         $item = Item::create($itemData);

         // Get the ID of the created item
         $itemId = $item->id;



         if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $fileName = now()->format('His') . $file->getClientOriginalName();

                $path = $file->store('images', 'public');

                Image::create([
                    'imgUrl' => $path,
                    'item_id' => $itemId,
                ]);
            }

            return response()->json(['message' => 'Images uploaded successfully']);
        }else{
            return response()->json(['error' => 'No img addde.'], 404);

         }


     } catch (\Exception $e) {
         // Log error message
         Log::error('Error creating item: ' . $e->getMessage());

         // Return error response
         return response()->json(['error' => 'Failed to create item.'], 500);
     }
 }








    public function update(ItemRequest $req, Item $item)
    {
        $data = $req->validated();

        if ($req->hasFile('thumbnail')) {
            $file = $req->file('thumbnail');
            $fileName = now()->format('His') . $file->getClientOriginalName();

            $path = $file->store('images', 'public');

            $data['thumbnail'] = $path;
        }
        $item->update($data);

        return response()->json(['message' => 'Item updated successfully']);
    }

    public function destroy(Item $item)
    {
        // Delete the item
        $item->delete();

        // Optionally, return a response indicating success
        return response()->json(['message' => 'Item deleted successfully']);
    }
}