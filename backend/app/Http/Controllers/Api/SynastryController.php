<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SynastryController extends Controller
{
    /**
     * Calculate the combined energy (Synastry) of two Kins.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function calculate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kin_1' => 'required|integer|min:1|max:260',
            'kin_2' => 'required|integer|min:1|max:260',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $kin1 = $request->input('kin_1');
        $kin2 = $request->input('kin_2');

        // Sacred Sum Calculation (Base 260)
        $combinedKinNumber = ($kin1 + $kin2) % 260;
        if ($combinedKinNumber <= 0) {
            $combinedKinNumber = 260;
        }

        // Retrieve the resulting Kin details
        $resultKin = Kin::where('kin_number', $combinedKinNumber)->first();

        if (!$resultKin) {
            return response()->json(['error' => 'Error calculating combined Kin'], 500);
        }

        // Generate a mystical interpretation intro
        $interpretation = "La unión del Kin {$kin1} y el Kin {$kin2} da nacimiento al Kin {$combinedKinNumber}: {$resultKin->seal_name} {$resultKin->tone_name}. ";
        $interpretation .= "Esta es la energía que sostiene su vínculo. " . ($resultKin->short_description ?? '');

        return response()->json([
            'input' => [
                'kin_1' => $kin1,
                'kin_2' => $kin2,
            ],
            'result' => [
                'kin_number' => $combinedKinNumber,
                'name' => "{$resultKin->seal_name} {$resultKin->tone_name}",
                'color' => $resultKin->color,
                'tone_number' => $resultKin->tone,
                'seal_number' => $resultKin->seal,
                'affirmation' => $resultKin->affirmation,
                'description' => $resultKin->description,
                'image_url' => $resultKin->image_url,
                'slug' => $resultKin->slug, // formatting slug for frontend assets if needed
            ],
            'mystical_interpretation' => $interpretation
        ]);
    }
}
