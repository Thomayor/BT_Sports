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
   
    public function readAll(Request $request)
    {
        $user = Auth::user()->id;
        $notification = new Notification();
        $notificationIds = $notification->getNotifIdsAttribute();
        
        $notifications = Notification::where('user_id', $user)
            ->whereIn('id', $notificationIds)
            ->get();

        foreach ($notifications as $notif) {
                $notif->notifiable();
                }
        
        
    
        }


}