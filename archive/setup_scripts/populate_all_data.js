const fs = require('fs');
const path = require('path');

// --- DATA STRUCTURES (Copied/Adapted from tzolkin.js & improved) ---
const sealsData = [
    { name: 'Dragón', slug: 'dragon', color: 'Rojo', v1: 'nutrir', v2: 'nutriendo', v3: 'el nacimiento', essence: 'el ser', power: 'el nacimiento' },
    { name: 'Viento', slug: 'wind', color: 'Blanco', v1: 'comunicar', v2: 'comunicando', v3: 'el aliento', essence: 'el espíritu', power: 'el aliento' },
    { name: 'Noche', slug: 'night', color: 'Azul', v1: 'soñar', v2: 'soñando', v3: 'la intuición', essence: 'la abundancia', power: 'la intuición' },
    { name: 'Semilla', slug: 'seed', color: 'Amarillo', v1: 'focalizar', v2: 'focalizando', v3: 'la atención', essence: 'el florecimiento', power: 'el florecimiento' },
    { name: 'Serpiente', slug: 'serpent', color: 'Rojo', v1: 'sobrevivir', v2: 'sobreviviendo', v3: 'el instinto', essence: 'la fuerza vital', power: 'la fuerza vital' },
    { name: 'Enlazador de Mundos', slug: 'worldbridger', color: 'Blanco', v1: 'igualar', v2: 'igualando', v3: 'la oportunidad', essence: 'la muerte', power: 'la muerte' },
    { name: 'Mano', slug: 'hand', color: 'Azul', v1: 'conocer', v2: 'conociendo', v3: 'la curación', essence: 'la realización', power: 'la realización' },
    { name: 'Estrella', slug: 'star', color: 'Amarillo', v1: 'embellecer', v2: 'embelleciendo', v3: 'el arte', essence: 'la elegancia', power: 'la elegancia' },
    { name: 'Luna', slug: 'moon', color: 'Rojo', v1: 'purificar', v2: 'purificando', v3: 'el flujo', essence: 'el agua universal', power: 'el agua universal' },
    { name: 'Perro', slug: 'dog', color: 'Blanco', v1: 'amar', v2: 'amando', v3: 'la lealtad', essence: 'el corazón', power: 'el corazón' },
    { name: 'Mono', slug: 'monkey', color: 'Azul', v1: 'jugar', v2: 'jugando', v3: 'la ilusión', essence: 'la magia', power: 'la magia' },
    { name: 'Humano', slug: 'human', color: 'Amarillo', v1: 'influenciar', v2: 'influenciando', v3: 'la sabiduría', essence: 'el libre albedrío', power: 'el libre albedrío' },
    { name: 'Caminante del Cielo', slug: 'skywalker', color: 'Rojo', v1: 'explorar', v2: 'explorando', v3: 'la vigilancia', essence: 'el espacio', power: 'el espacio' },
    { name: 'Mago', slug: 'wizard', color: 'Blanco', v1: 'encantar', v2: 'encantando', v3: 'la receptividad', essence: 'la atemporalidad', power: 'la atemporalidad' },
    { name: 'Águila', slug: 'eagle', color: 'Azul', v1: 'crear', v2: 'creando', v3: 'la mente', essence: 'la visión', power: 'la visión' },
    { name: 'Guerrero', slug: 'warrior', color: 'Amarillo', v1: 'cuestionar', v2: 'cuestionando', v3: 'la intrepidez', essence: 'la inteligencia', power: 'la inteligencia' },
    { name: 'Tierra', slug: 'earth', color: 'Rojo', v1: 'evolucionar', v2: 'evolucionando', v3: 'la sincronía', essence: 'la navegación', power: 'la navegación' },
    { name: 'Espejo', slug: 'mirror', color: 'Blanco', v1: 'reflejar', v2: 'reflejando', v3: 'el orden', essence: 'el sinfín', power: 'el sinfín' },
    { name: 'Tormenta', slug: 'storm', color: 'Azul', v1: 'catalizar', v2: 'catalizando', v3: 'la energía', essence: 'la autogeneración', power: 'la autogeneración' },
    { name: 'Sol', slug: 'sun', color: 'Amarillo', v1: 'iluminar', v2: 'iluminando', v3: 'la vida', essence: 'el fuego universal', power: 'el fuego universal' }
];

