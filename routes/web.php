<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GameTeamController;
use App\Models\GameTeam;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PlaygroundController;


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

  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::get('/teams', [TeamController::class, 'showTeams'])->name('teams');
  Route::get('/teams/{teamId}/members', [
    TeamController::class,
    'showMembers',
  ])->name('team.members');

  Route::get('/notifications', function () {
    return Inertia::render('Notifications/View');
  })->name('notifications');

  Route::post('/notifications/{id}/read', [
    NotificationController::class,
    'read',
  ])->name('notifications.read');
  Route::post('/notifications/readall', [
    NotificationController::class,
    'readAll',
  ])->name('notifications.readall');

  Route::get('/conversations', [ConversationController::class, 'index'])->name(
    'conversations.index'
  );
  Route::get('/conversations/{id}', [
    ConversationController::class,
    'show',
  ])->name('conversations.show');
  Route::post('/conversations/{id}', [
    ConversationController::class,
    'store',
  ])->name('conversations.store');

  Route::delete('/conversations/{id}', [
    ConversationController::class,
    'destroy',
  ])->name('conversation.destroy');

  Route::get('/conversations/{id}/messages', [
    MessageController::class,
    'showMessage',
  ])->name('conversations.messages');

  Route::post('/conversations/{conversation}/messages', [
    MessageController::class,
    'storeMessage',
  ])->name('conversations.message.store');

});

Route::middleware(['role:ADMIN,SUPPORT'])->group(function () {
  Route::resource('playgrounds', PlaygroundController::class);
  Route::get('/list-playgrounds', [PlaygroundController::class, 'listPlaygroundApi'])->name(
    'playgrounds.listApi'
  );
});
