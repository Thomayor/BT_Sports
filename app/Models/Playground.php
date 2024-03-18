<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playground extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_covered',
        'is_booked',
        'city',
        'adress',
        'postcode',
        'coordgpsx',
        'coordgpsy'
    ];
}
