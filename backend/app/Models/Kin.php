<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $kin_number
 * @property int $seal_id
 * @property int $tone_id
 * @property string $name
 * @property string $affirmation
 * @property string $short_description
 * @property string $description
 * @property string $long_description
 * @property array $oracle
 * @property array $advice
 * @property string $seal_desc
 * @property string $tone_desc
 * @property string $image_url
 * @property string $slug
 * @property-read \App\Models\Seal $seal
 * @property-read \App\Models\Tone $tone
 * @property-read string $seal_name
 * @property-read string $tone_name
 * @property-read string $color
 */
class Kin extends Model
{
    protected $table = 'kines';

    protected $fillable = [
        'kin_number',
        'seal_id',
        'tone_id',
        'name',
        'affirmation',
        'short_description',
        'description',
        'long_description',
        'oracle',
        'advice',
        'seal_desc',
        'tone_desc',
        'image_url',
        'slug'
    ];

    protected $with = ['seal', 'tone'];
    protected $appends = ['seal_name', 'tone_name', 'color'];

    protected $casts = [
        'oracle' => 'array',
        'advice' => 'array',
    ];

    public function seal()
    {
        return $this->belongsTo(Seal::class);
    }

    public function tone()
    {
        return $this->belongsTo(Tone::class);
    }

    public function getSealNameAttribute()
    {
        return $this->seal?->name;
    }

    public function getToneNameAttribute()
    {
        return $this->tone?->name;
    }

    public function getColorAttribute()
    {
        return $this->seal?->color;
    }
}
