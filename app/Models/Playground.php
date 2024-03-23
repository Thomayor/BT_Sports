<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playground extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'equipment_id',
        'installation_id',
        'surface_type',
        'adress',
        'postcode',
        'playground_type',
        'is_covered',
        'city',
        'coordgpsx',
        'coordgpsy',
        'user_id',


    ];
}
