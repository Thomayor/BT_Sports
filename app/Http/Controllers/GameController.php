<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;
use App\Http\Requests\GameRequest;
use App\Models\Playground;
use App\Models\Sport;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
  public function index()
  {
    $games = Game::with('teams.users')->get();
    $sports = Sport::all();
    $playgrounds = Playground::all();

    return Inertia::render('Games/IndexGames', [
      'games' => $games,
      'sports' => $sports,
      'playgrounds' => $playgrounds,
    ]);
  }

  public function create()
  {
    $user = auth()->id();
    $playgrounds = Playground::all();
    $sports = Sport::all();
    $teams = Team::where('user_id', $user)->get();

    return Inertia::render('Games/CreateGame', [
      'playgrounds' => $playgrounds,
      'sports' => $sports,
      'teams' => $teams,
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
      'equipment_id' => $request->input('equipment_id'),
      'user_id' => $user,
    ]);

    $gameID = $game->id;
    $teamID = $request->input('team_id');

    $game->teams()->attach($teamID, ['game_id' => $gameID]);

    return to_route('games.index')->with(
      [
        'game' => $game,
      ],
      200
    );
  }

  public function show($id)
  {
    $game = Game::findOrFail($id);
    $sport = Sport::where('id', '=', $game->sport_id)->get();
    $playground = Playground::where(
      'equipment_id',
      '=',
      $game->equipment_id
    )->get();
    $teams = $game
      ->teams()
      ->with('users')
      ->get();

    $owners = [];

    foreach ($teams as $team) {
      $owners[] = $team->owner;
    }

    return Inertia::render('Games/ShowGame', [
      'game' => $game,
      'sport' => $sport,
      'playground' => $playground,
      'teams' => $teams,
    ]);
  }

  public function edit($id)
  {
    $user = auth()->id();
    $game = Game::findOrFail($id);
    $playgrounds = Playground::all();
    $sports = Sport::all();
    $teams = Team::where('user_id', $user)->get();

    return Inertia::render('Games/EditGame', [
      'game' => $game,
      'playgrounds' => $playgrounds,
      'sports' => $sports,
      'teams' => $teams,
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
      'equipment_id' => $request->input('equipment_id'),
    ]);

    return redirect()->route('games.show', ['id' => $game->id]);
  }

  public function destroy($id)
  {
    $game = Game::findOrFail($id);

    $game->delete();

    return redirect()->route('dashboard');
  }
}
