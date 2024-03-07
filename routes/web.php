<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConversationController;

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
  Route::get('/teams', [TeamController::class, 'showTeams'])->name('teams');
  Route::get('/teams/{teamId}/members', [
    TeamController::class,
    'showMembers',
  ])->name('team.members');

  Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
  Route::get('/conversations/{id}', [ConversationController::class, 'show'])->name('conversations.show');
  Route::post('/conversations/{id}', [ConversationController::class, 'store'])
      ->name('conversations.store');

  Route::get('/conversations/{id}/messages', [MessageController::class, 'showMessage'])
      ->name('conversations.messages');

  Route::post('/conversations/{conversation}/messages', [MessageController::class, 'storeMessage'])->name('conversations.message.store');
});
