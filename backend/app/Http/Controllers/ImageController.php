<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function create(Request $request)
    {
        $formFields = $request->validate([
            // 'item_id' => "required|integer",
            'imgUrl.*' => 'required|image'
        ]);

        if ($request->hasFile('imgUrl')) {
            foreach ($request->file('imgUrl') as $file) {
                $fileName = now()->format('His') . $file->getClientOriginalName();

                $path = $file->store('images', 'public');

                Image::create([
                    'imgUrl' => $path,
                    'item_id' => 35,
                ]);
            }

            return response()->json(['message' => 'Images uploaded successfully']);
        }
    }

}