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

   
    public function generateNotificationNewConversation()
    {
        $conversation = Conversation::find($this->id);
    
        if ($conversation) {
            $userIds = $conversation->users->pluck('id')->toArray();
    
            $notification = new Notification([
                'content' => 'Vous avez une nouvelle conversation : ' . $conversation->title,
                'link' => '/conversations/' . $conversation->id,
                'type' => Notification::ENTITY_CONVERSATION,
            ]);
    
            $notification->save();
    
            // Associer la notification à tous les utilisateurs de la conversation
            $notification->users()->sync($userIds);
        } else {
            dd($conversation, "La conversation avec l'ID {$this->conversation_id} n'a pas été trouvée.");
        }
    }

}
