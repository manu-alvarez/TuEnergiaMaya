/**
 * Módulo para calcular el Oráculo del Kin (Quinta Fuerza)
 * Sello: 0-19 (Dragon-Sol)
 * Tono: 1-13
 */

const SEALS = [
    "Dragón", "Viento", "Noche", "Semilla", "Serpiente", "Enlazador de Mundos", "Mano", "Estrella", "Luna", "Perro",
    "Mono", "Humano", "Caminante del Cielo", "Mago", "Águila", "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"
];

const COLORS = ["Rojo", "Blanco", "Azul", "Amarillo"];

function getSealColor(sealIndex) {
    return COLORS[sealIndex % 4];
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

// Mapa explícito de Análogos (Parejas Planetarias)
// Validación: Suma de indices (0-based) debe dar 17. (Excepto para Sol-Tormenta que da 37->17 mod 20? No. Sol(19)+Tormenta(18)=37. 37 mod 20 = 17. Sí. Funciona).
const ANALOG_PAIRS = {
    0: 17, 17: 0,   // Dragón - Espejo
    1: 16, 16: 1,   // Viento - Tierra
    2: 15, 15: 2,   // Noche - Guerrero
    3: 14, 14: 3,   // Semilla - Águila
    4: 13, 13: 4,   // Serpiente - Mago
    5: 12, 12: 5,   // Enlazador - Caminante
    6: 11, 11: 6,   // Mano - Humano
    7: 10, 10: 7,   // Estrella - Mono
    8: 9, 9: 8,    // Luna - Perro
    18: 19, 19: 18  // Tormenta - Sol (Excepción a la regla visual simple, pero suman 37 -> 17)
};

function calculateOracle(kinNumber) {
    const kinVal = kinNumber - 1;
    const sealIdx = kinVal % 20;
    const toneVal = (kinVal % 13) + 1;

    // 1. ANÁLOGO (Soporte) - Usando Mapa Explícito para evitar errores
    let analogIdx = ANALOG_PAIRS[sealIdx];
    if (analogIdx === undefined) {
        // Fallback matemático: (17 - sealIdx) mod 20
        analogIdx = mod(17 - sealIdx, 20);
    }

    // 2. ANTÍPODA (Desafío)
    // Formula: (SealIndex + 10) % 20
    const antipodeIdx = mod(sealIdx + 10, 20);

    // 3. OCULTO (Poder Inesperado)
    // Formula: Suma de sellos 1-based = 21. -> (21 - (idx+1)) - 1 = 19 - idx (0-based).
    // Dragon(0) -> Sol(19). 0+19=19.
    // Formula matemática correcta: 19 - sealIdx.
    const occultIdx = mod(19 - sealIdx, 20);

    // Tono Oculto: Suma = 14.
    const occultTone = 14 - toneVal;

    // 4. GUÍA (Mando)
    let guideIdx;

    // Tabla de guías basada en Tono y Color
    switch (toneVal) {
        case 1: case 6: case 11:
            guideIdx = sealIdx;
            break;
        case 2: case 7: case 12:
            guideIdx = mod(sealIdx - 8, 20);
            break;
        case 3: case 8: case 13:
            guideIdx = mod(sealIdx + 4, 20); // o -16 (misma familia)
            break;
        case 4: case 9:
            guideIdx = mod(sealIdx + 16, 20); // o -4
            break;
        case 5: case 10:
            guideIdx = mod(sealIdx + 8, 20);
            break;
    }

    return {
        destiny: { seal: sealIdx, tone: toneVal, color: getSealColor(sealIdx) },
        analog: { seal: analogIdx, tone: toneVal, color: getSealColor(analogIdx) },
        antipode: { seal: antipodeIdx, tone: toneVal, color: getSealColor(antipodeIdx) },
        occult: { seal: occultIdx, tone: occultTone, color: getSealColor(occultIdx) },
        guide: { seal: guideIdx, tone: toneVal, color: getSealColor(guideIdx) }
    };
}

module.exports = { calculateOracle, SEALS, COLORS };

if (require.main === module) {
    const testKin = 42; // Viento Eléctrico Blanco
    console.log(`Testing Oracle for Kin ${testKin}...`);
    console.log(JSON.stringify(calculateOracle(testKin), null, 2));
}
