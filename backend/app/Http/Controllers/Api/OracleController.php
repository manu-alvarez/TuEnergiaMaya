<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Kin;
use Carbon\Carbon;

class OracleController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:500',
            'kin_number' => 'nullable|integer|between:1,260',
            'history' => 'nullable|array|max:10',
        ]);

        $pythonServer = env('ASSISTANT_SERVER_URL', 'http://127.0.0.1:8002');

        try {
            // Forward everything to the Python AI Brain
            $response = Http::asForm()->post("$pythonServer/ask", [
                'text' => $request->input('question'),
                'history' => json_encode($request->input('history', [])),
                'context' => json_encode(['kin_number' => $request->input('kin_number')])
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json(['error' => 'AI Server error'], 500);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Could not connect to AI service'], 503);
        }
    }

    public function prophesy(Request $request)
    {
        $request->validate(['kin_number' => 'nullable|integer|between:1,260']);
        $targetKinNumber = $request->input('kin_number') ?? $this->calculateKinForDate(now());

        $toneIndex = ($targetKinNumber - 1) % 13;
        $wavespellStart = $targetKinNumber - $toneIndex;
        $wavespellKin = Kin::where('kin_number', $wavespellStart)->first();
        $targetKin = Kin::where('kin_number', $targetKinNumber)->first();

        $userKin = null;
        if ($request->user() && $request->user()->birth_kin) {
            $userKin = Kin::where('kin_number', $request->user()->birth_kin)->first();
        }

        $prompt = "Eres el Sumo Sacerdote del Tiempo. Genera una PROFECÍA de 13 días.\n";
        $prompt .= "Onda Encantada del **{$wavespellKin->seal_name}** (Propósito: {$wavespellKin->short_description}).\n";
        $prompt .= "Hoy es el día " . ($toneIndex + 1) . " (regido por {$targetKin->seal_name}).\n";
        if ($userKin)
            $prompt .= "El consultante es Kin {$userKin->kin_number}.\n";
        $prompt .= "\nGenera una lectura dividida en: El Llamado, El Desafío y La Sentencia.";

        $apiKey = env('GEMINI_API_KEY');
        if (!$apiKey)
            return response()->json(['prophecy' => "Velo cerrado."], 200);

        try {
            $response = Http::timeout(30)->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}", [
                'contents' => [['parts' => [['text' => $prompt]]]]
            ]);
            return response()->json(['prophecy' => $response->json('candidates.0.content.parts.0.text')]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function calculateKinForDate($date)
    {
        $referenceDate = Carbon::create(2026, 1, 22)->startOfDay();
        $targetDate = Carbon::parse($date)->startOfDay();
        $daysDiff = $referenceDate->diffInDays($targetDate, false);
        $leapDays = $this->countLeapDays($referenceDate, $targetDate);
        $daysDiff -= $leapDays;
        $kin = (44 + $daysDiff) % 260;
        while ($kin <= 0)
            $kin += 260;
        return $kin;
    }

    private function countLeapDays($start, $end)
    {
        $count = 0;
        $first = $start->lt($end) ? $start : $end;
        $last = $start->lt($end) ? $end : $start;
        for ($year = $first->year; $year <= $last->year; $year++) {
            $feb29 = Carbon::create($year, 2, 29)->startOfDay();
            if ($feb29->gt($first) && $feb29->lte($last))
                $count++;
        }
        return $start->lt($end) ? $count : -$count;
    }
}
