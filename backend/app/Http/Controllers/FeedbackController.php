<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function create(Request $req){
        $data = $req->validate([
            "user_id" => "integer|required",
            "restaurant_id" => "integer|required",
            "stars" => "integer|required",
            "feedback" => "string",
        ]);

        Feedback::create($data);
        return response()->json(['Message' => 'Feedback Added successfully']);
    }
    public function update(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);

        $data = $request->validate([
            "user_id" => "integer|required",
            "restaurant_id" => "integer|required",
            "stars" => "integer|required",
            "feedback" => "string",
        ]);

        $feedback->update($data);

        return response()->json(['message' => 'Feedback updated successfully']);
    }

}
