<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameTeam extends Model
{
    use HasFactory;

    protected $table = 'join_games';

    protected $fillable = [
        'game_id',
        'team_id'
    ];

    public function games()
    {
        return $this->belongsToMany(Game::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class);
    }
}
