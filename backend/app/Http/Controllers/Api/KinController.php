<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KinController extends Controller
{
    public function index()
    {
        return \App\Models\Kin::all();
    }

    public function show($kin_number)
    {
        return \App\Models\Kin::where('kin_number', $kin_number)->firstOrFail();
    }

    public function today()
    {
        $kinNumber = $this->calculateKinForDate(now());
        $kin = \App\Models\Kin::where('kin_number', $kinNumber)->first();

        return response()->json([
            'date' => now()->toDateString(),
            'kin_number' => $kinNumber,
            'kin' => $kin
        ]);
    }

    private function calculateKinForDate($date)
    {
        // Reference: Jan 14, 2026 is Kin 36 (Yellow Planetary Warrior)
        $referenceDate = \Carbon\Carbon::parse('2026-01-14')->startOfDay();
        $referenceKin = 36;

        $currentDate = \Carbon\Carbon::parse($date)->startOfDay();
        $diff = $referenceDate->diffInDays($currentDate, false);

        // Dreamspell ignores Leap Days (Feb 29)
        $leapDays = $this->countLeapDaysBetween($referenceDate, $currentDate);
        $diff -= $leapDays;

        $kin = ($referenceKin + $diff) % 260;
        if ($kin <= 0)
            $kin += 260;

        return $kin;
    }

    private function countLeapDaysBetween($date1, $date2)
    {
        $start = $date1->lessThan($date2) ? $date1->copy() : $date2->copy();
        $end = $date1->lessThan($date2) ? $date2->copy() : $date1->copy();
        $count = 0;

        $temp = $start->copy();
        while ($temp->year <= $end->year) {
            if ($temp->isLeapYear()) {
                $leapDay = \Carbon\Carbon::create($temp->year, 2, 29);
                if ($leapDay->between($start, $end)) {
                    $count++;
                }
            }
            $temp->addYear();
        }

        return $date1->lessThan($date2) ? $count : -$count;
    }
}
