<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Http\Requests\GameRequest;
use App\Models\Playground;
use App\Models\Sport;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::all();

        return Inertia::render('Games/ShowGames', [
            'games' => $games
        ]);
    }

    public function create()
    {
        $playgrounds = Playground::all();
        $sports = Sport::all();

        return Inertia::render('Games/Partials/CreateGameForm', [
            'playgrounds' => $playgrounds,
            'sports' => $sports
        ]);
    }

    public function store(GameRequest $request)
    {
        $user = Auth::user()->id;

        $game = Game::create([
            'date' => $request->input('date'),
            'start_time' => $request->input('start_time'),
            'end_time' => $request->input('end_time'),
            'max_player' => $request->input('max_player'),
            'sport_id' => $request->input('sport_id'),
            'playground_id' => $request->input('playground_id'),
            'user_id' => $user
        ]);

        return to_route('dashboard')->with([
            'game' => $game
        ], 200);
    }

    public function show($id)
    {
        $game = Game::findOrFail($id);

        return Inertia::render('Games/ShowGame', [
            'game' => $game
        ]);
    }

    public function edit()
    {
        $playgrounds = Playground::all();
        $sports = Sport::all();

        return Inertia::render('Games/EditGame', [
            'playground' => $playgrounds,
            'sports' => $sports
        ]);
    }

    public function update(GameRequest $request, $id)
    {
        $game = Game::findOrFail($id);

        $game->update([
            'date' => $request->input('date'),
            'start_time' => $request->input('start_time'),
            'end_time' => $request->input('end_time'),
            'max_player' => $request->input('max_player'),
            'sport_id' => $request->input('sport_id'),
            'playground_id' => $request->input('playground_id'), 
        ]);

        return redirect()->route('game.show', ['id' => $game->id]);
    }

    public function destroy($id)
    {
        $game = Game::findOrFail($id);

        $game->delete();

        return redirect()->route('dashboard');
    }
}
