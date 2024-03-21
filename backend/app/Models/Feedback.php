<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Restaurant;

class Feedback extends Model
{
    protected $fillable = [
        "stars",
        "feedback",
        "restaurant_id",
    ];
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}