const tonesData = [
    { name: 'Magnético', v: 'unifico', power: 'el propósito', action: 'atrayendo', number: 1, desc: 'unificar tu meta' },
    { name: 'Lunar', v: 'polarizo', power: 'el desafío', action: 'estabilizando', number: 2, desc: 'identificar los obstáculos' },
    { name: 'Eléctrico', v: 'activo', power: 'el servicio', action: 'vinculando', number: 3, desc: 'poner tu don al servicio' },
    { name: 'Autoexistente', v: 'defino', power: 'la forma', action: 'midiendo', number: 4, desc: 'dar estructura a tus ideas' },
    { name: 'Entonado', v: 'confiero poder', power: 'el esplendor', action: 'comandando', number: 5, desc: 'tomar el mando' },
    { name: 'Rítmico', v: 'organizo', power: 'la igualdad', action: 'equilibrando', number: 6, desc: 'encontrar el balance' },
    { name: 'Resonante', v: 'canalizo', power: 'la sintonización', action: 'inspirando', number: 7, desc: 'alinearte con tu verdad' },
    { name: 'Galáctico', v: 'armonizo', power: 'la integridad', action: 'modelando', number: 8, desc: 'ser coherente con lo que crees' },
    { name: 'Solar', v: 'pulso', power: 'la intención', action: 'realizando', number: 9, desc: 'poner en acción tu voluntad' },
    { name: 'Planetario', v: 'perfecciono', power: 'la manifestación', action: 'produciendo', number: 10, desc: 'mejorar lo que haces' },
    { name: 'Espectral', v: 'disuelvo', power: 'la liberación', action: 'divulgando', number: 11, desc: 'soltar lo que ya no sirve' },
    { name: 'Cristal', v: 'me dedico', power: 'la cooperación', action: 'universalizando', number: 12, desc: 'compartir y colaborar' },
    { name: 'Cósmico', v: 'perduro', power: 'la presencia', action: 'trascendiendo', number: 13, desc: 'expandir tu alegría y ser' }
];

// Helper to calculate guide index
const getGuideSeal = (sealIdx, toneIdx) => {
    const toneNum = toneIdx + 1;
    let offset = 0;
    if ([1, 6, 11].includes(toneNum)) offset = 0; // Guide is itself
    else if ([2, 7, 12].includes(toneNum)) offset = 12;
    else if ([3, 8, 13].includes(toneNum)) offset = 4;
    else if ([4, 9].includes(toneNum)) offset = 16;
    else if ([5, 10].includes(toneNum)) offset = 8;
    return sealsData[(sealIdx + offset) % 20];
};

const getGuide = (sealIdx, toneIdx) => {
    // For Magnetic, Rhythmic, Spectral, guide is the seal itself. 
    // Otherwise use logic. Note: standard logic is:
    // Tones 1, 6, 11: Guide = Kin itself
    // Tones 2, 7, 12: +12 seals
    // Tones 3, 8, 13: +4 seals
    // Tones 4, 9: +16 seals
    // Tones 5, 10: +8 seals

    // BUT we need the *power* of the guide for the affirmation.
    // The previous code had `getGuide` returning the seal object.
    const guideSeal = getGuideSeal(sealIdx, toneIdx);

    // For the affirmation text "Me guía el poder de [Guide Power]"
    // If guide is itself, it says "Me guía mi propio poder duplicado".
    if ([1, 6, 11].includes(toneIdx + 1)) {
        return "mi propio poder duplicado";
    } else {
        return `el poder de ${guideSeal.power.replace('el ', '').replace('la ', '')}`; // Simplified for flow
    }
};

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

