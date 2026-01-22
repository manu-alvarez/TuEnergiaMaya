<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kin extends Model
{
    protected $table = 'kines';

    protected $fillable = [
        'kin_number',
        'name',
        'seal_name',
        'tone_name',
        'color',
        'affirmation',
        'short_description',
        'description',
        'image_url',
    ];
}
