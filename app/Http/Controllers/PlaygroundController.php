<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Playground;
use Inertia\Inertia;

class PlaygroundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $playgrounds = Playground::all();
        
        return Inertia::render('Playgrounds/Index', [
            'playgrounds' => $playgrounds,
          ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        
        return Inertia::render('Playgrounds/Create');
    }


    public function listPlaygroundApi()
    {
        
        
        return Inertia::render('Playgrounds/ListPlaygrounds');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $playground = Playground::create($request->all());
        return response()->json($playground, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $playground = Playground::findOrFail($id);
        return response()->json($playground);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $playground = Playground::findOrFail($id);
        $playground->update($request->all());
        return response()->json($playground, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $playground = Playground::findOrFail($id);

        if (Auth::user()->role !== 'ADMIN') {
            return response()->json(['message' => 'Seuls les administrateurs peuvent supprimer des terrains.'], 403);
        }

        $playground->delete();
        return response()->json(null, 204);
    }
}