// Helper to construct affirmation
function buildAffirmation(seal, tone, guidePowerPhrase) {
    // Standard Dreamspell structure:
    // Yo [Tone Action] con el fin de [Seal Action Inf]
    // [Tone V2] [Seal Essence]
    // Sello la [Seal/Storehouse Type] de [Seal Power]
    // Con el tono [Tone Name] de [Tone Power]
    // Me guía [Guide Power Phrase]

    // Map Storehouse/Input/Output/Matrix based on Seal.
    // This is complex, let's simplify to "Sello el proceso/entrada/salida/almacén..." or generic "Sello la matriz..."
    // Or stick to what we had in tzolkin.js: "Sello la entrada de [Seal Power]" (generic but works).
    // Let's vary it slightly for "professional" feel if possible, but consistency is safer.

    let container = "la entrada";
    if (["Dragón", "Serpiente", "Luna", "Caminante del Cielo", "Tierra"].includes(seal.name)) container = "la entrada";
    if (["Viento", "Enlazador de Mundos", "Perro", "Mago", "Espejo"].includes(seal.name)) container = "el almacén";
    if (["Noche", "Mano", "Mono", "Águila", "Tormenta"].includes(seal.name)) container = "el proceso";
    if (["Semilla", "Estrella", "Humano", "Guerrero", "Sol"].includes(seal.name)) container = "la salida";

    // Correct logic for Dreamspell is specific per seal family, but let's use a safe poetic default or the mapping above.

    return `"Yo ${tone.v} con el fin de ${seal.v1}. ${tone.action.charAt(0).toUpperCase() + tone.action.slice(1)} ${seal.essence}. Sello ${container} de ${seal.power}. Con el tono ${tone.name.toLowerCase()} de ${tone.power}. Me guía ${guidePowerPhrase}."`;
}

function generateData() {
    console.log("Reading existing data...");
    let dailyData = {};
    if (fs.existsSync(DATA_FILE)) {
        dailyData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    let count = 0;
    for (let kin = 1; kin <= 260; kin++) {
        const key = kin.toString();

        // If data exists and has description, skip (preserve manual work)
        if (dailyData[key] && dailyData[key].long_description) {
            continue;
        }

        const toneIdx = (kin - 1) % 13;
        const sealIdx = (kin - 1) % 20;
        const seal = sealsData[sealIdx];
        const tone = tonesData[toneIdx];
        const guidePhrase = getGuide(sealIdx, toneIdx);

        const affirmation = buildAffirmation(seal, tone, guidePhrase);
        const name = `${seal.name} ${tone.name} ${seal.color}`;

        // Short Description: Energetic & Practical
        const shortDesc = `${tone.action.charAt(0).toUpperCase() + tone.action.slice(1)} hoy tu capacidad de ${seal.v1}: el ${tone.name} te invita a ${tone.desc} para ${seal.v1} ${seal.essence}.`;

        // Long Description: 3-4 lines
        const longDesc = `El ${name} trae la frecuencia de ${seal.power} a tu día. Hoy es un momento perfecto para ${seal.v1} desde la consciencia, permitiendo que ${tone.power} guíe tus pasos. ${tone.action.charAt(0).toUpperCase() + tone.action.slice(1)} ${seal.essence}, puedes encontrar un nuevo equilibrio. Conecta con este arquetipo para sanar, aprender y expandir tu realidad, recordando que ${guidePhrase} está contigo para mostrarte el camino.`;

        dailyData[key] = {
            affirmation: affirmation,
            image_url: `assets/infographies/Kin ${kin}.png`,
            short_description: shortDesc,
            long_description: longDesc
        };
        count++;
    }

    console.log(`Generated data for ${count} new Kins.`);
    fs.writeFileSync(DATA_FILE, JSON.stringify(dailyData, null, 4));
}

generateData();
