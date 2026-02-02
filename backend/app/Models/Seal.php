<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seal extends Model
{
    protected $fillable = ['name', 'slug', 'color', 'essence', 'description'];

    public function kines()
    {
        return $this->hasMany(Kin::class);
    }
}
