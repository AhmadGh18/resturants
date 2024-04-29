<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'longitude',
        "type",
        "phoneNumber",
        "latitude",
        "user_id",
        "bio",
        "profile_picture",
        "id",
        "deleviery_range"

    ];


    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }
    public function savedByUsers()
    {
        return $this->hasMany(Saved_restaurant::class);
    }
    public function views()
    {
        return $this->hasMany(View::class);
    }
}