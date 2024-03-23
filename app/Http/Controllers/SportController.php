<?php

namespace App\Http\Controllers;

use App\Http\Requests\SportRequest;
use App\Models\Sport;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SportController extends Controller
{
    public function index()
    {
        $sports = Sport::all();

        return Inertia::render('Sports/IndexSports', [
            'sports' => $sports
        ]);
    }

    public function create()
    {
        return Inertia::render('Sports/CreateSport');
    }

    public function store(SportRequest $request)
    {
        $user = Auth::user()->id;

        Sport::create([
            'name' => $request->input('name'),
            'user_id' => $user
        ]);

        return to_route('sports.index')->with(200);
    }

    public function destroy($id)
    {
        $sport = Sport::findOrFail($id);

        $sport->delete();

        return to_route('sports.index')->with(200);
    }
}
