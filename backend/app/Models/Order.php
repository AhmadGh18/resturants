<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        "restaurant_id",
        "user_id",
        "longitude",
        "latitude",
        "first_name",
        "last_name",
        "phone",
        "notes",
        "city",

        "state",
    ];
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderedItems()
    {
        return $this->hasMany(Ordered_item::class);
    }
}