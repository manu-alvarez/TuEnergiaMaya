<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Friendship;
use App\Models\Kin;
use Illuminate\Support\Facades\Auth;

class SocialController extends Controller
{
    /**
     * List friends and pending requests
     */
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        // Get accepted friendships where user is requester
        $sent = $user->friendshipsSent()->where('status', 'accepted')->with(['addressee.kin'])->get()->pluck('addressee');

        // Get accepted friendships where user is addressee
        $received = $user->friendshipsReceived()->where('status', 'accepted')->with(['requester.kin'])->get()->pluck('requester');

        // Merge collections
        $friends = $sent->merge($received);

        // Get pending requests received
        $pending = $user->friendshipsReceived()->where('status', 'pending')->with(['requester.kin'])->get();

        return response()->json([
            'friends' => $friends,
            'pending_requests' => $pending
        ]);
    }

    /**
     * Search for users by name or email
     */
    public function search(Request $request)
    {
        $query = $request->input('q');
        if (!$query || strlen($query) < 3) {
            return response()->json([]);
        }

        $users = User::where('id', '!=', Auth::id())
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('email', 'like', "%{$query}%");
            })
            ->with('kin')
            ->limit(10)
            ->get();

        // Check friendship status for each user
        $results = $users->map(function ($otherUser) {
            $friendship = Friendship::where(function ($q) use ($otherUser) {
                $q->where('requester_id', Auth::id())->where('addressee_id', $otherUser->id);
            })->orWhere(function ($q) use ($otherUser) {
                $q->where('requester_id', $otherUser->id)->where('addressee_id', Auth::id());
            })->first();

            $status = $friendship ? $friendship->status : 'none';
            // If pending, who sent it?
            if ($status === 'pending') {
                $status = ($friendship->requester_id === Auth::id()) ? 'sent' : 'received';
            }

            $otherUser->friendship_status = $status;
            return $otherUser;
        });

        return response()->json($results);
    }

    /**
     * Send a friend request
     */
    public function sendRequest(Request $request)
    {
        $request->validate(['user_id' => 'required|exists:users,id']);
        $addresseeId = $request->user_id;

        if ($addresseeId == Auth::id()) {
            return response()->json(['message' => 'Cannot verify self'], 400);
        }

        // Check if friendship already exists
        $exists = Friendship::where(function ($q) use ($addresseeId) {
            $q->where('requester_id', Auth::id())->where('addressee_id', $addresseeId);
        })->orWhere(function ($q) use ($addresseeId) {
            $q->where('requester_id', $addresseeId)->where('addressee_id', Auth::id());
        })->exists();

        if ($exists) {
            return response()->json(['message' => 'Request pending or accepted'], 400);
        }

        Friendship::create([
            'requester_id' => Auth::id(),
            'addressee_id' => $addresseeId,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Request sent']);
    }

    /**
     * Accept a friend request
     */
    public function acceptRequest($requestId)
    {
        $friendship = Friendship::where('id', $requestId)
            ->where('addressee_id', Auth::id())
            ->where('status', 'pending')
            ->firstOrFail();

        $friendship->update(['status' => 'accepted']);

        return response()->json(['message' => 'Friendship accepted']);
    }

    /**
     * Get Combined Kin with a friend
     */
    public function getCombinedKin($friendId)
    {
        $userKin = Auth::user()->kin;
        $friend = User::with('kin')->findOrFail($friendId);
        $friendKin = $friend->kin;

        if (!$userKin || !$friendKin) {
            return response()->json(['message' => 'Kin data missing for calculation'], 400);
        }

        // Calculate Combined Kin
        // Formula: Sum of Kin Numbers. If sum > 260, subtract 260.
        // Special case: if result is 0 (though sum is always > 0), it's 260.
        $sum = $userKin->kin_number + $friendKin->kin_number;
        while ($sum > 260) {
            $sum -= 260;
        }

        $combinedKinNumber = $sum;

        // Fetch Kin Data for result
        $combinedKin = Kin::where('kin_number', $combinedKinNumber)->with('episode')->first();

        return response()->json([
            'user_kin' => $userKin,
            'friend_kin' => $friendKin,
            'combined_kin' => $combinedKin,
            'formula' => "{$userKin->kin_number} + {$friendKin->kin_number} = {$sum}"
        ]);
    }

}
