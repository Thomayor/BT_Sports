<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['title', 'user_id'];
    protected $casts = [
        'user_id' => 'integer',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'conversations_users', 'conversation_id', 'user_id')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

   

  public function generateNotificationNewConversation($user_id)
  {
    $conversation = Conversation::find($this->id);

    if ($conversation) {
      $notification = new Notification();
      $notification->message =
        'Vous avez une nouvelle conversation : ' . $conversation->title;
      $notification->user_id = $user_id;
      $notification->entity_id = $conversation->id;
      $notification->entity = Notification::ENTITY_CONVERSATION;
      $notification->link = '/conversations/' . $conversation->id;
      $notification->save();
    } else {
      dd(
        $conversation,
        "La conversation avec l'ID {$this->conversation_id} n'a pas été trouvée."
      );
    }
  }

}
