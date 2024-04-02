<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Conversation;
use App\Models\Message;

class MessageController extends Controller
{
  public function showMessage($id)
  {
    $user = Auth::user();
    $conversation = Conversation::findOrFail($id);

    // Vérifie si l'utilisateur a accès à la conversation
    if (!$conversation->users->contains($user->id)) {
      return Redirect::route('dashboard')->with(
        'error',
        'Vous n\'avez pas accès à cette conversation.'
      );
    }

    // Charge toutes les conversations de l'utilisateur avec leurs messages et utilisateurs associés
    $conversations = Conversation::whereHas('users', function ($query) use (
      $user
    ) {
      $query->where('user_id', $user->id);
    })
      ->with(['messages', 'users'])
      ->get();

    // Charge les messages de la conversation sélectionnée avec les informations sur l'utilisateur
    $messages = $conversation->messages;
    $messages->load('user');

    return Inertia::render('Message/IndexConversation', [
      'conversations' => $conversations,
      'conversation' => $conversation,
      'messages' => $messages,
    ]);
  }

  public function storeMessage(Request $request, Conversation $conversation)
  {
    $user = Auth::user();

    $request->validate([
      'message' => 'required|string',
    ]);

    $message = new Message([
      'user_id' => $user->id,
      'conversation_id' => $conversation->id,
      'content' => $request->input('message'),
    ]);

    $conversation->messages()->save($message);

    $message->generateNotificationNewMessage();

    $conversation->load('messages.user');

    return redirect()
      ->route('conversations.messages', $conversation->id)
      ->with('success', 'Message envoyé avec succès.');
  }
}
