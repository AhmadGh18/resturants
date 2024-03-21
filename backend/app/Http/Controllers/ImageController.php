<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function create(Request $request)
    {
        $formFields = $request->validate([
            'item_id' => "required|integer",
            'imgUrl' => 'required|file' // Use 'imgUrl' as per your validation rules
        ]);

        if ($request->hasFile('imgUrl')) { // Use 'imgUrl' here
            $file = $request->file('imgUrl');
            $fileName = now()->format('His') . $file->getClientOriginalName();

            $path = $file->store('images', 'public');

            // Create a new image record
            Image::create([
                'imgUrl' => $path,
                'item_id' => $formFields['item_id'], // Use the item_id from the validated form fields
            ]);

            // Optionally, return a response indicating success
            return response()->json(['message' => 'Image uploaded successfully']);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
