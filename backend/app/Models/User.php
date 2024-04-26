<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        "city",
        "longitude",
        "latitude",
        "has_restaurant",
        "full_name",
        "user_phone"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function restaurant()
    {
        return $this->hasOne(Restaurant::class);
    }

    public function isRestaurantOwner()
    {
        return $this->has_restaurant;
    }
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }
    public function savedItems()
    {
        return $this->hasMany(Saved_item::class);
    }
    public function savedRestaurants()
    {
        return $this->hasMany(Saved_restaurant::class);
    }
}