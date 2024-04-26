<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function create(Request $req) {
        $data = $req->validate([
            "user_id" => "integer|required",
            "restaurant_id" => "integer|required",
            "stars" => "integer|required",
            "feedback" => "string|nullable",
        ]);

        // Create the new feedback
        $feedback = Feedback::create($data);

        // Retrieve all feedbacks for the given restaurant ID, ordered by creation time in descending order
        $feedbacks = Feedback::where('restaurant_id', $data['restaurant_id'])
            ->join('users', 'feedback.user_id', '=', 'users.id')
            ->select('feedback.*', 'users.full_name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($feedbacks);
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
function getUserRatingOfRestaurant($userId, $restaurantId){


        try {
            // Find the feedback for the specified user and restaurant
            $feedback = Feedback::where('user_id', $userId)
            ->where('restaurant_id', $restaurantId)
            ->latest()  // Orders the results by the created_at timestamp in descending order
            ->first();
            // If feedback exists, return it
            if ($feedback) {
                return response()->json($feedback, 200);
            } else {
                return response()->json(['message' => 'Feedback not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function GetAllFeedbackOfSingleRestaurant($restaurantId)
    {
        // Retrieve all feedbacks for the given restaurant ID ordered by creation time (descending)
        $feedbacks = Feedback::where('restaurant_id', $restaurantId)
            ->join('users', 'feedback.user_id', '=', 'users.id')
            ->select('feedback.*', 'users.full_name')
            ->orderBy('created_at', 'desc') // Order by creation time descending
            ->get();

        return $feedbacks;
    }

    public function delete($id)
    {
        try {

            $feedback = Feedback::findOrFail($id);


            $feedback->delete();

            return response()->json(['message' => 'Feedback deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete feedback'], 500);
        }
    }

}