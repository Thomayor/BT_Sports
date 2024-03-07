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

    return inertia('Message/Index', [
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

    return Redirect::route('conversations.messages', $conversation->id)->with(
      'success',
      'Message sent successfully.'
    );
  }
}
