<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function read($id)
    {

        $notification = Notification::findOrFail($id);
        $notification->notifiable();

    }
    public function readAll()
    {
        $userId = Auth::id();
    
        $notification = new Notification();
        $notificationIds = $notification->getNotifIdsAttribute();
    
        $notifications = Notification::with('users')
            ->whereIn('id', $notificationIds)
            ->whereHas('users', function ($query) use ($userId) {
                $query->where('users.id', $userId);
            })
            ->get();
    
        foreach ($notifications as $notif) {
            $notif->notifiable();
        }
    }


}