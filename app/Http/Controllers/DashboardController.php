<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\User;
use App\Models\Team;
use Inertia\Inertia;

class DashboardController extends Controller
{
  /**
   * 
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Inertia\Response
   */
  public function index()
  {
    $countGame = Game::count();

    $countTeam = Team::count();

    $countUser = User::count();

    return Inertia::render('Dashboard', [
      'countGame' => $countGame,
      'countTeam' => $countTeam,
      'countUser' => $countUser,
    ]);
  }
}
