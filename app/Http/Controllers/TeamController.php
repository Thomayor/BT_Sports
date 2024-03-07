<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Team;

class TeamController extends Controller
{
    public function showTeams()
    {
        $teams = Team::all();
        return Inertia::render('Teams/Index', ['teams' => $teams]);
    }

    public function showMembers($teamId)
    {
        $team = Team::with('users')->findOrFail($teamId);
        $members = $team->users;
        $owner = $team->owner;

        return Inertia::render('Teams/Members', [
            'team' => $team,
            'members' => $members,
            'owner' => $owner
        ]);
    }

}
