<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
  use HasFactory;
  
  protected $fillable = ['title', 'user_id'];
  protected $casts = [
    'user_id' => 'integer',
  ];

  public function users()
  {
    return $this->belongsToMany(
      User::class,
      'conversations_users',
      'conversation_id',
      'user_id'
    )->withTimestamps();
  }

  public function messages()
  {
    return $this->hasMany(Message::class);
  }

  public function creator()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function generateNotificationNewConversation()
  {
    $conversation = Conversation::find($this->id);

    if ($conversation) {
      $senderName = $conversation->creator->firstname; // Utiliser la relation pour récupérer le créateur de la conversation

      foreach ($conversation->users as $user) {
        // Trouver l'autre utilisateur (destinataire)
        $recipient = $conversation->users
          ->where('id', '!=', $user->id)
          ->first();

        // Utiliser le nom de l'autre utilisateur comme destinataire
        $recipientName = $recipient->firstname;

        $content =
          $user->id == $conversation->creator->id
            ? "Vous avez créé une conversation avec {$recipientName}."
            : "{$senderName} souhaite discuter avec vous.";

        $notification = new Notification([
          'content' => $content,
          'link' => 'conversations/' . $conversation->id . '/',
          'type' => Notification::ENTITY_CONVERSATION,
        ]);

        $notification->save();

        // Associer la notification à l'utilisateur
        $notification->users()->attach($user->id);
      }
    } else {
      dd(
        $conversation,
        "La conversation avec l'ID {$this->conversation_id} n'a pas été trouvée."
      );
    }
  }
}
