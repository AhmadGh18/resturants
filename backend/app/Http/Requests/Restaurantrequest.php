<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class Restaurantrequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "user_id" => "required|integer",
            "name" => "required|string",
            "city" => "required|string",
            "longitude" => "required|numeric",
            "latitude" => "required|numeric",
            "type" => "required|string",
            "profile_picture" => "file|required",
            "phoneNumber" => "required|string",
            "deleviery_range"=>"required|integer",






        ];
    }
}