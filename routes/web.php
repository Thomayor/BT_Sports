<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GameTeamController;
use App\Models\GameTeam;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/games', [GameController::class, 'index'])->name(
        'games.index'
    );

    Route::get('/games/create', [GameController::class, 'create'])->name(
        'games.create'
    );

    Route::post('/games/store', [GameController::class, 'store'])->name(
        'games.store'
    );

    Route::get('/games/{id}', [GameController::class, 'show'])->name(
        'games.show'
    );

    Route::get('/games/{id}/edit', [GameController::class, 'edit'])->name(
        'games.edit'
    );

    Route::put('/games/{id}/update', [GameController::class, 'update'])->name(
        'games.update'
    );

    Route::delete('/games/{id}/delete', [GameController::class, 'destroy'])->name(
        'games.destroy'
    );

    Route::get('/games/{id}/join-team', [GameTeamController::class, 'index'])->name(
        'games.teams.index'
    );

    Route::post('/games/{id}/store-team', [GameTeamController::class, 'store'])->name(
        'games.teams.store'
    );
});
