<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class LiveKitController extends Controller
{
    public function getToken(Request $request)
    {
        $apiKey = env('LIVEKIT_API_KEY');
        $apiSecret = env('LIVEKIT_API_SECRET');

        if (!$apiKey || !$apiSecret) {
            return response()->json(['error' => 'LiveKit credentials not configured'], 500);
        }

        $participantName = 'user-' . uniqid();
        // $roomName = 'tu-energia-maya-room-' . uniqid();
        $roomName = 'testing-room';

        $tokenOptions = [
            'iss' => $apiKey,
            'sub' => $participantName,
            'exp' => time() + 3600, // 1 hour
            'nbf' => time() - 5,
            'video' => [
                'room' => $roomName,
                'roomJoin' => true,
                'canPublish' => true,
                'canSubscribe' => true,
            ]
        ];

        try {
            $token = JWT::encode($tokenOptions, $apiSecret, 'HS256');
            return response()->json([
                'token' => $token,
                'url' => env('LIVEKIT_URL')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate token: ' . $e->getMessage()], 500);
        }
    }
}
