<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Notification extends Model
{
  use HasFactory;

  protected $fillable = ['user_id', 'type', 'content', 'link', 'read_at'];

  const ENTITY_CONVERSATION = 'Conversation';
  const ENTITY_MESSAGE = 'Message';
  const ENTITY_TEAM = 'Team';
  const ENTITY_OTHERS = 'Other';
  const ENTITY_MATCHS = 'Matchs';

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function users()
  {
      return $this->belongsToMany(User::class, 'notifications_users', 'notification_id', 'user_id')
          ->withPivot('read_at');
  }

  public function notifiable()
  {
    $user = Auth::user();

    if ($user) {
      $this->users()->updateExistingPivot($user->id, ['read_at' => now()]);
    }
  }

  public function getNotifIdsAttribute()
  {
    return $this->pluck('id');
  }
}
