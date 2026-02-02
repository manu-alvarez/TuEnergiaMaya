<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Seal;
use App\Models\Tone;
use App\Models\Kin;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class KinSeeder extends Seeder
{
    public function run(): void
    {
        $sealsData = [
            1 => ['name' => 'Dragón', 'slug' => 'dragon', 'color' => 'Red', 'essence' => 'nutrir tus nuevos comienzos'],
            2 => ['name' => 'Viento', 'slug' => 'viento', 'color' => 'White', 'essence' => 'comunicar tu verdad espiritual'],
            3 => ['name' => 'Noche', 'slug' => 'noche', 'color' => 'Blue', 'essence' => 'confiar en tu intuición y sueños'],
            4 => ['name' => 'Semilla', 'slug' => 'semilla', 'color' => 'Yellow', 'essence' => 'enfocarte en tu potencial de crecimiento'],
            5 => ['name' => 'Serpiente', 'slug' => 'serpiente', 'color' => 'Red', 'essence' => 'conectar con tu fuerza vital y pasión'],
            6 => ['name' => 'Enlazador de Mundos', 'slug' => 'enlazador-de-mundos', 'color' => 'White', 'essence' => 'cerrar ciclos y abrir nuevas puertas'],
            7 => ['name' => 'Mano', 'slug' => 'mano', 'color' => 'Blue', 'essence' => 'sanar a través de tus acciones'],
            8 => ['name' => 'Estrella', 'slug' => 'estrella', 'color' => 'Yellow', 'essence' => 'crear belleza y armonía en tu entorno'],
            9 => ['name' => 'Luna', 'slug' => 'luna', 'color' => 'Red', 'essence' => 'purificar tus emociones y fluir'],
            10 => ['name' => 'Perro', 'slug' => 'perro', 'color' => 'White', 'essence' => 'actuar desde la lealtad y el amor'],
            11 => ['name' => 'Mono', 'slug' => 'mono', 'color' => 'Blue', 'essence' => 'jugar y disfrutar de la magia de la vida'],
            12 => ['name' => 'Humano', 'slug' => 'humano', 'color' => 'Yellow', 'essence' => 'ejercer tu libre albedrío con sabiduría'],
            13 => ['name' => 'Caminante del Cielo', 'slug' => 'caminante-del-cielo', 'color' => 'Red', 'essence' => 'explorar nuevos horizontes espirituales'],
            14 => ['name' => 'Mago', 'slug' => 'mago', 'color' => 'White', 'essence' => 'vivir en el presente con consciencia'],
            15 => ['name' => 'Águila', 'slug' => 'aguila', 'color' => 'Blue', 'essence' => 'tener una visión amplia de tu futuro'],
            16 => ['name' => 'Guerrero', 'slug' => 'guerrero', 'color' => 'Yellow', 'essence' => 'cuestionar tus miedos con valentía'],
            17 => ['name' => 'Tierra', 'slug' => 'tierra', 'color' => 'Red', 'essence' => 'sincronizarte con los ciclos de la naturaleza'],
            18 => ['name' => 'Espejo', 'slug' => 'espejo', 'color' => 'White', 'essence' => 'ver la realidad sin ilusiones'],
            19 => ['name' => 'Tormenta', 'slug' => 'tormenta', 'color' => 'Blue', 'essence' => 'catalizar tu proceso de transformación'],
            20 => ['name' => 'Sol', 'slug' => 'sol', 'color' => 'Yellow', 'essence' => 'irradiar la luz de tu verdadera esencia'],
        ];

        $tonesData = [
            1 => ['name' => 'Magnético', 'action' => 'unificar tus propósitos'],
            2 => ['name' => 'Lunar', 'action' => 'identificar tus desafíos'],
            3 => ['name' => 'Eléctrico', 'action' => 'activar tu servicio'],
            4 => ['name' => 'Auto-existente', 'action' => 'dar forma a tus ideas'],
            5 => ['name' => 'Entonado', 'action' => 'tomar el mando de tu poder'],
            6 => ['name' => 'Rítmico', 'action' => 'encontrar tu equilibrio'],
            7 => ['name' => 'Resonante', 'action' => 'sintonizar con tu inspiración'],
            8 => ['name' => 'Galáctico', 'action' => 'vivir con integridad'],
            9 => ['name' => 'Solar', 'action' => 'hacer brillar tu intención'],
            10 => ['name' => 'Planetario', 'action' => 'manifestar tus resultados'],
            11 => ['name' => 'Espectral', 'action' => 'soltar lo que no necesitas'],
            12 => ['name' => 'Cristal', 'action' => 'colaborar con los demás'],
            13 => ['name' => 'Cósmico', 'action' => 'trascender a través de tu presencia'],
        ];

        // Seed Seals
        foreach ($sealsData as $index => $data) {
            Seal::updateOrCreate(['id' => $index], $data);
        }

        // Seed Tones
        foreach ($tonesData as $index => $data) {
            Tone::updateOrCreate(['id' => $index], ['number' => $index] + $data);
        }

        // Seed Kines
        for ($i = 1; $i <= 260; $i++) {
            $toneIdx = (($i - 1) % 13) + 1;
            $sealIdx = (($i - 1) % 20) + 1;

            $seal = Seal::find($sealIdx);
            $tone = Tone::find($toneIdx);

            $shortDescription = "Hoy es un gran día para " . $tone->action . " al " . $seal->essence . ".";

            Kin::updateOrCreate(
                ['kin_number' => $i],
                [
                    'seal_id' => $seal->id,
                    'tone_id' => $tone->id,
                    'name' => "{$seal->name} {$tone->name}",
                    'slug' => $seal->slug . '-' . Str::slug($tone->name),
                    'affirmation' => '',
                    'short_description' => $shortDescription,
                    'description' => '',
                    'long_description' => '',
                    'image_url' => null,
                ]
            );
        }

        // Overlay with folder info
        $infoKinesPath = base_path('../info kines');
        if (File::exists($infoKinesPath)) {
            $directories = File::directories($infoKinesPath);
            foreach ($directories as $dir) {
                $folderName = basename($dir);
                $txtFile = $dir . '/' . $folderName . '.txt';

                if (File::exists($txtFile)) {
                    $content = File::get($txtFile);
                    $data = $this->parseTxt($content);

                    if (isset($data['kinID'])) {
                        $kinNumber = (int) str_replace('Kin ', '', $data['kinID']);

                        // Image detection
                        $foundImage = null;
                        foreach (['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'] as $ext) {
                            if (File::exists($dir . "/Kin {$kinNumber}.{$ext}")) {
                                $foundImage = "/images/kines/Kin {$kinNumber}.{$ext}";
                                break;
                            }
                        }

                        Kin::where('kin_number', $kinNumber)->update([
                            'name' => $data['nombre'] ?? null,
                            'affirmation' => $data['afirmacion'] ?? '',
                            'image_url' => $foundImage,
                        ]);
                    }
                }
            }
        }
    }

    private function parseTxt($content)
    {
        $data = [];
        $lines = explode("\n", $content);
        foreach ($lines as $line) {
            if (str_contains($line, ':')) {
                [$key, $value] = explode(':', $line, 2);
                $data[trim($key)] = trim($value, " \t\n\r\0\x0B\",");
            }
        }
        return $data;
    }
}
