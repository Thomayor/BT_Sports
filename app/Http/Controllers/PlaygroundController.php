<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Playground;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PlaygroundController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $playgrounds = Playground::all();

    return Inertia::render('Playgrounds/IndexPlaygrounds', [
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
    $base_url = 'https://equipements.sports.gouv.fr';

    $equipement_id = $request->input('equip_numero');

    $userId = Auth::id();

    $path =
      $base_url .
      '/api/explore/v2.1/catalog/datasets/data-es/records?where=equip_numero%20like%20%22' .
      $equipement_id .
      '%22';

    try {
      $response = Http::get($path);

      $playgroundData = $response->json()['results'][0];

      Playground::updateOrCreate(
        ['equipment_id' => $equipement_id],
        [
          'name' => $playgroundData['inst_nom'],
          'equipment_id' => $playgroundData['equip_numero'],
          'installation_id' => $playgroundData['inst_numero'],
          'surface_type' => $playgroundData['equip_sol'],
          'adress' => $playgroundData['inst_adresse'],
          'postcode' => $playgroundData['inst_cp'],
          'playground_type' => $playgroundData['equip_type_name'],
          'is_covered' => $playgroundData['equip_nature'],
          'city' => $playgroundData['inst_com_nom'],
          'coordgpsx' => $playgroundData['equip_x'],
          'coordgpsy' => $playgroundData['equip_y'],
          'user_id' => $userId,
        ]
      );
    } catch (\Exception $e) {
      // Enregistrer les détails de l'exception dans les journaux de Laravel
      Log::error(
        'An error occurred while fetching data from API: ' . $e->getMessage()
      );

      return response()->json(
        ['error' => 'An error occurred while fetching data from API'],
        500
      );
    }
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
    $playground = Playground::findOrFail($id);

    return Inertia::render('Playgrounds/EditPlayground', [
      'playground' => $playground,
    ]);
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

    if (Auth::user()->account_type !== 'ADMIN') {
      return response()->json(
        [
          'message' =>
            'Seuls les administrateurs peuvent supprimer des terrains.',
        ],
        403
      );
    }

    $playground->delete();

    return to_route('playgrounds.index')->with(200);
  }
}
