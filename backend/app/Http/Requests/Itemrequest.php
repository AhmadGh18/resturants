<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Itemrequest extends FormRequest
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
            "title" => "string|required",
            "price" => "numeric|required",
            "description" => "string|required",
            "thumbnail" => "image|required", // Validate thumbnail file
            'images.*' => 'required|image',

            "restaurant_id" => "integer|required",
            "categories" => "string", // Validate each item in the categories array
        ];
    }

}