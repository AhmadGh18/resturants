<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saved_item extends Model
{
    protected $fillable=[
        "user_id",
        "item_id",
    ];
    use HasFactory;
}