<?php

namespace App\Http\Controllers;

use App\Http\Requests\Itemrequest;
use App\Models\Image;
use App\Models\Item;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ItemsController extends Controller
{
    public function getAll()
    {
        $items = Item::select('items.*', 'restaurants.name as restaurant_name', 'restaurants.profile_picture')
                     ->join('restaurants', 'items.restaurant_id', '=', 'restaurants.id')
                     ->inRandomOrder() // Shuffle the items
                     ->limit(20) // Limit the number of items to 20
                     ->get();

        return $items;
    }


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
         $itemData = $request->validated();


         if ($request->hasFile('thumbnail')) {
             $thumbnailFile = $request->file('thumbnail');
             $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
             $itemData['thumbnail'] = $thumbnailPath;
         }


            $item = Item::create($itemData);

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
    public function singleItem($itemId)
    {
        $item = Item::with('images', 'restaurant')->findOrFail($itemId);

        $responseData = [
            'item' => $item,
            'restaurant_name' => $item->restaurant->name,
            'images' => $item->images


        ];

        return response()->json($responseData);
    }

    public function getbyCategory(Request $request, $category)
    {

        $items = Item::where('category', $category)
                     ->with('restaurant')
                     ->inRandomOrder()
                     ->take(5)
                     ->get();

        return response()->json($items);
    }
    public function CheckoutItems(Request $request){
        $ids = $request->input('ids');

        $items = Item::with('images', 'restaurant')->whereIn('id', $ids)->get();

        $responseData = [
            'items' => $items,
            // Here you can add more data if needed
        ];

        return response()->json($responseData);
    }
    public function search(Request $request)
    {
        $searchTerm = $request->input('q');

        // Perform a search query on your Item model
        $items = Item::where('title', 'like', '%' . $searchTerm . '%')->limit(20)->get();

        return response()->json($items);
    }
    public function totalItemsPosted($restId)
    {
        $totalItems = Item::where('restaurant_id', $restId)->count();
        return response()->json(['total_items' => $totalItems]);
    }
    public function updateItem(Request $request)
    {

        $request->validate([
            'id' => 'required|exists:items,id',
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size if needed
            'imagesToDelete' => 'array', // Ensure it's an array
            'imagesToDelete.*' => 'exists:images,id', // Check if each ID exists in the item_images table
            'tags'=>'string', //
        ]);

        $itemId = $request->id;

        // Find the item
        $item = Item::findOrFail($itemId);


        $item->title = $request->title;
        $item->price = $request->price;
        $item->category = $request->category;
        $item->description = $request->description;
        $item->tags=$request->tags;

        // Handle thumbnail
        if ($request->hasFile('thumbnail')) {
            $thumbnailFile = $request->file('thumbnail');
            $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
            $itemData['thumbnail'] = $thumbnailPath;
            $item->thumbnail = $thumbnailPath; // Update thumbnail path in the database

        }

        // Handle images deletion
        if ($request->has('imagesToDelete')) {
            foreach ($request->imagesToDelete as $imageId) {
                // Find the image to delete
                $image = Image::findOrFail($imageId);

                // Delete the image from storage
                Storage::delete($image->imgUrl); // Assuming the image path is stored in the database

                // Delete the image record from the database
                $image->delete();
            }
        }

        // Save the updated item
        $item->save();

        return response()->json(['message' => 'Item updated successfully'], 200);
    }
    public function deleteItem($itemId)
    {
        // Find the item
        $item = Item::findOrFail($itemId);

        // Delete the images from storage
        foreach ($item->images as $image) {
            Storage::delete($image->imgUrl);
        }

        // Delete the item
        $item->delete();

        return response()->json(['message' => 'Item and associated images deleted successfully']);
    }
}