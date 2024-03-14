<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function orderedItems()
    {
        return $this->hasMany(Ordered_item::class);
    }
}