<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\HasApiTokens; // Import the trait
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function index()
    {
        return User::select('id', 'full_name', 'email', 'password', "has_restaurant")->get();
    }
    //store is signup // add user Info
    public function store(Request $request)
    {


        $formFields = $request->validate([
            'first_name' => ['required', 'min:3'],
            'last_name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required|confirmed|min:6',
            "has_restaurant" => "required|integer",
            "user_phone" => 'numeric|min:10',
            "city" => "nullable|string"
        ]);

        $formFields['full_name'] = $formFields['first_name'] . ' ' . $formFields['last_name'];

        // Hash the password
        $formFields['password'] = bcrypt($formFields['password']);

        $user = User::create($formFields);
        $token = $user->createToken('main', ['expires_in' => 86400])->plainTextToken;


        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'error' => 'User not found',
            ], 404);
        }

        if (Hash::check($password, $user->password)) {
        //     $token = $user->createToken('auth-token', ['expires_in' => 120])->plainTextToken;

        // $token1= $user->createToken('auth-token', ['*'], now()->addWeek())->plainTextToken;

        $token = $user->createToken('main', ['expires_in' => 86400])->plainTextToken;

            return response()->json([
                'token' => $token,
                'type' => 'user',
                'user' => [
                    'full_name' => $user->full_name,
                    'email' => $user->email,
                    'long' => $user->long,
                    'lat' => $user->lat,
                    'city' => $user->city,
                    'has_restaurant' => $user->has_restaurant,
                ],
            ]);
        } else {
            return response()->json([
                'error' => 'Incorrect password for user',
            ], 401);
        }
    }



    public function show(User $user)
    {
        return response()->json([
            'user' => [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' => $user->email
            ]
        ]);
    }

    public function updateLocation(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'id' => 'required|integer', // Assuming the user ID is provided in the request
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'city' => 'required|string',
        ]);

        // Retrieve the user with the provided ID
        $user = User::find($validatedData['id']);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the city is currently set to "not set" or is empty
        if ($user->city === "not set" || empty($user->city)) {
            // Update user's location
            $user->update([
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
                'city' => $validatedData['city'],
            ]);

            return response()->json(['message' => 'User location updated successfully'], 200);
        } else {
            // City is already set, return a message indicating that no update was performed
            return response()->json(['message' => 'User location is already set and cannot be updated'], 400);
        }
    }
}