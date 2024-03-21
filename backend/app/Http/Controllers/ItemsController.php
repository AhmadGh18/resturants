<?php

namespace App\Http\Controllers;

use App\Http\Requests\Itemrequest;
use App\Models\Item;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function create(Itemrequest $req)
    {
        $data = $req->validated();

        if ($req->hasFile('thumbnail')) {
            $file = $req->file('thumbnail');
            $fileName = now()->format('His') . $file->getClientOriginalName();

            $path = $file->store('images', 'public');

            // Assign the path to the 'image' field in $restaurantData
            $data['thumbnail'] = $path; // Use $restaurantData instead of $data
        }



        Item::create($data);
        return response()->json(['message' => 'Item Added successfully']);
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