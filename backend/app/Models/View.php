<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    protected $fillable=[
        'user_id',
        "restaurant_id",
    ];
    use HasFactory;

    // public function user()
    // {
    //     return $this->hasMany(User::class);
    // }

    // public function restaurant()
    // {
    //     return $this->hasMany(Restaurant::class);
    // }
}