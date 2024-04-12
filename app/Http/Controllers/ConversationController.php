<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;

class ConversationController extends Controller
{
  public function index()
  {
    $user = Auth::user();

    $conversations = Conversation::join(
      'conversations_users',
      'conversations.id',
      '=',
      'conversations_users.conversation_id'
    )
      ->where('conversations_users.user_id', $user->id)
      ->with(['users', 'messages'])
      ->get();

    return Inertia::render('Message/IndexConversation', [
      'conversations' => $conversations,
    ]);
  }

  public function show($id)
  {
    $conversation = Conversation::findOrFail($id);
    return Redirect::route('conversations.messages', $conversation->id);
  }

  public function store(Request $request, $id)
  {
    $sender = Auth::user();
    $receiver = User::find($id);

    // Recherche d'une conversation existante entre l'utilisateur $sender et l'utilisateur $receiver
    $existingConversation = Conversation::whereHas('users', function (
      $query
    ) use ($sender, $receiver) {
      $query->where('user_id', $sender->id)->orWhere('user_id', $receiver->id);
    })->first();

    if ($existingConversation) {
      // Une conversation existe déjà, redirige l'user vers cette conversation
      return Redirect::route(
        'conversations.messages',
        $existingConversation->id
      )->with('success', 'You already have a conversation with this user.');
    }

    // Si aucune conversation n'existe, créez une nouvelle
    $conversation = Conversation::create([
      'title' => 'Message',
      'user_id' => $sender->id,
    ]);
    $conversation->users()->attach([$sender->id, $receiver->id]);

    $message = new Message([
      'content' => $request->input('content'),
      'user_id' => $sender->id,
    ]);

    $conversation->messages()->save($message);

    $conversation->generateNotificationNewConversation();

    return Redirect::route('conversations.messages', $conversation->id)->with(
      'success',
      'Message sent successfully.'
    );
  }

  public function destroy($id)
  {
    $conversation = Conversation::findOrFail($id);
    $conversation->delete();

    return redirect()
      ->route('conversations.index')
      ->with([
        'flash' => 'Votre Conversation a été supprimé avec succès !',
      ]);
  }
}
