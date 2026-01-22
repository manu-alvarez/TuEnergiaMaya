<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seals = [
            1 => ['name' => 'Dragón', 'color' => 'Red'],
            2 => ['name' => 'Viento', 'color' => 'White'],
            3 => ['name' => 'Noche', 'color' => 'Blue'],
            4 => ['name' => 'Semilla', 'color' => 'Yellow'],
            5 => ['name' => 'Serpiente', 'color' => 'Red'],
            6 => ['name' => 'Enlazador de Mundos', 'color' => 'White'],
            7 => ['name' => 'Mano', 'color' => 'Blue'],
            8 => ['name' => 'Estrella', 'color' => 'Yellow'],
            9 => ['name' => 'Luna', 'color' => 'Red'],
            10 => ['name' => 'Perro', 'color' => 'White'],
            11 => ['name' => 'Mono', 'color' => 'Blue'],
            12 => ['name' => 'Humano', 'color' => 'Yellow'],
            13 => ['name' => 'Caminante del Cielo', 'color' => 'Red'],
            14 => ['name' => 'Mago', 'color' => 'White'],
            15 => ['name' => 'Águila', 'color' => 'Blue'],
            16 => ['name' => 'Guerrero', 'color' => 'Yellow'],
            17 => ['name' => 'Tierra', 'color' => 'Red'],
            18 => ['name' => 'Espejo', 'color' => 'White'],
            19 => ['name' => 'Tormenta', 'color' => 'Blue'],
            20 => ['name' => 'Sol', 'color' => 'Yellow'],
        ];

        $tones = [
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

        $sealEssences = [
            'Dragón' => 'nutrir tus nuevos comienzos',
            'Viento' => 'comunicar tu verdad espiritual',
            'Noche' => 'confiar en tu intuición y sueños',
            'Semilla' => 'enfocarte en tu potencial de crecimiento',
            'Serpiente' => 'conectar con tu fuerza vital y pasión',
            'Enlazador de Mundos' => 'cerrar ciclos y abrir nuevas puertas',
            'Mano' => 'sanar a través de tus acciones',
            'Estrella' => 'crear belleza y armonía en tu entorno',
            'Luna' => 'purificar tus emociones y fluir',
            'Perro' => 'actuar desde la lealtad y el amor',
            'Mono' => 'jugar y disfrutar de la magia de la vida',
            'Humano' => 'ejercer tu libre albedrío con sabiduría',
            'Caminante del Cielo' => 'explorar nuevos horizontes espirituales',
            'Mago' => 'vivir en el presente con consciencia',
            'Águila' => 'tener una visión amplia de tu futuro',
            'Guerrero' => 'cuestionar tus miedos con valentía',
            'Tierra' => 'sincronizarte con los ciclos de la naturaleza',
            'Espejo' => 'ver la realidad sin ilusiones',
            'Tormenta' => 'catalizar tu proceso de transformación',
            'Sol' => 'irradiar la luz de tu verdadera esencia',
        ];

        // 1. Initialize all 260 Kines
        for ($i = 1; $i <= 260; $i++) {
            $toneIdx = (($i - 1) % 13) + 1;
            $sealIdx = (($i - 1) % 20) + 1;

            $sealConfig = $seals[$sealIdx];
            $toneConfig = $tones[$toneIdx];

            $sealName = $sealConfig['name'];
            $toneName = $toneConfig['name'];
            $sealEssence = $sealEssences[$sealName];
            $toneAction = $toneConfig['action'];

            $shortDescription = "Hoy es un gran día para " . $toneAction . " al " . $sealEssence . ".";

            \App\Models\Kin::updateOrCreate(
                ['kin_number' => $i],
                [
                    'name' => "{$sealName} {$toneName}",
                    'seal_name' => $sealName,
                    'tone_name' => $toneName,
                    'color' => $sealConfig['color'],
                    'affirmation' => '',
                    'short_description' => $shortDescription,
                    'description' => '',
                    'image_url' => null,
                ]
            );
        }

        // 2. Overlay with specific info from files
        $infoKinesPath = base_path('../info kines');
        if (\Illuminate\Support\Facades\File::exists($infoKinesPath)) {
            $directories = \Illuminate\Support\Facades\File::directories($infoKinesPath);

            foreach ($directories as $dir) {
                $folderName = basename($dir);
                $txtFile = $dir . '/' . $folderName . '.txt';

                if (\Illuminate\Support\Facades\File::exists($txtFile)) {
                    $content = \Illuminate\Support\Facades\File::get($txtFile);
                    $data = [];
                    $lines = explode("\n", $content);
                    foreach ($lines as $line) {
                        if (str_contains($line, ':')) {
                            [$key, $value] = explode(':', $line, 2);
                            $key = trim($key);
                            $value = trim($value, " \t\n\r\0\x0B\",");
                            $data[$key] = $value;
                        }
                    }

                    if (isset($data['kinID'])) {
                        $kinNumber = (int) str_replace('Kin ', '', $data['kinID']);

                        // Look for image with multiple extensions
                        $imageExtensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
                        $foundImage = null;
                        foreach ($imageExtensions as $ext) {
                            $imgPath = $dir . "/Kin {$kinNumber}.{$ext}";
                            if (\Illuminate\Support\Facades\File::exists($imgPath)) {
                                $foundImage = "/images/kines/Kin {$kinNumber}.{$ext}";
                                break;
                            }
                        }

                        \App\Models\Kin::where('kin_number', $kinNumber)->update([
                            'name' => $data['nombre'] ?? \App\Models\Kin::where('kin_number', $kinNumber)->value('name'),
                            'affirmation' => $data['afirmacion'] ?? '',
                            'image_url' => $foundImage,
                        ]);
                    }
                }
            }
        }
    }
}
