<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Team;

class TeamController extends Controller
{
  public function showTeams()
  {
    $teams = Team::with('owner', 'users')->get();

    return Inertia::render('Teams/IndexTeams', ['teams' => $teams]);
  }

  public function showInfoTeam($id)
  {
    $team = Team::with('owner', 'users')->findOrFail($id);

    return Inertia::render('Teams/ShowInfoTeam', [
      'team' => $team,
    ]);
  }
}
