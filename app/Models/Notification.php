<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'content',
        'read_at',
    ];
    
    
    const ENTITY_CONVERSATION = "Conversation";
    const ENTITY_MESSAGE = "Message";
    const ENTITY_TEAM = "Team";
    const ENTITY_OTHERS = "Other";
    const ENTITY_MATCHS = "Matchs";

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notifiable()
    {
        Auth::user()->notifications()->find($this->id);
        $this->read_at = now();
        $this->save();
    }

    public function getNotifIdsAttribute()
    {
        return $this->pluck('id');
    }
}