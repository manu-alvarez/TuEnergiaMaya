<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tone extends Model
{
    protected $fillable = ['number', 'name', 'action', 'description'];

    public function kines()
    {
        return $this->hasMany(Kin::class);
    }
}
