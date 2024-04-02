<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'max_player',
        'sport_id',
        'playground_id',
        'user_id'
    ];

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'join_games')->withTimestamps();
    }

    public function sport()
    {
        return $this->belongsTo(Sport::class, 'sport_id');
    }

    public function playground()
    {
        return $this->belongsTo(Playground::class, 'playground_id');
    }
}
