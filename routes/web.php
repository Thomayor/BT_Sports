<?php

use App\Http\Controllers\GameController;
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

    Route::get('/games/create/', [GameController::class, 'create'])->name(
        'games.create'
    );

    Route::post('/games/store/', [GameController::class, 'store'])->name(
        'games.store'
    );

    Route::get('/games/{id}', [GameController::class, 'show'])->name(
        'game.show'
    );

    Route::get('/games/edit/', [GameController::class, 'edit'])->name(
        'games.edit'
    );

    Route::put('/games/update/{id}', [GameController::class, 'update'])->name(
        'games.update'
    );

    Route::delete('/game/destroy/{id}', [GameController::class, 'destroy'])->name(
        'game.destroy'
    );
});
