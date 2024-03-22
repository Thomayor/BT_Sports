<?php

namespace App\Http\Controllers;

use App\Http\Requests\JoinGameRequest;
use App\Models\Game;
use App\Models\GameTeam;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GameTeamController extends Controller
{
    public function index($id)
    {
        $user = Auth::user()->id;
        $game = Game::findOrFail($id);
        $teams = Team::where('user_id', $user)->get();

        return Inertia::render('Games/JoinGame', [
            'game' => $game,
            'teams' => $teams
        ]);
    }

    public function store($id, JoinGameRequest $request)
    {   
        $game = Game::findOrFail($id);
        $teamID = $request->input('team_id');

        if ($game->teams()->count() >= 2) {
            return redirect()->route('games.show', ['id' => $game->id])->with(
                'error', 'This game is already full. You cannot join your more team.'
            );
        }

        if ($game->teams()->where('team_id', $teamID)->exists()) {
            return redirect()->route('games.show', ['id' => $game->id])->with(
                'error', 'This team is already joined to the game.'
            );
        }

        GameTeam::create([
            'game_id' => $game->id,
            'team_id' => $teamID
        ]);

        return redirect()->route('games.show', ['id' => $game->id])->with(
            'success', 'Team joined the game successfully.'
        );
    }
}
