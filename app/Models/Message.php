<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['conversation_id', 'user_id', 'content'];
    protected $with = ['user'];


    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function generateNotificationNewMessage()
    {
        $conversation = $this->conversation;

        $notification = new Notification();
        $notification->content = 'Vous avez reçu un message dans la conversation'.' "'. $conversation->title.'"'.' : ' . $this->content;
        $notification->type = 'Message';
        $notification->link = '/conversations/' . $conversation->id;
        $notification->save();
    }

}
